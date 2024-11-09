"use client";

import { all, FileEntry } from "@/api/files";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useMemo, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(true);

  const files = useMemo(() => {
    if (!data) return [];
    return data
      .sort((a, b) => a.file_name.localeCompare(b.file_name))
      .filter(searchFiles(search ?? ""))
      .map((d) => ({ ...d, extension: getFileExtension(d.file_name) }));
  }, [data, search]);

  if (isLoading || isError) return <LoaderCircle className="animate-spin" />;

  return (
    <Collapsible className="w-full" open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="my-2 flex w-full p-2 text-start shadow transition">
        <ArrowRight className={cn("p-1", isOpen && "rotate-90")} />
        <p>Прочее</p>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex w-full flex-wrap gap-4">
        {files.map((f, i) => (
          <FileCard
            key={i}
            id={f.file_id}
            type={f.extension}
            name={f.file_name}
            date={1731216811000}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
