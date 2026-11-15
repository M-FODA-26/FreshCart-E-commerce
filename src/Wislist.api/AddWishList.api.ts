'use server'
import getMyToken from "@/utilities/getMyToken.utilities"




export const AddWishList=async(id:string)=>{
    const token=await getMyToken()
    if (!token){
        throw new Error('login first')
    }

    const response =await fetch (`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        method:'POST',
        headers:{
            token,
            'content-type':'application/json'
        },
        body:JSON.stringify({productId:id})
    })
    const payload =await response.json()
    return payload
}