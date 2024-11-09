"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownWideNarrow, Plus } from "lucide-react";
import { useState } from "react";
import FileContent from "./components/file-content";
import FileDialog from "./components/file-dialog";

export default function Page() {
  const [search, setSearch] = useState("");

  return (
    <main className="flex flex-col gap-4">
      <h1 className="scroll-m-20 text-xl font-bold lg:text-2xl">
        Список файлов
      </h1>
      <div className="flex w-full items-center gap-4">
        <input
          className="flex-grow rounded bg-gray-100 px-4 py-2"
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <ArrowDownWideNarrow />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>По имени</DropdownMenuItem>
            <DropdownMenuItem>По типу</DropdownMenuItem>
            <DropdownMenuItem>По дате</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <FileDialog>
          <Button>
            <Plus />
            Добавить
          </Button>
        </FileDialog>
      </div>
      <section className="flex flex-wrap justify-center gap-4 bg-white p-8 shadow md:justify-start">
        <FileContent search={search} />
      </section>
    </main>
  );
}
