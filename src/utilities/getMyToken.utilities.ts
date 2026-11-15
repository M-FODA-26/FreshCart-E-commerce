import 'server-only'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";




export default async function getMyToken() {

    const cookieStore = await cookies()
    const decoded = cookieStore.get('next-auth.session-token')?.value || cookieStore.get('__Secure-next-auth.session-token')?.value
    const token =await decode({token:decoded,secret:process.env.NEXTAUTH_SECRET!})
    return token?.token
    
}