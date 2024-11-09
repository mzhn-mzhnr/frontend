"use client";

import { all, FileEntry } from "@/api/files";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useMemo } from "react";
import FileCard from "./file-card";

function getFileExtension(filename: string) {
  const match = filename.match(/\.([a-zA-Z0-9]+)$/);
  return match ? match[1].toLowerCase() : "unknown";
}

function searchFiles(search: string) {
  const searchPattern = search.toLowerCase();
  return (file: FileEntry) => {
    const filename = file.file_name.toLowerCase();
    return filename.includes(searchPattern);
  };
}

export default function FileContent({ search }: { search?: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["files"],
    queryFn: all,
  });

  const files = useMemo(() => {
    if (!data) return [];
    return data
      .sort((a, b) => a.file_name.localeCompare(b.file_name))
      .filter(searchFiles(search ?? ""))
      .map((d) => ({ ...d, extension: getFileExtension(d.file_name) }));
  }, [data, search]);

  if (isLoading || isError) return <LoaderCircle className="animate-spin" />;

  return (
    <>
      {files.map((f, i) => (
        <FileCard
          key={i}
          id={f.file_id}
          type={f.extension}
          name={f.file_name}
          date={1731216811000}
        />
      ))}
    </>
  );
}
