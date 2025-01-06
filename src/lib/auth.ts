import { SvelteKitAuth } from "@auth/sveltekit";
import GoogleAuthProvider from "@auth/sveltekit/providers/google";
// import { Google } from "arctic";
import { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } from "$env/static/private";

// export const GoogleProvider = new Google(
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   "http://localhost:5173/login/google/callback"
// );

export const { handle } = SvelteKitAuth({
  providers: [
    GoogleAuthProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      //@ts-ignore
      session.access_token = token.accessToken;
      return session;
    },
  },
});
