"use client";

import { Message } from "@/api/chats";
import UserAvatar from "@/components/profile/avatar";
import { Button } from "@/components/ui/button";
import useProfile from "@/hooks/use-profile";
import { cn } from "@/lib/utils";
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
  const isFromMe = message.from_id !== undefined;

  const UserAvatar_ =
    isLoading || isError ? <div></div> : <UserAvatar user={data!} />;

  return (
    <div
      className={cn("flex items-center gap-4", isFromMe && "flex-row-reverse")}
    >
      {isFromMe ? UserAvatar_ : <ChatAvatar id={chat_id} />}
      <div className="w-min rounded p-4 shadow">{message.text}</div>
    </div>
  );
}

export default function ChatContent() {
  const { chat_id, messages, setMessages } = useChatContext();
  const { initialMessage } = useChatInitialContext();

  useEffect(() => {
    if (initialMessage == undefined || initialMessage == "") return;
    setMessages([
      { id: "0", text: initialMessage, from_id: "user" },
      ...messages,
    ]);
  }, []);

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
      <main className="flex-grow gap-4 px-8 py-4">
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
