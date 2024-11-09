import { MessageData, send } from "@/api/chats";

export async function sendMessageAndStream(
  data: MessageData,
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) {
  const response = await send(data);
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      console.log("done!");

      controller.close();
      break;
    }
    const chunk = decoder.decode(value, { stream: true });
    console.log("got chunk", chunk, done);
    controller.enqueue(encoder.encode(chunk));
  }
}
