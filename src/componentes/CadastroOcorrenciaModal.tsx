import { useState } from "react";
import type { Ocorrencia } from "../tipos";
import { TextoInput } from "./InputTexto";
import { DataInput } from "./dataInput";

type modalProps = {
    pessoaId: number;
    onClose: () => void;
}


export default function OcorrenciaModal( {pessoaId, onClose} : modalProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [isError, setIsError] = useState(false);

    const [ocorrencia, setOcorrencia] = useState<Ocorrencia>({
        ocoId: 0,
        informacao: "vi na rua 10 na esquina",
        data: "2022-01-28",
        descricao: "abluablu",
        id: pessoaId,
        anexos: [
          "asdasdasdasdasdasdasdasdasd"
        ]
      });
      
      const submitar = () => {
        setIsSaving(true);

        fetch("https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(ocorrencia)
        })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Falha na requisição");
          }
          return res.json();
        }).then((data) => {
          onClose();
        }).catch((err) => {
          console.error("Erro ao buscar API:", err);
          setIsError(true);
          setTimeout(() => setIsError(false), 3000);
        }).finally(() => {  
          setIsSaving(false);
        })
    }

      const handleOcorrenciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOcorrencia({ ...ocorrencia, [e.target.name]: e.target.value });
      }

      return (
        <div className="w-full p-4">
          <h2 className="text-2xl font-bold mb-2">Cadastrar Ocorrência</h2>
          <div className="">
            {isError ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Erro!</strong>
                <span className="block sm:inline"> Não foi possível salvar a ocorrência.</span>
              </div>
            ) : null}  
          </div>
          <div className="mb-4 w-[90%]">
            <TextoInput
                //validacaoRegex={/^[\p{L}\d\s'°.,-/#]*$/u}
                validacaoRegex={/.*/}
                label="Informações"
                placeholder="Descreva a ocorrência"
                value={ocorrencia.informacao}
                onChange={(value) => setOcorrencia({...ocorrencia, informacao: value})}
            />
            <TextoInput
                validacaoRegex={/.*/}
                label="Descrição"
                placeholder="Descrição do anexo"
                value={ocorrencia.descricao}
                onChange={(value) => setOcorrencia({...ocorrencia, informacao: value})}
            />
            <DataInput
              label="data de avistamento" value={ocorrencia.data} onChange={(value) => setOcorrencia({...ocorrencia, data: value})}
            />
          </div>

        </div>
      );
    

}