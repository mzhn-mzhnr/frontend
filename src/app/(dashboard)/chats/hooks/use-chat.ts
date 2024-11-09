import { Message, MessageData, Meta, send as apiSend } from "@/api/chats";
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

export default function useChat() {
  const { chat_id, messages, setMessages } = useChatContext();
  const [pendingMessage, setPendingMessage] = useState("");
  const [fileMeta, setFileMeta] = useState<Meta>();
  const [finalMessage, setFinalMessage] = useState("");

  let fileMetaTmp: Meta;

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
      // const reader = response.body
      //   .pipeThrough(new TextDecoderStream())
      //   .getReader();
      // let latestMessage = "";

      // while (true) {
      //   const { value, done } = await reader.read();
      //   console.log(value);

      //   if (done) {
      //     setFinalMessage(latestMessage);
      //     break;
      //   }
      //   if (!value) continue;

      //   dataToChunkArray(value).forEach((chunk) => {
      //     if (chunk.response) {
      //       latestMessage += chunk.response;
      //       setPendingMessage(latestMessage);
      //       return;
      //     }
      //     setFileMeta({
      //       fileId: chunk.fileId!,
      //       fileName: chunk.filename!,
      //       slideNum: chunk.slidenum!,
      //     });
      //   });
      // }
    },
  });

  // useEffect(() => {
  //   if (finalMessage == "") return;
  //   setPendingMessage("");

  //   setMessages([
  //     ...messages,
  //     {
  //       body: finalMessage,
  //       createdAt: "",
  //       isUser: false,
  //       meta: fileMeta,
  //     },
  //   ]);
  // }, [finalMessage]);

  return { messages, send: sendMessage, pendingMessage, fileMeta };
}
