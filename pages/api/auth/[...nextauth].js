import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import {RedisAdapter} from '@lib/db'

export default NextAuth({
  adapter: RedisAdapter(),
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ]
})
//callbacks: {
  //async signIn({ user, account, profile, email, credentials }) {
   // return await db.addUser(uuidv4(),null, user.email,"google")  === "OK" //returns OK when successful
 // }