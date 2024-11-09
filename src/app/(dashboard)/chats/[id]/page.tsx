import { byId } from "@/api/chats";
import ChatContent from "../components/chat-content";
import { ChatProvider } from "../components/chat-provider";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const chat = await byId(params.id);

  if (!chat) return <></>;

  return (
    <section className="flex h-full max-h-[calc(100vh-80px)] flex-col rounded bg-white shadow">
      <ChatProvider id={params.id} history={chat.messages}>
        <ChatContent />
      </ChatProvider>
    </section>
  );
}
