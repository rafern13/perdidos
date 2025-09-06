import { useState } from "react";
import type { Ocorrencia } from "../tipos";
import { TextoInput } from "./InputTexto";
import { DataInput } from "./dataInput";
import InputAnexo from "./AnexoInput";

type modalProps = {
    pessoaId: number;
    onClose: () => void;
}

export default function OcorrenciaModal({ pessoaId, onClose }: modalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [arquivo, setArquivo] = useState<File | File[] | null>(null);

  const [ocorrencia, setOcorrencia] = useState<Ocorrencia>({
    ocoId: 0,
    informacao: "",
    data: "",
    descricao: "",
    id: pessoaId,
    anexos: [""],
  });

  const submitar = async () => {
    setIsSaving(true);
    const params = new URLSearchParams();
    params.append("id", pessoaId.toString());
    params.append("informacao", ocorrencia.informacao);
    params.append("data", ocorrencia.data);
    params.append("descricao", ocorrencia.descricao);

    try {
      const formData = new FormData();

      if (arquivo) {
        if (Array.isArray(arquivo)) {
          arquivo.forEach((file) => formData.append("anexos", file));
        } else {
          formData.append("anexos", arquivo);
        }
      }

      const req = `https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido&${params.toString()}`
      console.log(req)
      const res = await fetch(
        req,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Falha na requisição");

      await res.json();
      onClose();
    } catch (err) {
      console.error("Erro ao buscar API:", err);
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col w-full p-4 h-full">
      <h2 className="text-2xl font-bold mb-2">Cadastrar Ocorrência</h2>

      {isError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Erro!</strong>
          <span className="block sm:inline">
            {" "}
            Não foi possível salvar a ocorrência.
          </span>
        </div>
      )}

      <div className="flex justify-between gap-5 flex-col lg:flex-row-reverse mb-4 flex-grow">
        <InputAnexo
          setArquivo={setArquivo}
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
