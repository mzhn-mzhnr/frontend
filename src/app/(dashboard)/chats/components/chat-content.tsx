"use client";

import { Message } from "@/api/chats";
import UserAvatar from "@/components/profile/avatar";
import { Button } from "@/components/ui/button";
import useProfile from "@/hooks/use-profile";
import { cn } from "@/lib/utils";
import { LoaderCircle, Send, X } from "lucide-react";
import Link from "next/link";
import { createRef, FormEvent, useEffect, useState } from "react";
import useChat from "../hooks/use-chat";
import ChatAvatar from "./chat-avatar";
import { useChatInitialContext } from "./chat-initial-provider";
import { useChatContext } from "./chat-provider";

interface ChatMessageProps {
  message: Message;
}

interface Chunk {
  response?: string;
  fileId?: string;
  filename?: string;
  slidenum?: number;
}

interface FileData {
  fileId: string;
  filename: string;
  slidenum: number;
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
      <div className="flex w-auto flex-col gap-4 rounded p-4 shadow">
        <span>{message.body}</span>
        {message.meta && (
          <div className="border-t-2 border-black/10 py-2">
            <p className="py-2">Источники:</p>
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/fs/file/${message.meta.fileName}?id=${message.meta.fileId}#page=${message.meta.slideNum}`}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              {message.meta.fileName}, стр. {message.meta.slideNum}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatContent() {
  const mainRef = createRef<HTMLDivElement>();
  const { chat_id, setMessages } = useChatContext();
  const { initialMessage, setInitialMessage } = useChatInitialContext();
  const [input, setInput] = useState("");
  const { messages, send, pendingMessage } = useChat();

  useEffect(() => {
    mainRef.current?.scrollTo(0, mainRef.current?.scrollHeight);
    if (initialMessage != undefined) {
      console.log(initialMessage);
      setInput(initialMessage);
      setInitialMessage(undefined);
      onSubmit();
    }
  }, []);

  const onSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!input) {
      return;
    }
    setMessages([...messages, { body: input, isUser: true, createdAt: "" }]);
    setInput("");
    mainRef.current?.scrollTo(0, mainRef.current?.scrollHeight);
    send.mutate({ conversationId: chat_id, input: input });

    mainRef.current?.scrollTo(0, mainRef.current?.scrollHeight);
  };

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
      <main
        className="flex-grow space-y-4 overflow-y-auto px-8 py-4"
        ref={mainRef}
      >
        {messages.map((m, i) => (
          <ChatMessage key={i} message={m} />
        ))}
        {send.isPending && pendingMessage}
      </main>
      <form
        onSubmit={onSubmit}
        className={cn(
          "mt-auto flex items-center gap-2 border-t px-2",
          send.isPending && "bg-muted"
        )}
      >
        <input
          className="flex-grow p-4"
          placeholder="Введите сообщение"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={send.isPending}
        />
        <Button
          variant={"ghost"}
          size={"icon"}
          disabled={input.length == 0 || send.isPending}
        >
          {send.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Send />
          )}
        </Button>
      </form>
    </>
  );
}
