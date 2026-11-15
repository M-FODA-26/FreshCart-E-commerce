import { getLoggedWishList } from '@/Wislist.api/getLoggedWishList.api'
import { Heart } from 'lucide-react'
import  Link  from 'next/link'
import React from 'react'

export default async function WishListOfNumber() {
    const response=await getLoggedWishList()
    console.log('mmmmmmm',response)
  return (
    <>
      
  <Link className='relative flex items-center gap-1 text-[17px] hover:text-green-600 trantion duration-300 ' href='/wishList'>Wishlist<Heart fill='black' className='hover:fill-green-600 ' />
  
  {response.count>0 ? <span className=' absolute -top-2 -right-1 bg-green-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[12px]'>
    {response.count}
  </span> : "" }
  
  </Link>
    
    </>
  )
}
