import ChatList from "./components/chat-list";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-full grid-cols-1 gap-4 md:grid-cols-[300px_1fr]">
      <section>
        <ChatList />
      </section>
      <section>{children}</section>
    </main>
  );
}
