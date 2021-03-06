import {createClient} from 'redis';
import { v4 as uuid } from "uuid"

const client = createClient({
   url: process.env.REDIS_URL
});
client.connect()
client.on('error', (err) => console.log('Redis Client Error', err));

export const defaultOptions = {
   baseKeyPrefix: "",
   accountKeyPrefix: "user:account:",
   accountByUserIdPrefix: "user:account:by-user-id:",
   emailKeyPrefix: "user:email:",
   sessionKeyPrefix: "user:session:",
   sessionByUserIdKeyPrefix: "user:session:by-user-id:",
   userKeyPrefix: "user:",
   verificationTokenKeyPrefix: "user:token:",
 }
 
 const isoDateRE =
   /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/
 function isDate(value) {
   return value && isoDateRE.test(value) && !isNaN(Date.parse(value))
 }
 
 export function reviveFromJson(json) {
   return JSON.parse(json, (_, value) =>
     isDate(value) ? new Date(value) : value
   )
 }
 const setObjectAsJson = async (key, obj) => await client.set(key, JSON.stringify(obj))

 const baseKeyPrefix = defaultOptions.baseKeyPrefix
 const accountKeyPrefix = baseKeyPrefix + defaultOptions.accountKeyPrefix
 const accountByUserIdPrefix = baseKeyPrefix + defaultOptions.accountByUserIdPrefix
 const emailKeyPrefix = baseKeyPrefix + defaultOptions.emailKeyPrefix
 const sessionKeyPrefix = baseKeyPrefix + defaultOptions.sessionKeyPrefix
 const sessionByUserIdKeyPrefix = baseKeyPrefix + defaultOptions.sessionByUserIdKeyPrefix
 const userKeyPrefix = baseKeyPrefix + defaultOptions.userKeyPrefix
 const verificationTokenKeyPrefix = baseKeyPrefix + defaultOptions.verificationTokenKeyPrefix

 export function RedisAdapter() {
   const setAccount = async (id, account) => {
     const accountKey = accountKeyPrefix + id
     await setObjectAsJson(accountKey, account)
     await client.set(accountByUserIdPrefix + account.userId, accountKey)
     return account
   }
 
   const getAccount = async (id) => {
     const response = await client.get(accountKeyPrefix + id)
     if (!response) return null
     return reviveFromJson(response)
   }
 
   const setSession = async (id, session) => {
     const sessionKey = sessionKeyPrefix + id
     await setObjectAsJson(sessionKey, session)
     await client.set(sessionByUserIdKeyPrefix + session.userId, sessionKey)
     return session
   }
 
   const getSession = async (id) => {
     const response = await client.get(sessionKeyPrefix + id)
     if (!response) return null
     return reviveFromJson(response)
   }
 
   const setUser = async (id, user) => {
     await setObjectAsJson(userKeyPrefix + id, user)
     await client.set(`${emailKeyPrefix}${user.email}`, id)
     return user
   }
 
   const getUser = async (id) => {
     const response = await client.get(userKeyPrefix + id)
     if (!response) return null
     return reviveFromJson(response)
   }
 
   return {
     async createUser(user) {
       const id = uuid()
       // TypeScript thinks the emailVerified field is missing
       // but all fields are copied directly from user, so it's there
       // @ts-expect-error
       return await setUser(id, { ...user, id })
     },
     getUser,
     async getUserByEmail(email) {
       const emailResponse = await client.get(emailKeyPrefix + email)
       if (!emailResponse) return null
       return await getUser(emailResponse)
     },
     async getUserByAccount(account) {
       const dbAccount = await getAccount(
         `${account.provider}:${account.providerAccountId}`
       )
       if (!dbAccount) return null
       return await getUser(dbAccount.userId)
     },
     async updateUser(updates) {
       const userId = updates.id
       const user = await getUser(userId)
       return await setUser(userId, { ...user, ...updates })
     },
     async linkAccount(account) {
       const id = `${account.provider}:${account.providerAccountId}`
       return await setAccount(id, { ...account, id })
     },
     async createSession(session) {
       const id = session.sessionToken
       return await setSession(id, { ...session, id })
     },
     async getSessionAndUser(sessionToken) {
       const session = await getSession(sessionToken)
       if (!session) return null
       const user = await getUser(session.userId)
       if (!user) return null
       return { session, user }
     },
     async updateSession(updates) {
       const session = await getSession(updates.sessionToken)
       if (!session) return null
       return await setSession(updates.sessionToken, { ...session, ...updates })
     },
     async deleteSession(sessionToken) {
       await client.del(sessionKeyPrefix + sessionToken)
     },
     async createVerificationToken(verificationToken) {
       await setObjectAsJson(
         verificationTokenKeyPrefix + verificationToken.identifier,
         verificationToken
       )
       return verificationToken
     },
     async useVerificationToken(verificationToken) {
       const tokenKey = verificationTokenKeyPrefix + verificationToken.identifier
       const tokenResponse = await client.get(tokenKey)
       if (!tokenResponse) return null
       await client.del(tokenKey)
       return reviveFromJson(tokenResponse)
     },
     async unlinkAccount(account) {
       const id = `${account.provider}:${account.providerAccountId}`
       const dbAccount = await getAccount(id)
       if (!dbAccount) return
       const accountKey = `${accountKeyPrefix}${id}`
       await client.del(
         accountKey,
         `${accountByUserIdPrefix} + ${dbAccount.userId}`
       )
     },
     async deleteUser(userId) {
       const user = await getUser(userId)
       if (!user) return
       const accountByUserKey = accountByUserIdPrefix + userId
       const accountRequest = await client.get(accountByUserKey)
       const accountKey = accountRequest
       const sessionByUserIdKey = sessionByUserIdKeyPrefix + userId
       const sessionRequest = await client.get(sessionByUserIdKey)
       const sessionKey = sessionRequest
       await client.del(
         userKeyPrefix + userId,
         `${emailKeyPrefix}${user.email}`,
         accountKey,
         accountByUserKey,
         sessionKey,
         sessionByUserIdKey
       )
     },
   }
 }

export async function userById(id) {
  const account = await client.get(accountByUserIdPrefix + id)
  return reviveFromJson(await client.get(account))
}

export async function changeUsername(id, username){
  const account = await client.get(accountByUserIdPrefix + id)
  const data = reviveFromJson(await client.get(account))
  if (/^(?=.{8,20}$)(?!.*[_.]{2})[a-zA-Z0-9._]+/.test(username)) {
    data.username = username
    await setObjectAsJson(account,data)
    return data
  }else error("Invalid username")
}