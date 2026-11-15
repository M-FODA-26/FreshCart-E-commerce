'use server';

import getMyToken from "@/utilities/getMyToken.utilities";




export async function getLoggedWishList() {
const token=await getMyToken()
if (!token) {
    throw new Error('login first')
}
const response =await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
    method:'GET',
    headers:{
        token,
        'content-type':'application/json'
    },
    
})
const payload=response.json()
return payload
}