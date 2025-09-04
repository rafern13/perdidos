import { useEffect, useState } from "react";
import type { FiltrosPesquisa, PagePessoaDto } from "../tipos";
import { PessoaCard } from "../componentes/CartaoPessoaDesaparecida";
import { Header } from "../componentes/Header";
import { BarraPesquisa } from "../componentes/BarraPesquisa"; 
import EsqueletoCard from "../componentes/EsqueletoCard";
import Paginacao from "../componentes/Paginacao";

export default function Componente() {

  const [pessoas, setPessoas] = useState<PagePessoaDto | undefined>(undefined);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<FiltrosPesquisa>({
    nome: "",
    faixaIdadeInicial: "",
    faixaIdadeFinal: "",
    status: "",
  });

  const [paginacao, setPaginacao] = useState({
    pagina: 0,
    tamanho: 10,
  })

  useEffect(() => {
    setisLoading(true);
    const params = new URLSearchParams();
    if (filters.nome) {
      params.append("nome", filters.nome);
    }
    if (filters.status) {
      params.append("status", filters.status);
    }
    if (filters.faixaIdadeInicial) {
      params.append("faixaIdadeInicial", String(filters.faixaIdadeInicial));
    }
    if (filters.faixaIdadeFinal) {
      params.append("faixaIdadeFinal", String(filters.faixaIdadeFinal));
    }
    
    params.append("pagina", String(paginacao.pagina))
    params.append("porPagina", String(paginacao.tamanho))

    console.log(params)

    fetch(`https://abitus-api.geia.vip/v1/pessoas/aberto/filtro?${params.toString()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Falha na requisição");
        }
        return res.json();
      })
      .then((data: PagePessoaDto) => {
        setPessoas(data);
        setisLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar API:", err);
        setisLoading(false);
      });
       
  }, [filters, paginacao]); 

  const handleSearch = (newFilters: FiltrosPesquisa) => {
    setFilters(newFilters);
    setPaginacao({...paginacao, pagina:0});
  };

  const handleMudancaPagina = (novaPagina: number) => {
    setPaginacao({...paginacao, pagina: novaPagina})
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="p-6">
        <BarraPesquisa onSearch={handleSearch} />
        {isLoading ? (
          <div className="grid grid-cols-1 mb-4 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <EsqueletoCard key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid ml-3 grid-cols-1 mb-4 sm:grid-cols-2 md:grid-cols-5 gap-6">
              {pessoas?.content && pessoas.content.length > 0 ? (
                pessoas.content.map((p) => (
                  <PessoaCard key={p.id} pessoa={p} />
                ))
              ) : (
                <p className="col-span-full text-center mt-2 text-gray-500">Nenhum registro encontrado.</p>
              )}
            </div>
            {pessoas?.content && pessoas.totalPages > 1 && (
              <Paginacao
                totalPaginas={pessoas.totalPages}
                paginaAtual={pessoas.number}
                onPageChange={handleMudancaPagina}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}