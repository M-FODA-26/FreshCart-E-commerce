'use server'

import getMyToken from "@/utilities/getMyToken.utilities"
interface Shipping{
    details:string,
    phone:string,
    city:string
}

interface CashOrderResponse {
    status: 'success'
    message?: string
}

export const CreateCash=async(id:string,values:Shipping): Promise<CashOrderResponse>=>{
    const token=await getMyToken()
    if (!token) {
        throw new Error('User is not authenticated')
    }

    const response =await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,{
        method:'POST',
        headers:{
            token,
            'content-type':'application/json'
        },
        body:JSON.stringify({shippingAddress:values})
    })
    const payload: unknown = await response.json()
    const message = typeof payload === 'object' && payload !== null && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : undefined

    if (!response.ok || typeof payload !== 'object' || payload === null || !('status' in payload) || payload.status !== 'success') {
        throw new Error(message ?? 'Failed to place cash order')
    }

    return { status: 'success', message }
}
