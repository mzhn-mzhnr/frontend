"use client";

import { byId, Message } from "@/api/chats";
import UserAvatar from "@/components/profile/avatar";
import { Button } from "@/components/ui/button";
import useProfile from "@/hooks/use-profile";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Send, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import ChatAvatar from "./chat-avatar";
import { useChatInitialContext } from "./chat-initial-provider";
import { useChatContext } from "./chat-provider";

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message }: ChatMessageProps) {
  const { chat_id } = useChatContext();
  const { data, isLoading, isError } = useProfile();

  const UserAvatar_ =
    isLoading || isError ? <div></div> : <UserAvatar user={data!} />;

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        message.isUser && "flex-row-reverse"
      )}
    >
      {message.isUser ? UserAvatar_ : <ChatAvatar id={chat_id} />}
      <div className="w-auto rounded p-4 shadow">{message.body}</div>
    </div>
  );
}

export default function ChatContent() {
  const { chat_id, messages, setMessages } = useChatContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["chats", chat_id],
    queryFn: () => byId(chat_id),
  });
  const { initialMessage } = useChatInitialContext();

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log(data!.messages);

      setMessages(data!.messages);
    }

    if (initialMessage == undefined || initialMessage == "") return;
    setMessages([
      { id: "0", body: initialMessage, isUser: true, createdAt: "" },
      ...messages,
    ]);
  }, [isLoading, isError]);

  if (isLoading || isError) return <></>;

  return (
    <>
      <header className="flex items-center justify-between border-b px-4 py-2 font-bold">
        <ChatAvatar id={chat_id} />
        Чат
        <Button variant={"ghost"} size={"icon"} asChild>
          <Link href="/chats">
            <X />
          </Link>
        </Button>
      </header>
      <main className="flex-grow space-y-4 px-8 py-4">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
      </main>
      <footer className="mt-auto flex items-center gap-2 border-t px-2">
        <input className="flex-grow p-4" placeholder="Введите сообщение" />
        <Button variant={"ghost"} size={"icon"}>
          <Send />
        </Button>
      </footer>
    </>
  );
}
