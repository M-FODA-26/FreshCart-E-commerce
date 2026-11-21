import 'server-only'
import getMyToken from "@/utilities/getMyToken.utilities"


export async function getLoggedCart() {

    const token=await getMyToken()
    if (!token) {
        return {status:'success',data:[],count:0,numOfCartItem:0}
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