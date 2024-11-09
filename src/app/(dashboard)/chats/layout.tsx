import { ChatInitialProvider } from "./components/chat-initial-provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="">
      {/* <main className="grid min-h-full grid-cols-1 gap-4 md:grid-cols-[300px_1fr]"> */}
      <section className="space-y-2">{/* <ChatList /> */}</section>
      <section>
        <ChatInitialProvider>{children}</ChatInitialProvider>
      </section>
    </main>
  );
}
