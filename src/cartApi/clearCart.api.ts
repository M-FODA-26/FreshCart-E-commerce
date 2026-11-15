'use server'
import getMyToken from "@/utilities/getMyToken.utilities"



export const ClearCart= async ()=>{
    const token=await getMyToken()
    if (!token) {
        throw new Error('login first')
        
    }
const response=await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
    method:'DELETE',
    headers:{
        token,
        'content-type':'application/json'

    }
})
const payload=response.json()
return payload
}