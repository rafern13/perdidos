import { useParams, useNavigate } from "react-router-dom";
import type { Pessoa, Ocorrencia } from "../tipos";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Modal from "../componentes/Modal";
import OcorrenciaModal from "../componentes/CadastroOcorrenciaModal";


export default function PessoaDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pessoa, setPessoa] = useState<Pessoa>({
    "id": 0,
    "nome": "",
    "idade": 0,
    "sexo": "MASCULINO",
    "vivo": false,
    "urlFoto": "",
    "ultimaOcorrencia": {
      "dtDesaparecimento": "",
      "dataLocalizacao": "",
      "encontradoVivo": false,
      "localDesaparecimentoConcat": "",
      "ocorrenciaEntrevDesapDTO": {
        "informacao": "",
        "vestimentasDesaparecido": ""
      },
      "listaCartaz": [],
      "ocoId": 0
    }
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  useEffect(() => {
      setisLoading(true);
      fetch(`https://abitus-api.geia.vip/v1/pessoas/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Falha na requisição");
          }
          return res.json();
        })
        .then((data: Pessoa) => {
          setPessoa(data);
          setisLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao buscar API:", err);
          setisLoading(false);
        });
         
    }, [id]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <FaArrowLeft /> Voltar
        </button>
      </div>

      {isLoading && <div className="animate-spin w-8 h-8 border-2 rounded-full border-b-transparent"></div>}

      <div id="ocorrenciaDiv" className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-6">
        <img
          src={pessoa.urlFoto}
          alt={pessoa.nome}
          className="w-48 h-48 object-cover rounded-2xl shadow-md"
        />

        <h1 className="text-3xl font-bold text-center">{pessoa.nome}</h1>
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            pessoa.vivo
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {pessoa.vivo ? "Localizado com vida" : "Não localizado / falecido"}
        </span>

        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <p className="text-gray-500 text-sm">Idade</p>
            <p className="text-lg font-semibold">{pessoa.idade} anos</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Sexo</p>
            <p className="text-lg font-semibold">{pessoa.sexo}</p>
          </div>
        </div>

        <div className="w-full mt-6 text-left">
          <h2 className="text-xl font-semibold mb-2">Última ocorrência</h2>
          <ul className="space-y-1 text-gray-700">
            <li>
              <strong>Data do desaparecimento:</strong>{" "}
              {new Date(pessoa.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString("pt-BR")}
            </li>
            <li>
              <strong>Local:</strong> {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}
            </li>
            {pessoa.ultimaOcorrencia.dataLocalizacao && (
              <li>
                <strong>Data da localização:</strong>{" "}
                {new Date(pessoa.ultimaOcorrencia.dataLocalizacao).toLocaleDateString("pt-BR")}
              </li>
            )}
            <li>
              <strong>Encontrado vivo:</strong>{" "}
              {pessoa.ultimaOcorrencia.encontradoVivo ? "Sim" : "Não"}
            </li>
          </ul>
        </div>

        <div className="w-full mt-6 text-left">
          <h2 className="text-xl font-semibold mb-2">Detalhes</h2>
          <p>
            <strong>Vestimentas:</strong>{" "}
            {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido ||
              "Não informado"}
          </p>
          <p>
            <strong>Informações adicionais:</strong>{" "}
            {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao || "Não informado"}
          </p>
        </div>

        {pessoa.ultimaOcorrencia.listaCartaz && pessoa.ultimaOcorrencia.listaCartaz.length > 0 && (
          <div className="w-full mt-6 text-left">
            <h2 className="text-xl font-semibold mb-4">Cartazes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pessoa.ultimaOcorrencia.listaCartaz.map((c, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg overflow-hidden shadow-sm"
                >
                  <img
                    src={c.urlCartaz}
                    alt={c.tipoCartaz}
                    className="w-full object-cover"
                  />
                  <p className="p-2 text-sm text-gray-600 text-center">
                    {c.tipoCartaz}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            <FaShareAlt /> Compartilhar
          </button>
          <button onClick={handleOpenModal} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
            Enviar informação
          </button>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <OcorrenciaModal pessoaId={pessoa.id} onClose={handleCloseModal} /> 
          </Modal>
        </div>
      </div>
    </div>
  );
}
