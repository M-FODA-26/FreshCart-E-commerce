'use client'

import { AddToCart } from "@/cartApi/AddCart.api"
import { Button } from "@/components/ui/button"
import { Loader, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"
import { boolean } from "zod"
import { useRouter } from 'next/navigation'
import { getSession } from "next-auth/react"

export default  function AddBtn({id,show=false}:{id:string,show?:boolean}) {
const [isloading,setIsloading]=useState(false)
const router=useRouter()
async function AddCart(id:string) {
const session =await getSession()
if (!session) {
    router.push('/login')
    
}

try {
    setIsloading(true)
        const response= await AddToCart(id)
    console.log(response)
    if (response.status=='success') {
        router.refresh()
        toast.success(response.message,{position:'top-right',autoClose:2000,closeOnClick:true})
        
    }else{
        toast.error('somthing went wrong',{position:'top-right',autoClose:2000,closeOnClick:true})

    }
} catch (error) {
        toast.error('somthing went wrong',{position:'top-right',autoClose:2000,closeOnClick:true})
    
}finally{setIsloading(false)}
    
}

  return (
    <>
       <Button disabled={isloading} onClick={()=>AddCart(id)} variant="outline" className={`flex my-1 w-full text-white py-4 bg-green-500 hover:text-white hover:bg-green-600 teantion duration-200  cursor-pointer  ${!show ? 'opacity-0 group-hover:opacity-100' : ''}`}>
        {isloading ? <Loader className=" animate-spin cursor-not-allowed"/> :   <>Add To Cart <ShoppingCart /></>}
        </Button>
    </>
  )
}
