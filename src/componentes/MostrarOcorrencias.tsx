import type { Ocorrencia } from "@/tipos";

type Props = {
    ocorrencias: Ocorrencia[];
    isOcorrenciasLoading?: boolean;
}

export default function MostrarOcorrencias( { ocorrencias, isOcorrenciasLoading } : Props) { 

    console.log(ocorrencias)

    if (ocorrencias.length === 0) {
        return <p>Nenhuma ocorrência encontrada.</p>;
    }

    if (isOcorrenciasLoading) {
        return <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400"></div>
    }

    return (
        <div className="max-w-4xl py-5 px-4">
            <p className="text-4xl mb-2 text-center">Ocorrências</p>
            {ocorrencias.map((ocorrencia) => (
                <div key={ocorrencia.ocoId} className="border p-4 mb-4 rounded-lg shadow-md">
                    <p><strong>Data da Ocorrência: </strong> {new Date(ocorrencia.data).toLocaleDateString()}</p>
                    <p><strong>Descrição: </strong>{ocorrencia.informacao}</p>
                    {ocorrencia.anexos && ocorrencia.anexos.length > 0 && (
                        <div className="mt-2">
                            <strong>Anexos:</strong>
                            <ul className="list-disc list-inside">
                                {ocorrencia.anexos.map((anexo, index) => (
                                    <li key={index}>
                                        <a href={anexo} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                            Ver Anexo {index + 1}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}