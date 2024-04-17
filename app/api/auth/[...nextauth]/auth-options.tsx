import { JWT } from "next-auth/jwt";
import { axiosAuth } from "@/lib/api/axios";
import { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        try {
          const res = await axiosAuth.post(`/login`, {
            email,
            password,
          });
          return res.data;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  jwt: {},
  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        token.user = session.user;
        return token;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default authOptions;
