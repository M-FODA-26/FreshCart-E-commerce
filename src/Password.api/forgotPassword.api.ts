'use server'



export const forgotPassword = async (email:string) =>{

    const response=await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({email:email})
    })
    const payload=response.json()
    return payload
}


