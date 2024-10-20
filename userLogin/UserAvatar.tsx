/*
 * @Author: Zane
 * @Date: 2024-03-15 18:34:57
 * @Description:
 * @LastEditors: Zane zanekwok73@gmail.com
 * @LastEditTime: 2024-03-15 18:37:25
 */
// import { AvatarProps } from "@radix-ui/react-avatar";

import { UserInfo } from "./types/user";

// import { Icons } from "@/components/community/icons";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { UserInfo } from "@/types/user";

interface UserAvatarProps  {
  user: Pick<UserInfo, "username" | "avatar" | "email" | "role">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <>
      <div>
        {user.avatar ? (
          <img alt="Picture" src={user.avatar} />
        ) : (
          <span className="sr-only">{user.username}</span>
        )}
      </div>
    </>
  );
}
