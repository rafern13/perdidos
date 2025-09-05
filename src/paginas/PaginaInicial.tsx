import { Link } from "react-router-dom"
import { Header } from "../componentes/Header"
import { FaCompass, FaSearch } from "react-icons/fa"
import type { Pessoa } from "../tipos";
import { CarrosselPessoasDesaparecidas } from "../componentes/CarrosselPessoas";
import { useEffect, useState } from "react";
import EsqueletoCard from "../componentes/EsqueletoCard";

export default function Componente() {
    const [pessoas, setPessoas] = useState<Pessoa[]>();
    const [isLoading, setisLoading] = useState<boolean>(true);
    
    useEffect(() => {
        setisLoading(true);
        const params = new URLSearchParams();   
        params.append("registros", "5");

        const query = `https://abitus-api.geia.vip/v1/pessoas/aberto/dinamico?${params.toString()}`
        console.log(query)
        fetch(query)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Falha na requisição");
                }
                return res.json();
            })
            .then((data: Pessoa[]) => {
                setPessoas(data);

                setisLoading(false);
            })
            .catch((err) => {
                console.error("Erro ao buscar API:", err);
                setisLoading(false);
            });

    }, []);

    return(
        <div>
            <Header/>
            <div className="flex flex-col md:flex-column justify-start items-baseline flex-wrap gap-2 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold">
                    BANCO DE PESSOAS DESAPARECIDAS
                </h1>
                <p className="text-1xl">
                    Busque por pessoas desaparecidas ou <br></br> contribua adicionando novas informações
                </p>
                <div className="flex gap-2 ">
                    <Link
                        to="/pesquisa"
                        className="bg-blue-700 hover:bg-blue-900 text-white p-3 rounded-lg mt-3 flex items-center gap-2"
                    >
                        <FaSearch /> 
                        <span>Buscar</span>
                    </Link> 
                    <Link
                        to="/explorar"
                        className="bg-white hover:bg-gray-500 text-black border-2 p-3 rounded-lg mt-3 flex items-center gap-2"
                    >
                        <FaCompass /> 
                        <span>Explorar</span>
                    </Link> 
                </div>
            </div>
            <div className="flex flex-col md:flex-column justify-start items-baseline flex-wrap gap-5 p-6 bg-gray-100 rounded-lg shadow-md">
                <div className="mt-3 text-2xl font-medium">
                    Você conhece alguma dessas pessoas?
                </div>
            </div>
            {isLoading ? (
                <div className="grid grid-cols-1 mb-4 sm:grid-cols-2 md:grid-cols-5 gap-6 p-6">
                    {[...Array(5)].map((_, index) => (
                        <EsqueletoCard key={index} />
                    ))}
                </div>
            ) : (
                <CarrosselPessoasDesaparecidas pessoas={pessoas || []} />
            )}
        </div>
    )
}