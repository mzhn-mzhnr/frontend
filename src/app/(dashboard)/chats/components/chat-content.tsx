"use client";

import { Message, MessageData, send } from "@/api/chats";
import UserAvatar from "@/components/profile/avatar";
import { Button } from "@/components/ui/button";
import useProfile from "@/hooks/use-profile";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Send, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import ChatAvatar from "./chat-avatar";
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
      <div className="flex w-auto flex-col rounded p-4 shadow">
        <span>{message.body}</span>
        {message.meta && (
          <div>
            <span className="border p-2">
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}/fs/file/${message.meta.fileName}?id=${message.meta.fileId}#page=${message.meta.slideNum}`}
                target="_blank"
                className="hover:underline"
              >
                {message.meta.fileName}, стр. {message.meta.slideNum}
              </a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatContent() {
  const { chat_id, messages, setMessages } = useChatContext();
  const [input, setInput] = useState("");
  const [pendingMessage, setPendingMessage] = useState<string | undefined>();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: MessageData) => {
      const response = await send(data);
      if (!response.body) {
        console.log("do nothing");
        throw new Error();
      }

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("break");
          break;
        }

        console.log(value);

        type resp = {
          response: string;
        };

        const chunk = value.split("\n").find((v) => v.startsWith("data: "));

        if (!chunk) {
          continue;
        }

        const data: resp = JSON.parse(chunk.slice(5));

        console.log("set pending message with", data.response);

        setPendingMessage((v) => (v ? v + data.response : data.response));
      }
    },
    onSuccess: () => {
      setPendingMessage(undefined);
      router.refresh();
    },
    onError: () => {
      router.refresh();
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    setMessages([...messages, { body: input, isUser: true, createdAt: "" }]);
    setInput("");
    mutate({ conversationId: chat_id, input: input });
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
      <main className="flex-grow space-y-4 px-8 py-4">
        {messages.map((m, i) => (
          <ChatMessage key={i} message={m} />
        ))}
        {isPending && pendingMessage}
      </main>
      <form
        onSubmit={onSubmit}
        className="mt-auto flex items-center gap-2 border-t px-2"
      >
        <input
          className="flex-grow p-4"
          placeholder="Введите сообщение"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isPending}
        />
        <Button
          variant={"ghost"}
          size={"icon"}
          disabled={input.length == 0 || isPending}
        >
          <Send />
        </Button>
      </form>
    </>
  );
}
