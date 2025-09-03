import type { DataInputProps } from "../tipos";


export function DataInput({value, label, onChange}: DataInputProps) {

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        };

    return (
        <div className="flex flex-col justify-normal mb-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input 
                type="date"
                value={value}
                className="p-2 border rounded-md bg-white"
                onChange={handleDataChange}
            />
            <p className="text-red-500 text-sm mt-1 transition-opacity duration-300 opacity-0">
                .
            </p>
        </div>
    )
}