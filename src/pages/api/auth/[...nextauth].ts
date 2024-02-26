import bcrypt from "bcryptjs";
import { prisma } from "@/server/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        console.log("user", user);
        if (bcrypt.compare(credentials.password, user?.password!)) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = Number(token.sub);
      return session;
    },
    redirect: (params: { url: string; baseUrl: string }) => {
      return params.baseUrl; // Перенаправление на главную страницу
    },
  },
};

export default NextAuth(authOptions);
