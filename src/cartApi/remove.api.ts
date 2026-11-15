'use server'
import getMyToken from "@/utilities/getMyToken.utilities"
import { ne } from "zod/v4/locales"




export const RemoveProduct=async (id:string)=>{
 const token=await getMyToken()
 if (!token) {
    throw new Error('login first')
    
 }
    const response=await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`,{
        method:'DELETE',
        headers:
       { token,
        'content-type':'application/json'}
    })
    const payload=response.json()
    return payload


}