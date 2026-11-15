'use server'
import getMyToken from "@/utilities/getMyToken.utilities"

interface Shipping{
    details:string,
    phone:string,
    city:string
}


export const OnlinePayment=async (cartId:string ,url:string,valus:Shipping)=>{
    const token=await getMyToken()
    if(!token){

        throw new Error('User is not authenticated')
    }

    const response =await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
        method:'POST',
        headers:{
            token,
            'content-type':'application/json'
        },
        body:JSON.stringify({shippingAddress:valus})
    })
    const payload=await response.json()
    return payload
}