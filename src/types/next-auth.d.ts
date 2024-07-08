import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: any;
      token: JWT;
      name: string;
      email: string;
      image: string;
    };
  }
  interface User {
    id: any;
    token: JWT;
    name: string;
    email: string;
    image: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
      id: any;
      token: JWT;
      name: string;
      email: string
      picture: string;
      image: string;
  }
}
// declare module "next-auth/jwt" {
//   interface JWT {
//     user: {
//       id: string;
//       token: JWT;
//       name: string;
//       email: string;
//       image: string;
//     };
//   }
// }