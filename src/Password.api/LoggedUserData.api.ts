'use server'

import getMyToken from "@/utilities/getMyToken.utilities"

interface Data{
    name:string,
    email:string,
    phone:string
}

export const LoggedUserData= async (value:Data)=>{
const token=await getMyToken()
if (!token) {
    throw new Error ('login first')
    
}
const response= await fetch(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`,{
    method:'PUT',
    headers:{
        token,
        'content-type':'application/json'
    },
    body:JSON.stringify({value})
})
const payload=await response.json()
return payload
}