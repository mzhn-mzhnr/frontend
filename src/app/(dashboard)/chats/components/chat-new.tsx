"use client";

import { newChat } from "@/api/chats";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bot, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useChatInitialContext } from "./chat-initial-provider";

export default function ChatNew() {
  const [message, setMessage] = useState("");
  const { setInitialMessage } = useChatInitialContext();

  const router = useRouter();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (message: string) => {
      const id = await newChat();
      setInitialMessage(message);
      client.invalidateQueries({ queryKey: ["chats"] });
      router.push(`/chats/${id}`);
    },
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(message);
  };

  return (
    <section className="flex h-full flex-col items-center justify-center gap-8 rounded bg-white p-8 shadow">
      <div className="flex flex-col items-center justify-center">
        <Bot className="size-48 text-blue-500" />
        <h1 className="text-xl font-bold">Задайте свой вопрос</h1>
      </div>
      <form className="flex w-full items-center gap-2" onSubmit={onSubmit}>
        <input
          className="w-full flex-grow rounded bg-black/5 px-8 py-4"
          placeholder="Написать вопрос..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          className="py-6"
          disabled={mutation.isPending || message.length == 0}
        >
          <Send />
        </Button>
      </form>
    </section>
  );
}
