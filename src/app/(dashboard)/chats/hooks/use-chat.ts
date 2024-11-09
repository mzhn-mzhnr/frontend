import { MessageData, send } from "@/api/chats";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useChatContext } from "../components/chat-provider";
import { Chunk } from "../stream/lib";

function dataToChunkArray(value: string): Chunk[] {
  return value
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => JSON.parse(line.slice(6)));
}

export interface FileMetadata {
  fileId: string;
  filename: string;
  slidenum: number;
}

export default function useChat() {
  const { chat_id, messages, setMessages } = useChatContext();
  const [pendingMessage, setPendingMessage] = useState("");
  const [fileMeta, setFileMeta] = useState<FileMetadata>();

  const sendMessage = useMutation({
    mutationFn: async (data: MessageData) => {
      const response = await send(data);
      if (!response.body) return;

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
      let latestMessage = "";

      while (true) {
        const { value, done } = await reader.read();
        console.log(value);

        if (done) break;
        if (!value) continue;

        dataToChunkArray(value).forEach((chunk) => {
          if (chunk.response) {
            latestMessage += chunk.response;
            setPendingMessage(latestMessage);
            return;
          }
          setFileMeta({
            fileId: chunk.fileId!,
            filename: chunk.filename!,
            slidenum: chunk.slidenum!,
          });
        });
      }
      setPendingMessage("");
      setMessages([
        ...messages,
        { body: latestMessage, createdAt: "", isUser: false },
      ]);
    },
  });

  return { messages, send: sendMessage, pendingMessage, fileMeta };
}
