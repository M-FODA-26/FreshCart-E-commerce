'use client'
import { ClearCart } from '@/cartApi/clearCart.api'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

export default  function ClearBtn() {
    const router=useRouter()

  async function ClearProduct() {
    try {
          const response=await ClearCart()
    console.log(response)
    if (response.status=='success') {
                toast.success(response.message,{position:'top-right',autoClose:2000,closeOnClick:true})
        router.refresh()
        
    }else{
                toast.error("con't your Clear",{position:'top-right',autoClose:2000,closeOnClick:true})

    }
    } catch (error) {
                toast.error("con't your Clear",{position:'top-right',autoClose:2000,closeOnClick:true})
        
    }

  }
  return (
    <>
              <button onClick={()=>ClearProduct()} className='bg-green-400 hover:bg-green-500 px-3 py-2 rounded-[10px] hover:text-white transition-all duration-200 cursor-pointer '>Clear Your Cart</button>
 
    </>
  )
}
