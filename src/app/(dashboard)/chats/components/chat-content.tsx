"use client";

import { Message } from "@/api/chats";
import UserAvatar from "@/components/profile/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useProfile from "@/hooks/use-profile";
import { cn } from "@/lib/utils";
import { LoaderCircle, Plus, Send, X } from "lucide-react";
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
        {message.sources && message.sources.length > 0 && (
          <div className="border-t-2 border-black/10 py-2">
            <p className="py-2">Источники:</p>
            {message.sources.map((m, i) => (
              <a
                key={i}
                href={`${process.env.NEXT_PUBLIC_API_URL}/fs/file/${m.fileName}?id=${m.fileId}#page=${m.slideNum}`}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                {m.fileName}, стр. {m.slideNum}
              </a>
            ))}
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
      setInput(initialMessage);
      setInitialMessage(undefined);
      onSubmit();
    }
  }, []);

  useEffect(() => {
    if (input != "" && initialMessage == undefined) onSubmit();
  }, [initialMessage]);

  const onSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!input) {
      return;
    }
    setMessages([...messages, { body: input, isUser: true, createdAt: "" }]);
    setInput("");
    setTimeout(() => {
      mainRef.current?.scrollTo(0, mainRef.current?.scrollHeight);
      send.mutate({ conversationId: chat_id, input: input });

      setTimeout(() => {
        mainRef.current?.scrollTo(0, mainRef.current?.scrollHeight);
      }, 0);
    }, 0);
  };

  return (
    <>
      <header className="flex items-center justify-between border-b px-4 py-2 font-bold">
        <div className="flex items-center gap-4">
          <ChatAvatar id={chat_id} />
          <Button variant={"secondary"} asChild>
            <Link href={"/chats"}>
              <Plus />
              Новый вопрос
            </Link>
          </Button>
        </div>
        Чат
        <Button variant={"ghost"} size={"icon"} asChild>
          <Link href="/chats">
            <X />
          </Link>
        </Button>
      </header>
      <main
        className="max-h-[calc(100vh-200px)] flex-grow px-4 py-2"
        ref={mainRef}
      >
        <ScrollArea className="h-full px-4 py-2">
          <div className="space-y-4">
            {messages.map((m, i) => (
              <ChatMessage key={i} message={m} />
            ))}
          </div>
        </ScrollArea>
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
