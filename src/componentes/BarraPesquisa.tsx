import { useState } from "react";
import type { FiltrosPesquisa } from "../tipos";
import { NumberInput } from "./NumberInput"; 
import { SelectInput } from "./SelectInput";
import { TextoInput } from "./InputTexto";
import { FaFilter } from "react-icons/fa";
import { FcClearFilters } from "react-icons/fc";

type Prop = {
    onSearch: (filtros: FiltrosPesquisa) => void;
}

export function BarraPesquisa({ onSearch }: Prop) {
    const [filtros, setFiltros] = useState<FiltrosPesquisa>({
        nome: "",
        faixaIdadeInicial: "",
        faixaIdadeFinal: "",
        status: "",
    })

    const handleSearchClick = () => {
        onSearch(filtros)
    }

    const statusOptions = [
        { value: "", label: "Status" },
        { value: "LOCALIZADO", label: "LOCALIZADO" },
        { value: "DESAPARECIDO", label: "DESAPARECIDO" },
    ];

    return (
        <div className="flex sticky flex-col items-center md:flex-row justify-center items-baseline flex-wrap gap-4 p-1 bg-gray-100  rounded-lg shadow-md">
            <TextoInput
                label="Nome"
                value={filtros.nome}
                validacaoRegex={/^([A-z]|\s)*$/}
                onChange={(value) => setFiltros(prevFiltros => ({...prevFiltros, nome: value}))}
            />
            <NumberInput
                label="Idade Inicial"
                value={filtros.faixaIdadeInicial}
                onChange={(value) => setFiltros(prevFiltros => ({ ...prevFiltros, faixaIdadeInicial: value }))}
            />
            <NumberInput
                label="Idade Final"
                value={filtros.faixaIdadeFinal}
                onChange={(value) => setFiltros(prevFiltros => ({ ...prevFiltros, faixaIdadeFinal: value }))}
            />
            <SelectInput
                label="Status"
                value={filtros.status}
                options={statusOptions}
                onChange={(value) => setFiltros(prevFiltros => ({ ...prevFiltros, status: value }))}
            />

            <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex flex-col justify-normal mb-1">
                    <label className="block text-sm font-medium text-white mb-1">
                        .
                    </label>
                    <button
                        onClick={handleSearchClick}
                        className="bg-blue-500 flex justify-center gap-2 items-center text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        <FaFilter className="inline mr-2" />
                        Filtrar
                    </button>
                    <p className="text-red-500 text-sm mt-1 transition-opacity duration-300 opacity-0">
                        .
                    </p>
                </div>
                <div className="flex flex-col justify-normal mb-1">
                    <label className="block text-sm font-medium text-white mb-1">
                        .
                    </label>
                    <button
                        onClick={() => setFiltros({
                            nome: "",
                            faixaIdadeInicial: "",
                            faixaIdadeFinal: "",
                            status: "",
                        })}
                        className="bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400"
                    >
                        <FcClearFilters className="inline mr-2" />
                        Limpar Filtro
                    </button>
                    <p className="text-red-500 text-sm mt-1 transition-opacity duration-300 opacity-0">
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}