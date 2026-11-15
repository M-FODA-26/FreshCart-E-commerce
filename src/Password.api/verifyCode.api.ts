'use server'




export const VerifyCodes=async (resetCode:string)=>{
     const response=await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({resetCode})
    })
    const payload=await response.json()
    return payload

}