import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    idToken?: string;
  }

  interface JWT {
    idToken?: string;
  }
}
