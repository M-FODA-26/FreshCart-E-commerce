'use client'
import { RemoveProduct } from '@/cartApi/remove.api'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

export default  function RemoveCart({id}:{id:string}) {
    const router=useRouter()
    async function DeleteProduct(id:string) {
      try {
          const response=await RemoveProduct(id)
    console.log(response)
    if (response.status=='success') {
        toast.success(response.message,{position:'top-right',autoClose:2000,closeOnClick:true})
        router.refresh()
    }else{
        toast.error("can't remove now",{position:"top-right",autoClose:2000,closeOnClick:true})

    }
      } catch (error) {
        toast.error("can't remove now",{position:"top-right",autoClose:2000,closeOnClick:true})
        
      }
        
    }
  return (
    <>
          <button onClick={()=>DeleteProduct(id)} className="flex items-center cursor-pointer font-semibold text-red-600  bg-red-100 hover:bg-red-300 transition-all duration-200 p-3 rounded-[10px]">Remove <Trash size={16} /></button>
      
    </>
  )
}
