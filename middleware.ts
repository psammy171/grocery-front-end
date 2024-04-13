import withAuth from "next-auth/middleware";

export const config = {
  matcher: ["/orders", "/cart"],
};

export default withAuth(async function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (token) return true;
      return false;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
