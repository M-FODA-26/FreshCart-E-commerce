'use server'





export const GetSpecificCategory=async (id:string)=>{

const response=await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`,{
    method:'GET',
    headers:{
        'content-type':'application/json'
    },
    
})
const payload=await response.json()
return payload
}





