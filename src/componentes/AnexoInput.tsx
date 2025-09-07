import { useState, useEffect } from "react";

export type AnexoInputProps = {
    setArquivo: (file: File[] | null) => void;
    acceptedFormats?: string[];
    maxFileSizeMB?: number;
    label?: string;
    multiple?: boolean;
    preview?: boolean;
    previewWidth?: number;
    previewHeight?: number;
    onError?: (message: string) => void;
  };
  
export default function InputAnexo(props: AnexoInputProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      props.setArquivo(null);
      setPreviewUrls([]);
      return;
    }

    const fileArray = Array.from(files);

    if (props.maxFileSizeMB) {
      for (const file of fileArray) {
        if (file.size > props.maxFileSizeMB * 1024 * 1024) {
          props.onError?.(
            `O arquivo ${file.name} excede o tamanho máximo de ${props.maxFileSizeMB}MB.`
          );
          e.target.value = "";
          props.setArquivo(null);
          setPreviewUrls([]);
          return;         

        }
      }
    }

    props.setArquivo(fileArray);
    
    if (props.preview) {
      const newPreviewUrls = fileArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(newPreviewUrls);
    }
  };
  
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]); 
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {props.label || "Anexo"}
      </label>

      <input
        type="file"
        accept={props.acceptedFormats?.join(", ")}
        multiple={props.multiple}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100 mb-4
        "
      />

      {props.preview && previewUrls.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="mx-auto">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                width={props.previewWidth || 150}
                height={props.previewHeight || 150}
                className="object-cover border rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}