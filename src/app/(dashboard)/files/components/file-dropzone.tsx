"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export interface FileDropzoneProps {}

export default function FileDropzone({}: FileDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      className="cursor-pointer border-2 border-dashed border-blue-300 p-16 hover:border-blue-500"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Перетащите файлы сюда ...</p>
      ) : (
        <p className="text-center">
          Перетащите сюда файлы или нажмите для выбора
        </p>
      )}
    </div>
  );
}
