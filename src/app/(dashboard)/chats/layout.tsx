import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInitialProvider } from "./components/chat-initial-provider";
import ChatList from "./components/chat-list";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-full grid-cols-1 grid-rows-2 gap-4 md:grid-cols-[300px_1fr] md:grid-rows-1">
      {/* <main > */}

      <ScrollArea className="max-h-[calc(100vh-80px)] space-y-2 overflow-hidden shadow">
        <ChatList />
      </ScrollArea>
      <section>
        <ChatInitialProvider>{children}</ChatInitialProvider>
      </section>
    </main>
  );
}
