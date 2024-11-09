import { MessageData, send } from "@/api/chats";

export interface Chunk {
  response?: string;
  fileId?: string;
  filename?: string;
  slidenum?: number;
}

export async function sendMessageAndStream(
  data: MessageData,
  request: Request,
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) {
  const response = await send(data);
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    const chunk = decoder.decode(value, { stream: true });
    if (done) {
      controller.close();
      break;
    }
    controller.enqueue(encoder.encode(chunk));
  }
}
