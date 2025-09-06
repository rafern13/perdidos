import { Link } from "react-router-dom";
import { Header } from "../componentes/Header";
import { FaCompass, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import EsqueletoCard from "../componentes/EsqueletoCard";
import Paginacao from "../componentes/Paginacao"; 
import type { FiltrosPesquisa, PagePessoaDto, Pessoa } from "../tipos";
import { BarraPesquisa } from "../componentes/BarraPesquisa";
import { PessoaCard } from "../componentes/CartaoPessoaDesaparecida";

export default function PaginaInicialRefatorada() {
    const [pessoas, setPessoas] = useState<PagePessoaDto>();
    const [isLoading, setisLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState<FiltrosPesquisa>({
        nome: "",
        faixaIdadeInicial: "",
        faixaIdadeFinal: "",
        status: "",
    });
    const [paginacao, setPaginacao] = useState({ pagina: 0, tamanho: 12 });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setisLoading(true);
        const params = new URLSearchParams();
        if (filters.nome) params.append("nome", filters.nome);
        if (filters.status) params.append("status", filters.status);
        if (filters.faixaIdadeInicial) params.append("faixaIdadeInicial", String(filters.faixaIdadeInicial));
        if (filters.faixaIdadeFinal) params.append("faixaIdadeFinal", String(filters.faixaIdadeFinal));
        params.append("pagina", String(paginacao.pagina))
        params.append("porPagina", String(paginacao.tamanho))

        fetch(`https://abitus-api.geia.vip/v1/pessoas/aberto/filtro?${params.toString()}`)
        .then((res) => {
            if (!res.ok) throw new Error("Falha na requisição");
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
        setPaginacao({ ...paginacao, pagina: 0 });
    };

    const handleMudancaPagina = (novaPagina: number) => {
        setPaginacao({ ...paginacao, pagina: novaPagina })
    };

    return (
        <div className="min-h-screen overflow-hidden">
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
                className={`fixed top-10 left-0 h-screen w-64 p-6 bg-white shadow-md z-5 transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="md:hidden absolute top-4 right-4 text-xl"
                >
                    <FaTimes />
                </button>

                <div className="flex flex-col gap-2 mt-8 md:mt-0">
                    <h1 className="text-2xl font-bold">
                        BANCO DE PESSOAS DESAPARECIDAS
                    </h1>
                    <p className="text-sm text-gray-600">
                        Busque por pessoas desaparecidas ou contribua adicionando novas informações
                    </p>
                    <Link
                        to="/explorar"
                        className="bg-white hover:bg-gray-100 text-black border-2 p-2 rounded-lg mt-3 flex items-center gap-2"
                    >
                        <FaCompass />
                        <span>Explorar</span>
                    </Link>
                </div>
            </aside>

            <main className="ml-0 md:ml-64 p-6 transition-all duration-300 mt-8">
                <div className="sticky top-0 p-4 bg-white rounded-lg shadow-md mb-6">
                    <div className="relative">
                        <BarraPesquisa onSearch={handleSearch} />
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(10)].map((_, index) => (
                            <EsqueletoCard key={index} />
                        ))}
                    </div>
                ) : (
                    <>
                        {pessoas.content.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4    gap-5">
                                {pessoas?.content.map((pessoa: Pessoa) => (
                                    <PessoaCard key={pessoa.id} pessoa={pessoa} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-10 bg-white rounded-lg shadow-md">
                                <p className="text-gray-600">Nenhum resultado encontrado para sua busca.</p>
                            </div>
                        )}
                        
                        <Paginacao 
                            paginaAtual={pessoas.number}
                            totalPaginas={pessoas.totalPages}
                            onPageChange={handleMudancaPagina}
                        />
                    </>
                )}
            </main>
        </div>
    );
}
