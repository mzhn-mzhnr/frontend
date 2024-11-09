import { apiFetch, apiFetchCore } from "@/lib/fetch";

export interface Message {
  body: string;
  isUser: boolean;
  createdAt: string;
}

export interface Chat {
  id: string;
  createdAt: string;
}

export interface Conversation {
  conversation: Chat;
  messages: Message[];
}

export interface MessageData {
  conversationId: string;
  input: string;
}

export async function all() {
  const result = (await apiFetch("/conversations/")) as {
    conversations: Chat[];
  };
  return result.conversations;
}

export async function byId(id: string) {
  return await apiFetch<Conversation>(`/conversations/${id}`);
}

export async function newChat() {
  const result = (await apiFetch("/conversations/", null, {
    method: "POST",
  })) as { id: string };
  return result.id;
}

export async function send(data: MessageData) {
  return await apiFetchCore("/conversations/send", data, { method: "POST" });
}
