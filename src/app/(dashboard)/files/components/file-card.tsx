import dayjs from "dayjs";
import Image from "next/image";

export interface FileCardProps {
  id: string;
  type: string;
  name: string;
  date: number;
}

export default function FileCard({ id, type, name, date }: FileCardProps) {
  const datestr = dayjs(date).format("DD.MM.YYYY");
  const link = `${process.env.NEXT_PUBLIC_API_URL}/fs/file/${name}?id=${id}`;
  return (
    <a
      href={link}
      target="_blank"
      className="flex flex-col items-center gap-2 p-2 shadow transition hover:scale-105"
    >
      <Image src={`/icons/${type}.png`} alt="" width={128} height={128} />
      <h1 className="font-bold">{name}</h1>
      <h2 className="text-xs text-muted-foreground">{datestr}</h2>
    </a>
  );
}
