import React, { useState } from "react";
import type { TextInputProps } from "../tipos";

export function TextoInput({ validacaoRegex, label, placeholder, value, onChange }: TextInputProps) {
    const [isInvalid, setIsInvalid] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        const valid = validacaoRegex?.test(newValue);
        if (validacaoRegex && !valid) {
            setIsInvalid(true);
            return;
        }

        setIsInvalid(false);
        
        onChange(newValue);
    };

    return (
        <div className="flex flex-col w-80 justify-normal mb-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input 
                placeholder={placeholder}
                className={`p-2 bg-white border rounded-md ${isInvalid ? "border-red-500" : ""}`}
                value={value}
                onChange={handleInputChange}
            />
            <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ${isInvalid ? "opacity-100" : "opacity-0"}`}>
                Somente caracteres.
            </p>
        </div>
    );
}