
'use server'



export const getUserOrders = async(id:string)=>{
    const response =await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,{
        method:'GET',
        headers:{
            'content-type' :'application/json'
        }
})
const payload=await response.json()
return payload
}
