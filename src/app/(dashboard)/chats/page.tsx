import { TitleInit } from "@/components/providers/title";
import ChatNew from "./components/chat-new";

export const metadata = {
  title: "Список чатов",
};

export default function Page() {
  return (
    <main className="h-full">
      <TitleInit title="Список чатов" />
      <ChatNew />
    </main>
  );
}
