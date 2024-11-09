import { testStream } from "./lib";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      console.log("open stream");

      await testStream(controller, encoder);
    },
  });

  return new Response(readable, {
    headers: {
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream; charset=utf-8",
    },
  });
}
