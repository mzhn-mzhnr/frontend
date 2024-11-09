import { Message, MessageData, send as apiSend } from "@/api/chats";
import { useMutation } from "@tanstack/react-query";
import { useChatContext } from "../components/chat-provider";

export interface Chunk {
  response?: string;
  fileId?: string;
  filename?: string;
  slidenum?: number;
}

function dataToChunkArray(value: string): Chunk[] {
  return value
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => JSON.parse(line.slice(6)));
}

export default function useChat() {
  const { messages, setMessages } = useChatContext();

  const sendMessage = useMutation({
    mutationFn: async (data: MessageData) => {
      const response = await apiSend(data);
      const message: Message = {
        body: response.answer,
        sources: response.sources,
        createdAt: "",
        isUser: false,
      };

      setMessages([...messages, message]);
    },
  });

  return { messages, send: sendMessage };
}
