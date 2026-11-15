import 'server-only'
import getMyToken from "@/utilities/getMyToken.utilities"


export async function getLoggedCart() {

    const token=await getMyToken()
    if (!token) {
        throw new Error('login first')
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