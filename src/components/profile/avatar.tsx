import { getAvatar, User } from "@/api/user";
import { HTMLAttributes } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

export interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  user: User;
}

export default function UserAvatar({ user, ...props }: UserAvatarProps) {
  const avatar = getAvatar(user);
  return (
    <Avatar {...props}>
      <AvatarImage src={avatar} />
    </Avatar>
  );
}
