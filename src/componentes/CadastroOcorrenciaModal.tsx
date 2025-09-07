import { useState } from "react";
import type { MensagemProps, Ocorrencia, Pessoa } from "../tipos";
import { TextoInput } from "./InputTexto";
import { DataInput } from "./dataInput";
import InputAnexo from "./AnexoInput";
import MensagemPopUp from "./ErroPopUp";
import { FaRegWindowClose, FaSave } from "react-icons/fa";

type modalProps = {
    pessoa: Pessoa;
    onClose: () => void;
    OnCadastroSucesso: () => void;
}

export default function OcorrenciaModal({ pessoa, onClose, OnCadastroSucesso }: modalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [mensagemReq, setMensagemReq] = useState<MensagemProps>({
    mensagem: "",
    erro: false,
  });

  const [ocorrencia, setOcorrencia] = useState<Ocorrencia>({
    ocoId: pessoa.ultimaOcorrencia.ocoId,
    informacao: "",
    data: "",
    id: pessoa.id,
    anexos: [""],
    arquivo: [],
  });

  const validar = () => {
    if (!ocorrencia.informacao || ocorrencia.informacao.trim() === "") {
      setMensagemReq({
        mensagem: "O campo 'Informações' é obrigatório.",
        erro: true,
      });
      return false;
    }
    if (!ocorrencia.data || ocorrencia.data.trim() === "") {
      setMensagemReq({
        mensagem: "O campo 'Data de avistamento' é obrigatório.",
        erro: true,
      });
      return false;
    }

    return true;
  };

  const submitar = async () => {
    setIsSaving(true);
  
    try {
      const req = "https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido";
  
      const formData = new FormData();
      formData.append("ocoId", String(ocorrencia.ocoId));
      formData.append("informacao", ocorrencia.informacao);
      formData.append("data", ocorrencia.data);
  
      if (ocorrencia.arquivo && ocorrencia.arquivo.length > 0) {
        ocorrencia.arquivo.map((arquivo) => {
          formData.append("files", arquivo);
        })
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
        OnCadastroSucesso();
        onClose();
      }, 3000)
    } catch {
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
          setArquivo={(arquivos) => {
              setOcorrencia({ ...ocorrencia, arquivo: arquivos });
            }
          }
          label="Anexar arquivo"
          multiple={true}
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
          <DataInput
            label="Data de avistamento"
            value={ocorrencia.data}
            onChange={(value: string) => setOcorrencia({ ...ocorrencia, data: value })}
          />
        </div>
      </div>
      <div className="flex justify-end items-center gap-2 mt-auto">
        <button
          onClick={onClose}
          className="bg-gray-500 flex justify-center gap-2 items-center text-white px-4 py-2 rounded hover:bg-gray-600"
          disabled={isSaving}
        >
          <FaRegWindowClose className="inline mr-2" />

          Cancelar
        </button>
        <button
          onClick={() => {
            if (!validar()) { 
              return;
            }

            submitar();
          }}
          className={`bg-blue-500 flex justify-center gap-2 items-center text-white px-4 py-2 rounded hover:bg-blue-600 ${
            isSaving ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSaving}
        >
          <FaSave className="inline mr-2" />
          {isSaving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}
