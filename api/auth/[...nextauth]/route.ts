// import { handlers } from "@/auth"; // Referring to the auth.ts we just created
// export const { GET, POST } = handlers;

/*
 * @Author: Zane
 * @Date: 2024-03-15 17:19:48
 * @Description: 
 * @LastEditors: Zane zanekwok73@gmail.com
 * @LastEditTime: 2024-03-15 17:19:51
 */
import { authOptions } from "@/components/（UserLogin）/lib/auth";
import NextAuth from "next-auth";
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };