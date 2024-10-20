"use client";
import { signOut, useSession } from "next-auth/react";
import { useSignInModal } from "./signinmodel";
import { UserInfo } from "./types/user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function UserAccountHeader() {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const { data: session } = useSession();
  const user: UserInfo | null = {
    userId: session && (session?.user as any).id,
    username: session && (session?.user as any).name,
    email: session && (session?.user as any).email,
    avatar: session && (session?.user as any).image,
  };
  const handleLogIn = () => {
    setShowSignInModal(true);
  };
  return (
    <>
      <SignInModal />
      {user && user.username ? (
        <div className="w-full h-full flex items-center content-center">
          <div className="mr-2">
            {/* {user.role && user.role > 1 ? <></> : <></>} */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div>
                {user.avatar ? (
                  <img alt="Picture" src={user.avatar} className="rounded-full h-10 w-10"/>
                ) : (
                  <span className="sr-only">{user.username}</span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-4 ">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <div className="text-center">
                    <DropdownMenuItem className="cursor-pointer">
                      {user.username}
                    </DropdownMenuItem>
                  </div>
                  {user.email && (
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(event:any) => {
                  event.preventDefault();
                  signOut({ callbackUrl: process.env.NEXTAUTH_URL });
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="w-full   h-full mr-4 flex items-center content-center ">
          <button
            onClick={handleLogIn}
            className={
              "bg-gray-800 text-white hover:bg-[#FD7A20] px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
            }
          >
            Log in
          </button>
        </div>
      )}
    </>
  );
}
