import { Link } from "react-router-dom";
import { Header } from "../componentes/Header";
import { FaCompass, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import EsqueletoCard from "../componentes/EsqueletoCard";
import Paginacao from "../componentes/Paginacao"; 
import type { FiltrosPesquisa, MensagemProps, PagePessoaDto, Pessoa } from "../tipos";
import { BarraPesquisa } from "../componentes/BarraPesquisa";
import PessoaCard from "../componentes/CartaoPessoaDesaparecida";
import MensagemPopUp from "@/componentes/ErroPopUp";

type Estatisticas = {
  quantPessoasDesaparecidas: number;
  quantPessoasEncontradas: number;
};

export default function PaginaInicialRefatorada() {
  const [pessoas, setPessoas] = useState<PagePessoaDto>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [mensagemReq, setMensagemReq] = useState<MensagemProps>({
    mensagem: "",
    erro: false,
  });

  const [filters, setFilters] = useState<FiltrosPesquisa>({
    nome: "",
    faixaIdadeInicial: "",
    faixaIdadeFinal: "",
    status: "",
  });

  const [paginacao, setPaginacao] = useState({ pagina: 0, tamanho: 12 });
  const [isOpen, setIsOpen] = useState(false);

  const [estatisticas, setEstaticas] = useState<Estatisticas>({
    quantPessoasDesaparecidas: 0,
    quantPessoasEncontradas: 0,
  });

  useEffect(() => {
    fetch("https://abitus-api.geia.vip/v1/pessoas/aberto/estatistico")
      .then((res) => {
        if (!res.ok) throw new Error("Falha na requisição");
        return res.json();
      })
      .then((data: Estatisticas) => {
        setEstaticas(data);
      })
      .catch(() => {
        setMensagemReq({ mensagem: "Erro ao buscar as estatísticas", erro: true });
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const params = new URLSearchParams();
    if (filters.nome) params.append("nome", filters.nome);
    if (filters.status) params.append("status", filters.status);
    if (filters.faixaIdadeInicial) params.append("faixaIdadeInicial", String(filters.faixaIdadeInicial));
    if (filters.faixaIdadeFinal) params.append("faixaIdadeFinal", String(filters.faixaIdadeFinal));
    params.append("pagina", String(paginacao.pagina));
    params.append("porPagina", String(paginacao.tamanho));

    fetch(`https://abitus-api.geia.vip/v1/pessoas/aberto/filtro?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Falha na requisição");
        return res.json();
      })
      .then((data: PagePessoaDto) => {
        setPessoas(data);
        setIsLoading(false);
      })
      .catch(() => {
        setMensagemReq({ mensagem: "Erro ao buscar as pessoas", erro: true });
        setIsLoading(false);
      });
  }, [filters, paginacao]);

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isLoading]);

  const handleSearch = (newFilters: FiltrosPesquisa) => {
    setFilters(newFilters);
    setPaginacao({ ...paginacao, pagina: 0 });
  };

  const handleMudancaPagina = (novaPagina: number) => {
    setPaginacao({ ...paginacao, pagina: novaPagina });
  };

  return (
    <div className="min-h-screen mt-6 sm:mt-0 overflow-hidden">
      <MensagemPopUp 
        mensagem={mensagemReq.mensagem} 
        erro={mensagemReq.erro} 
        setMensagemReq={(mensagem) => setMensagemReq({ mensagem, erro: false })}
      />

      <Header />

      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-4 text-xl"
      >
        <FaBars />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-10 left-0 h-screen w-64 p-6 bg-white shadow-md z-10 transform transition-all duration-300
        md:translate-x-0 md:opacity-100 md:pointer-events-auto
        ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"}`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-xl"
        >
          <FaTimes />
        </button>

        <div className="flex flex-col gap-2 mt-8 md:mt-0">
          <div>
            <h1 className="text-sm sm:text-2xl font-bold">
              BANCO DE PESSOAS DESAPARECIDAS
            </h1>
            <p className="text-[0.3rem] sm:text-sm text-gray-600">
              Busque por pessoas desaparecidas ou contribua adicionando novas informações
            </p>
          </div>
          <Link
            to="/explorar"
            className="bg-white w-28 hover:bg-gray-100 text-black border-2 p-2 rounded-lg mt-3 flex items-center gap-2"
          >
            <FaCompass />
            <span>Explorar</span>
          </Link>
        </div>

        <div>
          <div className="mt-10 bg-gray-100 flex items-start flex-col rounded-lg">
            <h2 className="text-3xl font-bold sm:text-xl">Estatísticas</h2>
            <div className="flex flex-col mt-3 gap-3">
              <div className="flex justify-between flex-col">
                <span className="font-medium">Pessoas Desaparecidas</span>
                <span className="font-bold text-2xl">{estatisticas.quantPessoasDesaparecidas}</span>
              </div>
              <div className="flex justify-between flex-col">
                <span className="font-medium">Pessoas Encontradas</span>
                <span className="font-bold text-2xl">{estatisticas.quantPessoasEncontradas}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="ml-0 md:ml-64 p-6 transition-all duration-300 mt-0 sm:mt-6">
        <div className="sticky top-0 p-4 bg-white rounded-lg shadow-md mb-6">
          <div className="relative">
            <BarraPesquisa onSearch={handleSearch} />
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mr-4">
            {[...Array(10)].map((_, index) => (
              <EsqueletoCard key={index} />
            ))}
          </div>
        )}

        {!isLoading && pessoas && (
          <>
          {pessoas.totalPages > 1 && (
            <div className="flex justify-center lg:justify-end ml-3">
              <Paginacao 
                paginaAtual={pessoas.number}
                totalPaginas={pessoas.totalPages}
                onPageChange={handleMudancaPagina}
              />
            </div>
            )}
            {pessoas.content.length > 0 ? (
              <div className="flex flex-col items-center md:grid md:grid-cols-2 md:gap-18 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-10 gap-3 mr-5">
                {pessoas.content.map((pessoa: Pessoa) => (
                  <PessoaCard key={pessoa.id} pessoa={pessoa} />
                ))}
              </div>
            ) : (
              <div className="text-center p-10 bg-white rounded-lg shadow-md">
                <p className="text-gray-600">Nenhum resultado encontrado para sua busca.</p>
              </div>
            )}

            
          </>
        )}
      </main>
    </div>
  );
}
