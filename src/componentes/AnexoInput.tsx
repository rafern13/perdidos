import { useState } from "react";

export type AnexoInputProps = {
    setArquivo: (file: File | File[] | null) => void;
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
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {props.label || "Anexo"}
        </label>
  
        <input
          type="file"
          accept={props.acceptedFormats?.join(", ")}
          multiple={props.multiple}
          onChange={(e) => {
            const files = e.target.files;
            if (!files || files.length === 0) {
              props.setArquivo(null);
              setPreviewUrl(null);
              return;
            }
  
            const fileArray = Array.from(files);
  
            if (props.maxFileSizeMB) {
              for (const file of fileArray) {
                if (file.size > props.maxFileSizeMB * 1024 * 1024) {
                  props.onError?.(
                    `O arquivo ${file.name} excede o tamanho máximo de ${props.maxFileSizeMB}MB.`
                  );
                  return;
                }
              }
            }
  
            props.setArquivo(props.multiple ? fileArray : fileArray[0]);
  
            if (!props.multiple && props.preview) {
              setPreviewUrl(URL.createObjectURL(fileArray[0]));
            }
          }}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100 mb-4
          "
        />
  
        {props.preview && previewUrl && (
          <div className="mx-auto">
            <img
              src={previewUrl}
              alt="Preview"
              width={props.previewWidth || 200}
              height={props.previewHeight || 200}
              className="object-cover border rounded"
            />
          </div>
        )}
      </div>
    );
  }
  