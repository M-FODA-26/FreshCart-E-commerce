import WishListProduct from '@/app/_components/WishListProduct/WishListProduct'
import { Wish } from '@/types/WishList.type'
import { getLoggedWishList } from '@/Wislist.api/getLoggedWishList.api'
import React from 'react'

export default async function WishList() {

  const response=await getLoggedWishList()
  // console.log('wishhhhh',response)

  return (
    <>
  {response.count==0 ? <div className='bg-red-300 w-[80%] md:w-[60%] lg:w-[50%] mx-auto mt-50 p-20 rounded-2xl'>
    <h1 className='text-center text-2xl font-semibold  '>Your wishlist is empty</h1>
    </div> : <>  <div className='w-[95%] md:w-[90%] lg:w-[80%] mx-auto '>
      <h1 className=' border-b-2 my-7 pb-2 text-2xl'>My WishList</h1>

{response.data.map((product:Wish)=><WishListProduct  key={product.id} product={product}/>)}
    </div></>}

   
    </>

  )
}
