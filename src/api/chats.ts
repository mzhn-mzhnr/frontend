import { chats } from "./mock/chats";

export interface Message {
  id: string;
  from_id?: string;
  text: string;
}

export interface Chat {
  id: string;
  history: Message[];
}

export async function all() {
  return chats;
}

export async function byId(id: string) {
  return chats.find((c) => c.id === id);
}
