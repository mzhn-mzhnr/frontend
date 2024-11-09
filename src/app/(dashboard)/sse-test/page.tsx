"use client";

import { TitleInit } from "@/components/providers/title";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [latestMessage, setLatestMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const testStream = async () => {
    const apiResponse = await fetch("/sse-test/stream", {
      method: "POST",
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
    if (!apiResponse.body) return;

    const reader = apiResponse.body
      .pipeThrough(new TextDecoderStream())
      .getReader();
    let incomingMessage = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        setMessages([...messages, incomingMessage]);
        setLatestMessage("");
        break;
      }
      if (value) {
        incomingMessage += value;
        setLatestMessage(incomingMessage + "▌");
      }
    }
  };

  return (
    <main>
      <TitleInit title="Тест SSE" />
      {messages.map((m) => (
        <p key={m}>{m}</p>
      ))}
      <p>Текущее сообщение: {latestMessage}</p>
      <Button onClick={() => testStream()}>Run!</Button>
    </main>
  );
}
