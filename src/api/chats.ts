import { apiFetch } from "@/lib/fetch";

export interface Message {
  id: string;
  from_id?: string;
  text: string;
}

export interface Chat {
  id: string;
  createdAt: string;
}

export interface Conversation {
  conversation: Chat;
  messages: unknown[];
}

export async function all() {
  const result = (await apiFetch("/conversations/")) as {
    conversations: Chat[];
  };
  return result.conversations;
}

export async function byId(id: string) {
  return await apiFetch<Conversation>(`/conversations/${id}/`);
}

export async function newChat() {
  const result = (await apiFetch("/conversations/", null, {
    method: "POST",
  })) as { id: string };
  return result.id;
}
