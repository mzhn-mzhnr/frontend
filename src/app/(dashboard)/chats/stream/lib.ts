import { MessageData } from "@/api/chats";
import { apiFetchCore } from "@/lib/fetch";

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
  const authHeader = request.headers.get("Authorization");
  const response = await apiFetchCore("/conversations/send", data, {
    headers: {
      Authorization: authHeader!,
    },
    method: "POST",
  });
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    const chunk = decoder.decode(value, { stream: true });
    console.log("got chunk", chunk, done);

    if (done) {
      controller.close();
      break;
    }

    controller.enqueue(encoder.encode(chunk));
  }
}
