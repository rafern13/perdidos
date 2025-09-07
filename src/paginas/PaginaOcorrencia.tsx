import { useParams, useNavigate } from "react-router-dom";
import type { MensagemProps, Ocorrencia, Pessoa } from "../tipos";
import { FaArrowLeft, FaEye, FaEyeSlash, FaShareAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Modal from "../componentes/Modal";
import OcorrenciaModal from "../componentes/CadastroOcorrenciaModal";
import MensagemPopUp from "@/componentes/ErroPopUp";
import templateImg from "@/assets/template.png";
import { MdSend } from "react-icons/md";
import MostrarOcorrencias from "@/componentes/MostrarOcorrencias";

export default function PessoaDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  const [isOcorrenciasLoading, setIsOcorrenciasLoading] = useState(false);

  const [mostrarOcorrencias, setMostrarOcorrencias] = useState(false);
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mensagemReq, setMensagemReq] = useState<MensagemProps>({
    mensagem: "",
    erro: false,
  });
  const [erro, setErro] = useState(false);
  const [pessoa, setPessoa] = useState<Pessoa | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const copiarUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMensagemReq({ mensagem: "Link copiado para a área de transferência!", erro: false }); 
    } catch {
      setMensagemReq({ mensagem: "Falha ao copiar o link.", erro: true }); 
    }
  };

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    fetch(`https://abitus-api.geia.vip/v1/pessoas/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Falha na requisição");
        return res.json();
      })
      .then((data: Pessoa) => {
        setPessoa(data);
      })
      .catch(() => {
        setMensagemReq({ mensagem: "Erro ao buscar os dados da pessoa", erro: true });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!pessoa) return;

    const ocoId = pessoa.ultimaOcorrencia.ocoId;
    if (!ocoId) return;

    setIsOcorrenciasLoading(true);
    const req = `https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido?ocorrenciaId=${ocoId}`;
    
    fetch(req)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar ocorrências");
        return res.json();
      })
      .then((data) => {
        const dadosOrdenados = [...data].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
        setOcorrencias(dadosOrdenados);
      })
      .catch(() => {
        setMensagemReq({ mensagem: "Erro ao buscar ocorrências", erro: true });
      })
      .finally(() => {
        setIsOcorrenciasLoading(false);
      });
  }, [pessoa]);

  const formatarData = (data: string | null | undefined) => {
    if (!data) return "Não informado";
    return new Date(data).toLocaleDateString("pt-BR");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin w-16 h-16 border-4 rounded-full border-b-transparent border-blue-600"></div>
      </div>
    );
  }

  if (!pessoa) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-xl text-red-600">Pessoa não encontrada.</p>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg">
          <FaArrowLeft /> Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-3 h-screen bg-gray-100 p-4">
      <div className="max-w-4xl w-full rounded-2xl border border-gray-600 py-5 px-4 overflow-y-auto">
        <MensagemPopUp mensagem={mensagemReq.mensagem} erro={false} setMensagemReq={(mensagem) => setMensagemReq({ mensagem, erro: false })} />
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <FaArrowLeft /> Voltar
          </button>
        </div>

        <div id="ocorrenciaDiv" className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-6">
          <img
            src={!erro && pessoa.urlFoto ? pessoa.urlFoto : templateImg}
            alt={pessoa.nome}
            onError={() => setErro(true)}
            className="w-48 h-48 object-cover rounded-2xl shadow-md"
          />
          <h1 className="text-3xl font-bold text-center">{pessoa.nome}</h1>
          <span className={`px-4 py-1 rounded-full text-sm font-semibold ${pessoa.vivo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
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
              <li><strong>Data do desaparecimento:</strong> {formatarData(pessoa.ultimaOcorrencia.dtDesaparecimento)}</li>
              <li><strong>Local:</strong> {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}</li>
              {pessoa.ultimaOcorrencia.dataLocalizacao && (
                <li><strong>Data da localização:</strong> {formatarData(pessoa.ultimaOcorrencia.dataLocalizacao)}</li>
              )}
              <li><strong>Encontrado vivo:</strong> {pessoa.ultimaOcorrencia.encontradoVivo ? "Sim" : "Não"}</li>
            </ul>
          </div>

          <div className="w-full mt-6 text-left">
            <h2 className="text-xl font-semibold mb-2">Detalhes</h2>
            <p><strong>Vestimentas:</strong> {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || "Não informado"}</p>
            <p><strong>Informações adicionais:</strong> {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao || "Não informado"}</p>
          </div>

          {pessoa.ultimaOcorrencia.listaCartaz && pessoa.ultimaOcorrencia.listaCartaz.length > 0 && (
            <div className="w-full mt-6 text-left">
              <h2 className="text-xl font-semibold mb-4">Cartazes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pessoa.ultimaOcorrencia.listaCartaz.map((c, idx) => (
                  <div key={idx} className="border rounded-lg overflow-hidden shadow-sm">
                    <img src={c.urlCartaz} alt={c.tipoCartaz} className="w-full object-cover" />
                    <p className="p-2 text-sm text-gray-600 text-center">{c.tipoCartaz}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button onClick={copiarUrl} className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              <FaShareAlt /> Compartilhar
            </button>
            <button onClick={handleOpenModal} className="px-4 py-2 flex justify-center gap-2 items-center cursor-pointer border border-gray-400 rounded-lg hover:bg-gray-400">
              <MdSend size={20}/> Enviar informação
            </button>
            <button 
              onClick={() => setMostrarOcorrencias(!mostrarOcorrencias)} 
              className="px-4 py-2 flex justify-center gap-2 items-center cursor-pointer border border-gray-400 rounded-lg hover:bg-gray-400"
            >
              {mostrarOcorrencias ? <FaEyeSlash/> : <FaEye/>} 
              {mostrarOcorrencias ? "Ocultar ocorrências" : "Mostrar ocorrências"}
            </button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <OcorrenciaModal pessoa={pessoa} onClose={handleCloseModal} /> 
            </Modal>
          </div>
        </div>
      </div>
      {mostrarOcorrencias && (
        <div className="flex-1 overflow-y-auto p-4 bg-white rounded-2xl border border-gray-600">
          <MostrarOcorrencias isOcorrenciasLoading={isOcorrenciasLoading} ocorrencias={ocorrencias}/>
        </div>
      )}
    </div>
  );
}          {/* ... resto do seu JSX que depende de 'pessoa' ... */}
