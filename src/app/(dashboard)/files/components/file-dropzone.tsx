"use client";

import { AuthResult } from "@/api/auth";
import { cookies } from "@/lib/auth/cookie";
import { getSession } from "@/lib/auth/session";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export interface FileDropzoneProps {}

export default function FileDropzone({}: FileDropzoneProps) {
  const headers = new Headers({});
  const [isPending, setPending] = useState(true);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const authData = await getSession<AuthResult>();
    headers.set("Cookie", cookies().toString());

    if (authData) {
      headers.set("Authorization", `Bearer ${authData.accessToken}`);
    }

    const formData = new FormData();
    acceptedFiles.forEach((file, index) => {
      formData.append("files", file, file.name);
    });
    setPending(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/files`, {
      method: "PUT",
      body: formData,
      headers,
    }).finally(() => {
      setPending(false);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      className={cn(
        "cursor-pointer border-2 border-dashed border-blue-300 p-16 hover:border-blue-500",
        isPending && "bg-muted hover:border-blue-300"
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} disabled={isPending} />
      {isDragActive ? (
        <p>Перетащите файлы сюда ...</p>
      ) : (
        <p className="text-center">
          {isPending
            ? "Загрузка..."
            : "Перетащите сюда файлы или нажмите для выбора"}
        </p>
      )}
    </div>
  );
}
