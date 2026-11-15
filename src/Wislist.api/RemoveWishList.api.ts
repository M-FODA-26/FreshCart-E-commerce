'use server'
import getMyToken from "@/utilities/getMyToken.utilities";



export async function RemoveWishList(id:string){

const token=await getMyToken()
if (!token) {
    throw new Error('login first')
    
}
const response=await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
    method:'DELETE',
    headers:{
        token,
        'content-type':'application/json'
    }
})
const payload=await response.json()
return payload

}