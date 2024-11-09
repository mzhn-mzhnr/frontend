"use client";

import { Message } from "@/api/chats";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface ChatProviderProps extends PropsWithChildren {
  id: string;
  history: Message[];
}

const ChatContext = createContext<{
  chat_id: string;
  messages: Message[];
  setChatId: (value: string) => void;
  setMessages: (value: Message[]) => void;
}>({
  chat_id: "",
  messages: [],
  setChatId: () => {},
  setMessages: () => {},
});

export const ChatProvider = ({ children, id, history }: ChatProviderProps) => {
  const [chat_id, setChatId] = useState(id);
  const [messages, setMessages] = useState<Message[]>(history);

  return (
    <ChatContext.Provider value={{ chat_id, messages, setChatId, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export function useChatContext() {
  return useContext(ChatContext);
}
