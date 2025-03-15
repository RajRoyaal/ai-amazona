import NextAuth from "next-auth"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { compare } from "bcryptjs"
import { z } from "zod"

declare module "next-auth" {
  interface User {
    role: string
  }
  interface Session {
    user: User & {
      role: string
    }
  }
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials)
        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data
        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user) return null

        const passwordsMatch = await compare(password, user.password)
        if (!passwordsMatch) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        const user = await prisma.user.upsert({
          where: { email: profile.email },
          update: {},
          create: {
            email: profile.email,
            name: profile.name || "",
            image: profile.picture || undefined,
            password: "", // OAuth users don't need a password
            role: "USER",
          },
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name || "",
          role: user.role,
        }
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      async profile(profile) {
        if (!profile.email) {
          throw new Error("GitHub email is required")
        }

        const user = await prisma.user.upsert({
          where: { email: profile.email },
          update: {},
          create: {
            email: profile.email,
            name: profile.name || profile.login,
            image: profile.avatar_url || undefined,
            password: "", // OAuth users don't need a password
            role: "USER",
          },
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name || "",
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
}) 