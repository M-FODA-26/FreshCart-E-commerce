import 'server-only'
import getMyToken from "@/utilities/getMyToken.utilities"
import type { CartType } from "@/types/Cart.type"


export async function getLoggedCart(): Promise<CartType> {

    const token=await getMyToken()
    if (!token) {
        return {
            status: 'success',
            message: '',
            numOfCartItems: 0,
            cartId: '',
            data: {
                _id: '',
                cartOwner: '',
                products: [],
                createdAt: '',
                updatedAt: '',
                __v: 0,
                totalCartPrice: 0
            }
        }
    }
    const response =await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
        method:'GET',
        headers:{
            token,
            'content-type':'application-json'

        }
    })

    const payload=await response.json()
    
     return payload
    
}