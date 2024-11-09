"use client";

import { all } from "@/api/chats";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ChatAvatar from "./chat-avatar";

interface ChatListEntryProps {
  id: string;
  active?: boolean;
}

function ChatListEntry({ id, active }: ChatListEntryProps) {
  return (
    <li>
      <Link
        href={`/chats/${id}`}
        className={cn(
          "grid grid-cols-[32px_1fr] items-center gap-4 p-4 transition hover:bg-slate-100",
          active && "bg-slate-100"
        )}
      >
        <ChatAvatar id={id} />
        <h1>Чат</h1>
      </Link>
    </li>
  );
}

export default function ChatList() {
  const params = useParams();
  const id = (params.id as string) ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["chats"],
    queryFn: all,
  });

  if (isLoading || isError) {
    return (
      <ul className="flex flex-col items-center justify-center rounded bg-white p-8 shadow">
        <LoaderCircle className="animate-spin" />
      </ul>
    );
  }

  return (
    <ul className="flex flex-col divide-y rounded bg-white shadow">
      {data!.map((entry) => (
        <ChatListEntry key={entry.id} id={entry.id} active={id == entry.id} />
      ))}
    </ul>
  );
}
