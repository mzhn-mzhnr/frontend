import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import { ChatInitialProvider } from "./components/chat-initial-provider";
import ChatList from "./components/chat-list";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-full grid-cols-1 gap-4 md:grid-cols-[300px_1fr]">
      <section className="space-y-2">
        <div className="text-end">
          <Button asChild>
            <Link href="/chats">
              <Edit />
              Новый чат
            </Link>
          </Button>
        </div>
        <ChatList />
      </section>
      <section>
        <ChatInitialProvider>{children}</ChatInitialProvider>
      </section>
    </main>
  );
}
