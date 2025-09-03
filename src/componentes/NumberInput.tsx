import { useState } from "react";
import type { InputConfig } from "../tipos";


export function NumberInput({ label, placeholder, value, onChange }: InputConfig) {
    
    const [isInvalid, setIsInvalid] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (newValue === "") {
            setIsInvalid(false);
            onChange(""); 
            return;
        }


        const hasNonNumeric = /[^\d]/.test(newValue);
        if (hasNonNumeric) {
            setIsInvalid(true);
            return;
        } else {
            setIsInvalid(false);
        }

        const convertedValue = Number(newValue);
        if (isNaN(convertedValue) || convertedValue < 0) {
            setIsInvalid(true);
            return;
        }

        onChange(convertedValue);
    };

    return (
        <div className="flex flex-col w-30 justify-normal mb-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                className={`p-2 border bg-white rounded-md ${isInvalid ? "border-red-500" : ""}`}
            />
            <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ${isInvalid ? "opacity-100" : "opacity-0"}`}>
                Numero inválido.
            </p>
        </div>
    );
}