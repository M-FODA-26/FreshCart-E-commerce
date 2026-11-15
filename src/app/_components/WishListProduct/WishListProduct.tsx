'use client'
import { Wish } from '@/types/WishList.type'
import Image from 'next/image'
import React, { useState } from 'react'
import AddBtn from '../AddBtn/AddBtn'
import { Loader, Trash } from 'lucide-react'
import { RemoveWishList } from '@/Wislist.api/RemoveWishList.api'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function WishListProduct({product}:{product:Wish}) {
    const [isloading,setIsloading]=useState(false)
    const router=useRouter()
    // console.log('aaaaaa',product)
    async function handleRemoveWishList() {
        try{
            setIsloading(true)
            const response=await RemoveWishList(product.id)
            console.log('delete',response)
            if (response.status=='success') {
    router.refresh()
    toast.success(response.message,{position:'top-right',autoClose:1500,closeOnClick:true})
    
 }

        }catch(error){
    toast.error("Failed to remove from wishlist",{position:'top-right',autoClose:1500,closeOnClick:true})


        }finally{
            setIsloading(false)
        }
    }
  return (
    <>
      <div className='flex items-center justify-between my-5' >

<div className='flex items-center gap-5 '>
  <div>
    <Image src={product.imageCover} width={300} height={300} alt={product.title}/>
  </div>
  <div>
    <h4 className='text-lg font-semibold'>{product.title}</h4>
    <h4 className='text-xl font-bold text-green-500'>${product.price}</h4>
  </div>

</div>
<div className=' '>
    <AddBtn show id={product.id}/>
    <button disabled={isloading} onClick={()=>handleRemoveWishList()} className='w-full bg-green-500 py-1 flex justify-center rounded-[10px]  items-center gap-2 text-white  hover:bg-red-500 trantion-all duration-200 cursor-pointer'>{isloading ? <Loader className=' animate-spin '/> : "Remove"} <Trash size={18}/></button>
</div>



</div>
    </>
  )
}
