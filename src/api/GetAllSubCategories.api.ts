'use server'

export const GetAllSubCategories=async ()=>{
    const response=await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories`,{
        method:'GET',
        headers:{
            'content-type':'application/json'
        }
    })
    const payload=await response.json()
    return payload
}