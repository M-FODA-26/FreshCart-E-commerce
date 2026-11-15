import { CreditCard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function CheckOutBtn({cartId}:{cartId:string}) {
  return (
    <>
             <Link href={`/checkout/${cartId}`}>
              <button  className='bg-green-400 flex items-center gap-1 mt-2  hover:bg-green-500 px-5 py-2 rounded-[10px] hover:text-white transition-all duration-200 cursor-pointer '>CheckOut <CreditCard size={18} /></button>
      
             </Link>
    </>
  )
}
