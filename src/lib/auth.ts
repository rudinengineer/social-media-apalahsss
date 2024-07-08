import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Axios } from "./axios";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text", placeholder: "Username" },
                password: { label: "password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {
                try {
                    const response = await Axios.post('/auth/signin', {
                        username: credentials?.username,
                        password: credentials?.password
                    })
                    const data = await response.data
                    if ( data ) {
                        return data
                    }
                } catch(e: any) {
                    console.log(e)
                    return null
                }
                return null
            }
        }),
    ],
    pages: {
        signIn: '/signin',
        signOut: '/auth/signout',
    },
    secret: process.env.NEXT_AUTH_SECRET!,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token }) {
            return token
        },
        async session({ session, token }) {
            if ( token ) {
                session.user.token = token.token
                session.user.id = token.sub
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
            }
            return session
        },
    },
}

export const getAuthSession = () => getServerSession(authOptions)