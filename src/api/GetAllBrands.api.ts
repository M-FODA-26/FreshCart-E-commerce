'use server'



 export const GetAllBrands=async ()=>{
    const response=await fetch(`https://ecommerce.routemisr.com/api/v1/brands`,{
        method:'GET',
        headers:{
            'content-type':'application/json'
        }
    })
    const payload=await response.json()
    return payload
 } 