import { getLoggedCart } from '@/cartApi/getLoggedCart.api'
import { ShoppingCart } from 'lucide-react'
import  Link  from 'next/link'
import React from 'react'

export default async function CartOfNumber() {

    
      const response=await getLoggedCart()
    console.log(response)
    
   
  return (
    < >
  <Link className=' relative flex items-center gap-1 text-[17px] hover:text-green-600 trantion duration-200' href='/cart'>Cart <ShoppingCart />
  
{response.numOfCartItems>0 ?   <span className='absolute -top-2 -right-2 bg-green-600 text-white text-[12px] w-4 h-4 rounded-full flex items-center justify-center'>
    {response.numOfCartItems}
  </span> : ''}
  </Link>
    
    </>
  )
}
