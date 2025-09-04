import type { Pessoa } from "../tipos";
import { Link } from "react-router-dom";

type PessoaCardProps = {
  pessoa: Pessoa;
};

export function PessoaCard({ pessoa }: PessoaCardProps) {
  const status = pessoa.vivo ? "Localizado" : "Desaparecido";
  const statusColor = pessoa.vivo ? "bg-green-600" : "bg-red-600";
  const statusTextColor = pessoa.vivo ? "text-white" : "text-white";

  return (
    <div className="bg-white w-full md:w-72 lg:w-80 shadow-lg overflow-hidden hover:shadow-xl rounded-b-lg mt-2 transition relative">
        <div className="relative"> 
        <img
          src={pessoa.urlFoto || "/placeholder.jpg"}
          alt={pessoa.nome}
          className="w-full h-60 object-cover"
        />
        
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${statusColor} ${statusTextColor}`}>
          {status.toUpperCase()}
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold">{pessoa.nome}</h2>
        <p className="text-gray-600">Idade: {pessoa.idade}</p>

        <p className="text-sm text-gray-500 mt-1">
          Último local: {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}
        </p>
        
        <Link 
          to={`/ocorrencia/${pessoa.id}`}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition text-center inline-block"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}