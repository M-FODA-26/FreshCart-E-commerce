'use server'




export const resetPassword=async (email:string,newPassword:string)=>{
    const response=await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({email,newPassword})
    })
    const payload=response.json()
    return payload
}
