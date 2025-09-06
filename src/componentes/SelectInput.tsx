import React from "react";
import type { SelectInputProps } from "../tipos";


export function SelectInput({ label, value, options, onChange }: SelectInputProps) {
    
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="flex flex-col justify-normal mb-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                value={value}
                onChange={handleSelectChange}
                className="p-2.5 border rounded-md bg-white"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <p className="text-red-500 text-sm mt-1 transition-opacity duration-300 opacity-0">
                .
            </p>
        </div>
    );
}