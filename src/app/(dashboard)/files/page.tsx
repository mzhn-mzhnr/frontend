import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownWideNarrow, Plus } from "lucide-react";
import FileCard from "./components/file-card";
import FileDialog from "./components/file-dialog";

export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="scroll-m-20 text-xl font-bold lg:text-2xl">
        Список файлов
      </h1>
      <div className="flex w-full items-center gap-4">
        <input
          className="flex-grow rounded bg-gray-100 px-4 py-2"
          placeholder="Поиск"
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
        <FileCard type="pdf" name="01.pdf" date={1731080462000} />
        <FileCard type="pdf" name="02.pdf" date={1731080462000} />
        <FileCard type="txt" name="03.txt" date={1731080462000} />
        <FileCard type="pdf" name="04.pdf" date={1731080462000} />
      </section>
    </main>
  );
}
