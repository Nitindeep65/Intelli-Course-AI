import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // 👈 add `id`
    } & DefaultSession["user"];
  }

  interface User {
    id: string; // optional, useful for DB session
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
