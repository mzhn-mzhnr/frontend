"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function ChatAvatar({ id }: { id: string }) {
  const url = `https://api.dicebear.com/9.x/bottts/svg?baseColor=00acc1,039be5,1e88e5,43a047,546e7a,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,00897b&eyes=bulging,eva,frame1,frame2,glow,hearts,robocop,round,roundFrame01,sensor,shade01&mouth=diagram,grill02,smile01,smile02&texture=dots,circuits,grunge01,grunge02&scale=80&seed=${id}`;

  return (
    <Avatar className="rounded-lg bg-slate-100">
      <AvatarImage src={url}></AvatarImage>
    </Avatar>
  );
}
