import { useEffect, useState } from "react";
import { Header } from "../componentes/Header";
import PessoaCard from "../componentes/CartaoPessoaDesaparecida";
import type { Pessoa } from "../tipos";
import EsqueletoCard from "../componentes/EsqueletoCard";
import { MdRefresh } from "react-icons/md";

export default function Component() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const mostrarMaisPessoas = async () => {
    setPessoas([]);
    setIsLoading(true);

    //optei por fazer a requisição guardar todos pois este endpoint não tem paginação
    //então não faz sentido ficar pedindo mais registros, ja que eles vao retornar repetidos
    const params = new URLSearchParams();
    params.append("registros", "100");

    await fetch(`https://abitus-api.geia.vip/v1/pessoas/aberto/dinamico?${params.toString()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Falha na requisição");
        }
        return res.json();
      })
      .then((data) => {
        const novasPessoas = data;
        setPessoas(novasPessoas);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar API:", err);
        setIsLoading(false);
      });

    window.scrollTo({ top: 0, behavior: "smooth" })
    
  };

    useEffect(() => {
      mostrarMaisPessoas();
    }, []);


  return (
    <div>
      <Header />
      <div className="container mx-auto py-6 mt-22 sm:mt-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Explorar Pessoas Desaparecidas
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Navegue por todos os registros.
        </p>
        <div className="flex justify-center flex-col items-center w-full mx-auto sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-10 gap-3 mr-5">
          {pessoas.map((pessoa) => (
            <PessoaCard key={pessoa.id} pessoa={pessoa} />
          ))}
          {isLoading &&
            [...Array(10)].map((_, index) => <EsqueletoCard key={index} />)}
        </div>
        <div className="flex justify-center mt-10">
          <button
            onClick={mostrarMaisPessoas}
            disabled={isLoading}
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MdRefresh className="inline-block mr-2" />
            {isLoading ? "Atualizando..." : "Atualizar Lista"}
          </button>
        </div>
      </div>
    </div>
  );
}