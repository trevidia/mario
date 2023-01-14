import NextAuth, from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt"


console.log(process.env.NEXTAUTH_SECRET)
const nextOptions = {
    strategy: 'jwt',
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const {username, password} = credentials
                const user = await prisma.user.findUnique({
                    where: {
                        username
                    },
                })
                if (!user) throw new Error("Invalid Username")

                const result = await bcrypt.compare(password, user.password)
                if (!result) throw new Error("Invalid Password")

                return {
                    id: user.id,
                    role: user.role,
                    name: `${user.firstName} ${user.middleName ? user.middleName[0]  + ". ": ""}${user.lastName}`,
                    email: user.email,
                    username: user.username
                }

            },
            pages: {
                signIn: "/auth/login"
            }
        })
    ],
    callbacks: {
        async session({session, token, user}) {
            session.user.role = token.role
            session.user.id = token.id
            session.user.username = token.username
            return session
        },
        async jwt({token, user, account, profile}){
            if (user){
                token.id = user.id
                token.role = user.role
                token.username = user.username
            }
            return token
        }
    },
}

export default NextAuth(nextOptions)