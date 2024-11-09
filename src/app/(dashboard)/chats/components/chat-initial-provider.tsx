"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

interface ChatInitialProviderProps extends PropsWithChildren {}

const ChatInitialContext = createContext<{
  initialMessage?: string;
  setInitialMessage: (value: string) => void;
}>({
  initialMessage: "",
  setInitialMessage: () => {},
});

export const ChatInitialProvider = ({ children }: ChatInitialProviderProps) => {
  const [message, setMessage] = useState<string>();

  return (
    <ChatInitialContext.Provider
      value={{ initialMessage: message, setInitialMessage: setMessage }}
    >
      {children}
    </ChatInitialContext.Provider>
  );
};

export function useChatInitialContext() {
  return useContext(ChatInitialContext);
}
