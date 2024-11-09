export async function testStream(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) {
  const response = await fetch("http://localhost:3010/stream");
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      console.log("Стриминг завершён.");
      controller.close();
      break;
    }

    const chunk = decoder.decode(value, { stream: true });
    controller.enqueue(encoder.encode(chunk));
    console.log("Got chunk");
  }
}
