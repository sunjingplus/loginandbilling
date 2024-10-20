import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getOrCreateUser, getOrCreateSession, getOrCreateVerificationToken } from "./authHelpers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        await getOrCreateUser(profile, account);
        return true;
      }
      return false;
    },
    session: async ({ session, token }) => ({
      ...session,
      user: {
        id: token.id,
        name: token.name,
        image: token.image,
        email: token.email,
        accessToken: token.accessToken,
        membershipExpire: session.expires,
      },      
    }),
    jwt: async ({ token, account, user }) => {
      if (user?.email) {
        const [userRecord] = await db.select().from(users).where(eq(users.email, user.email)).limit(1);

        if (userRecord) {
          const userId = userRecord.id;
          token.accessToken = account?.access_token ?? "";

          const session = await getOrCreateSession(userId);
          const verificationToken = await getOrCreateVerificationToken(user.email);

          return {
            id: userId,
            name: token.name,
            image: token.picture,
            email: user.email,
            accessToken: token.accessToken,
            sessionToken: session.sessionToken,
            sessionExpires: session.expires,
            verificationToken: verificationToken.token,
            verificationTokenExpires: verificationToken.expires,
          };
        }
      }
      return token;
    },
  },
};
