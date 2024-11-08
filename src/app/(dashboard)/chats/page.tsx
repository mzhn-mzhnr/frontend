import { TitleInit } from "@/components/providers/title";
import { MessageCircle } from "lucide-react";

export const metadata = {
  title: "Список чатов",
};

export default function Page() {
  return (
    <main className="h-full">
      <TitleInit title="Список чатов" />
      <section className="flex h-full flex-col items-center justify-center gap-4 rounded bg-white shadow">
        <MessageCircle className="size-48 text-black/10" />
        <h1 className="text-muted-foreground">Выберите чат из списка слева</h1>
      </section>
    </main>
  );
}
