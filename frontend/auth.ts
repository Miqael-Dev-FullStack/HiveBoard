import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // Attach the user ID to the session
      if (session.user) {
        session.user.id = token.sub as string; // `token.sub` contains the user ID
      }
      return session;
    },
    async jwt({ token, user }) {
      // Attach the user ID to the token
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
});
