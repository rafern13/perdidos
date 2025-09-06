import { useEffect, useState } from "react";
import type { DataInputProps } from "../tipos";

export function DataInput({value, label, onChange}: DataInputProps) {
    const [data, setData] = useState(value);

    useEffect(() => {
        if (data === "") {
            setData(obterDataFormatada());
            onChange(obterDataFormatada());
        }

    }, [data])
    
    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };
    
    const dataDeHoje = obterDataFormatada();

    return (
        <div className="flex flex-col justify-normal mb-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input 
                type="date"
                value={value === "" ? dataDeHoje : value}
                className="p-2 border w-40 rounded-md bg-white"
                onChange={handleDataChange}
            />
            <p className="text-red-500 text-sm mt-1 transition-opacity duration-300 opacity-0">
                .
            </p>
        </div>
    )
}

function obterDataFormatada() {
    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = hoje.getMonth() + 1;
    const ano = hoje.getFullYear();
  
    const diaFormatado = String(dia).padStart(2, "0");
    const mesFormatado = String(mes).padStart(2, "0");
  
    return `${ano}-${mesFormatado}-${diaFormatado}`; 
  }
  
  