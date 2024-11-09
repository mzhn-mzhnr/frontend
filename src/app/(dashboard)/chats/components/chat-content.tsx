"use client";

import { Message } from "@/api/chats";
import UserAvatar from "@/components/profile/avatar";
import { Button } from "@/components/ui/button";
import useProfile from "@/hooks/use-profile";
import { cn } from "@/lib/utils";
import { Send, X } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import useChat from "../hooks/use-chat";
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
      <div className="w-auto rounded p-4 shadow">{message.body}</div>
    </div>
  );
}

export default function ChatContent() {
  const { chat_id, setMessages } = useChatContext();
  const [message, setMessage] = useState("");
  const { messages, send, pendingMessage } = useChat();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessages([...messages, { body: message, isUser: true, createdAt: "" }]);
    setMessage("");

    send.mutate({ conversationId: chat_id, input: message });
  };
  // const { chat_id, messages, setMessages } = useChatContext();

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["chats", chat_id],
  //   queryFn: () => byId(chat_id),
  // });
  // const { initialMessage } = useChatInitialContext();
  // const [message, setMessage] = useState("");
  // // const [latestAiMessage, setLatestAiMessage] = useState("");
  // // const [fileData, setFiledata] = useState<FileData>();

  // useEffect(() => {
  //   if (!isLoading && !isError) {
  //     setMessages(data!.messages);
  //   }

  //   if (initialMessage == undefined || initialMessage == "") return;
  //   setMessages([
  //     { body: initialMessage, isUser: true, createdAt: "" },
  //     ...messages,
  //   ]);
  // }, [isLoading, isError]);

  // const sendMessage = useMutation({
  //   mutationFn: async (data: MessageData) => {
  //     setMessage("");
  //     const response = await send(data);
  //     if (!response.body) return;

  //     const reader = response.body
  //       .pipeThrough(new TextDecoderStream())
  //       .getReader();

  //     while (true) {
  //       const { value, done } = await reader.read();

  //       if (done) {
  //         console.log(latestAiMessage);
  //         setMessages([
  //           ...messages,
  //           { body: latestAiMessage, createdAt: "", isUser: false },
  //         ]);
  //         setLatestAiMessage("");
  //         break;
  //       }
  //       if (value) {
  //         const parsedData = value
  //           .split("\n")
  //           .filter((line) => line.startsWith("data: "));
  //         parsedData.forEach((d) => {
  //           const jsonData = JSON.parse(d.slice(6)) as Chunk;

  //           if (jsonData.response) {
  //             setLatestAiMessage(
  //               (prevState) => prevState + jsonData.response + "▌"
  //             );
  //           } else {
  //             setFiledata({
  //               fileId: jsonData.fileId!,
  //               filename: jsonData.filename!,
  //               slidenum: jsonData.slidenum!,
  //             });
  //           }
  //         });
  //       }
  //     }
  //   },
  // });

  // const onSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   const messageData: MessageData = {
  //     conversationId: chat_id,
  //     input: message,
  //   };
  //   sendMessage.mutate(messageData);
  // };

  // if (isLoading || isError) return <></>;

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
        {pendingMessage}
      </main>
      <form
        onSubmit={onSubmit}
        className="mt-auto flex items-center gap-2 border-t px-2"
      >
        <input
          className="flex-grow p-4"
          placeholder="Введите сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={send.isPending}
        />
        <Button
          variant={"ghost"}
          size={"icon"}
          disabled={message.length == 0 || send.isPending}
        >
          <Send />
        </Button>
      </form>
    </>
  );
}
