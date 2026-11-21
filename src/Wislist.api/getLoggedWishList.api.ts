import 'server-only';

import getMyToken from "@/utilities/getMyToken.utilities";
import type { WishList } from "@/types/WishList.type";




export async function getLoggedWishList(): Promise<WishList> {
const token=await getMyToken()
if (!token) {
  return { status: 'success', count: 0, data: [] }
}
const response =await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
    method:'GET',
    headers:{
        token,
        'content-type':'application/json'
    },
    
})
const payload= await response.json()
return payload
}