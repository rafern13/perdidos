import { useState } from "react";
import type { Pessoa } from "../tipos";

export default function PessoaCard({ pessoa }: { pessoa: Pessoa }) {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  return (
    <div className="bg-white w-full md:w-72 lg:w-80 shadow-lg overflow-hidden hover:shadow-xl rounded-b-lg mt-2 transition relative flex flex-col h-[420px]">
      <div className="relative w-full h-60">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400"></div>
          </div>
        )}

        <img
          src={
            !erro
              ? pessoa.urlFoto || "../assets/placeholder.jpg"
              : "../assets/template.jpg" 
          }
          alt={pessoa.nome}
          className={`w-full h-60 object-cover ${loading ? "hidden" : "block"}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setErro(true);
            setLoading(false); 
          }}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold">{pessoa.nome}</h2>
        <p className="text-gray-600">Idade: {pessoa.idade}</p>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          Último local: {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}
        </p>

        <div className="mt-auto">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
