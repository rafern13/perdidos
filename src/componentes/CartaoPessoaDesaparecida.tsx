import { useState } from "react";
import type { Pessoa } from "../tipos";
import { Link } from "react-router-dom";
import placeholderImg from "@/assets/placeholder.jpg";
import templateImg from "@/assets/template.png";
import { MdInfoOutline } from "react-icons/md";

export default function PessoaCard({ pessoa }: { pessoa: Pessoa }) {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  const classesStatusVivo: string = pessoa.vivo ? "bg-green-600" : "bg-red-600";

  const classesStatusDesaparecido: string = pessoa.ultimaOcorrencia.encontradoVivo ? "bg-green-600" : "bg-red-600";

  return (
    <div className="w-60 text-left border-black sm:w-60 md:w-64 lg:w-60 xl:w-64 shadow-gray-500 overflow-hidden hover:shadow-xl rounded-lg mt-2 transition relative flex flex-col h-[440px]">
      <div className="relative w-full h-60">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400"></div>
          </div>
        )}

        <div  className={`absolute top-2 right-2  text-white text-xs font-bold px-2 py-1 rounded-full z-2 ${classesStatusVivo}`}>
          {pessoa.vivo ? ("VIVO" ) : ( "FALECIDO" )}
        </div>
        <div  className={`absolute top-2 left-2  text-white text-xs font-bold px-2 py-1 rounded-full z-2 ${classesStatusDesaparecido}`}>
          {pessoa.ultimaOcorrencia.encontradoVivo ? ("LOCALIZADO" ) : ( "DESAPARECIDO" )}
        </div>

        <img
          src={
            !erro && pessoa.urlFoto
              ? pessoa.urlFoto || placeholderImg
              : templateImg 
          }
          alt={pessoa.nome}
          className={`w-[95%] mx-auto mt-1 rounded-2xl h-60 object-cover ${loading ? "hidden" : "block"}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setErro(true);
            setLoading(false); 
          }}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-sm lg:text-lg font-semibold">{pessoa.nome}</h2>
        <p className="text-gray-600">Idade: {pessoa.idade}</p>
        <p className="text-sm text-gray-500 mt-1 mb-2 line-clamp-2">
          Último local: {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}
        </p>
      </div>
      <div className="bottom-4 relative right-2 text-right w-full flex justify-end items-center gap-2">
        <Link
          to={`/ocorrencia/${pessoa.id}`}
          className="flex items-center gap-2 bg-blue-600 text-white py-1 px-3 rounded-xl mb-2 hover:bg-blue-700 transition"
        >
          <MdInfoOutline size={18} />
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}
