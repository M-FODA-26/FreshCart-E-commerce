'use server'

export const Getspecificbrand=async (id:string)=>{
    const response=await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`,{
        method:'GET',
        headers:{
            'content-type':'application/json'
        }
    })
    const payload=await response.json()
    return payload
}