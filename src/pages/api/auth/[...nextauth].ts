import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { getFaunaClient } from "@/src/services/fauna";
import { query as q } from "faunadb";

export default NextAuth ({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user
      let fauna

      if (!email) {
        return false
      }

      try {
        fauna = getFaunaClient()
      } catch {
        return false
      }

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(email)
              )
            )
          )
        )
        return true
      } catch {
        return false
      }
    },
  }
})