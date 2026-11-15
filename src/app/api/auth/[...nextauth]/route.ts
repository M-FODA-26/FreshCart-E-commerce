import { authOption } from "@/auth"
import NextAuth from "next-auth"
export const dynamic ='force-dynamic'
const handler = NextAuth(authOption)

export { handler as GET, handler as POST }