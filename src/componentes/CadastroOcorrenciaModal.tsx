import { useEffect, useState } from "react";
import type { MensagemProps, Ocorrencia, Pessoa } from "../tipos";
import { TextoInput } from "./InputTexto";
import { DataInput } from "./dataInput";
import InputAnexo from "./AnexoInput";
import MensagemPopUp from "./ErroPopUp";

type modalProps = {
    pessoa: Pessoa;
    onClose: () => void;
}

export default function OcorrenciaModal({ pessoa, onClose }: modalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [mensagemReq, setMensagemReq] = useState<MensagemProps>({
    mensagem: "",
    erro: false,
  });

  const [ocorrencia, setOcorrencia] = useState<Ocorrencia>({
    ocoId: pessoa.ultimaOcorrencia.ocoId,
    informacao: "",
    data: "",
    descricao: "",
    id: pessoa.id,
    anexos: [""],
    arquivo: new File([], ""),
  });

  console.log(ocorrencia.ocoId)

  const submitar = async () => {
    setIsSaving(true);
  
    try {
      const req = "https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido";
  
      const formData = new FormData();
      formData.append("ocoId", String(ocorrencia.ocoId));
      formData.append("informacao", ocorrencia.informacao);
      formData.append("data", ocorrencia.data);
      formData.append("descricao", ocorrencia.descricao);
      formData.append("id", String(ocorrencia.id));
  
      if (ocorrencia.arquivo && ocorrencia.arquivo.size > 0) {
        formData.append("arquivo", ocorrencia.arquivo);
      }
  
      const res = await fetch(req, {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) {
        throw new Error("Falha na requisição");
      }
      
      await res.json();

      setMensagemReq({
        mensagem: "Ocorrência salva com sucesso!",
        erro: false,
      })

      setTimeout(() => {
        onClose();
      }, 3000)
    } catch (e) {
      setMensagemReq({
        mensagem: "Erro ao salvar ocorrência. Tente novamente.",
        erro: true,
      });
    } finally {
      setIsSaving(false);
    }
  };
  

  return (
    <div className="flex flex-col w-full p-4 h-full">
      <MensagemPopUp 
        mensagem={mensagemReq.mensagem}
        erro={mensagemReq.erro}
        setMensagemReq={(mensagem) => setMensagemReq({ mensagem, erro: false })}

      />
      <h2 className="text-2xl font-bold mb-2">Cadastrar Ocorrência</h2>

      <div className="flex justify-between gap-5 flex-col lg:flex-row-reverse mb-4 flex-grow">
        <InputAnexo
          setArquivo={(arquivo) => {
            setArquivo(arquivo);
            if (Array.isArray(arquivo)) {
              setOcorrencia({ ...ocorrencia, arquivo: arquivo[0] });
            } else if (arquivo) {
              setOcorrencia({ ...ocorrencia, arquivo: arquivo });
            }
          }}
          label="Anexar arquivo"
          preview={true}
          previewWidth={200}
          previewHeight={200}
        />

        <div className="flex flex-col gap-3">
          <TextoInput
            validacaoRegex={/.*/}
            label="Informações"
            placeholder="Descreva a ocorrência"
            value={ocorrencia.informacao}
            onChange={(value) =>
              setOcorrencia({ ...ocorrencia, informacao: value })
            }
          />
          <TextoInput
            validacaoRegex={/.*/}
            label="Descrição"
            placeholder="Descrição do anexo"
            value={ocorrencia.descricao}
            onChange={(value) =>
              setOcorrencia({ ...ocorrencia, descricao: value })
            }
          />
          <DataInput
            label="Data de avistamento"
            value={ocorrencia.data}
            onChange={(value: string) => setOcorrencia({ ...ocorrencia, data: value })}
          />
        </div>
      </div>

      <div className="flex justify-end items-baseline gap-2 mt-auto">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          disabled={isSaving}
        >
          Cancelar
        </button>
        <button
          onClick={submitar}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
            isSaving ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSaving}
        >
          {isSaving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}
