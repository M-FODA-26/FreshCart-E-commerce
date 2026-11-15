
import { RemoveProduct } from '@/cartApi/remove.api'
import { CartType } from '@/types/Cart.type'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RemoveCart from '../removeCart/removeCart'
import ClearBtn from '../ClearBtn/ClearBtn'
import UpdateCartBtn from '../updatecart/updatecart'
import CheckOutBtn from '../CheckOutBtn/CheckOutBtn'

export default function CartShop({cart}:{cart:CartType}) {



  return (
    <>
  <div className='w-[80%] mx-auto my-5'>
    <Link href={'/'} className='text-gray-400 hover:text-green-600'>
    Home </Link>
    <span>/</span>
    <span className='text-gray-800'> Shopping Cart</span>
    <div className='flex items-center gap-2'>
    <div className='bg-green-600 px-3 py-2 rounded-[10px]'><ShoppingCart size={30} color='white' /></div>

    <h1 className='my-3 text-[30px] font-bold '> Shopping Cart</h1>

    </div>
    <p className='font-semibold text-gray-700'>You have <span className='text-green-600'>{cart.numOfCartItems} items</span>  in your cart</p>
  </div>

    {cart.data.products.length==0 ? <div><h1 className='text-4xl text-center'>can't product</h1></div> :<>
      <div className='w-[80%] m-auto my-3'>
        <h1 className='text-2xl'>My Cart</h1>
        <div className='flex items-center  justify-between '>
         <div className='flex items-center '>
               <h1 className='text-2xl'>
                Total Cart Price :
            </h1 >
            <span className='text-green-600 text-2xl'>{cart.data.totalCartPrice}</span>
         </div>
          <div>
         <div>
         <ClearBtn/>

        </div>
         <div>
         <CheckOutBtn cartId={cart.cartId}/>

        </div>
       </div>
        </div>
      
    </div>
<div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default w-[80%] mx-auto ">
  
  <table className="w-full text-sm text-left rtl:text-right text-body">
    <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span >Image</span>
        </th>
        <th scope="col" className="px-6 py-3 font-semibold">
          Product
        </th>
        <th scope="col" className="px-6 py-3 font-semibold">
          Qty
        </th>
        <th scope="col" className="px-6 py-3 font-semibold">
          Price
        </th>
        <th scope="col" className="px-6 py-3 font-semibold">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {cart.data.products.map((product)=><tr key={product.product.id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
        <td className="p-4">
          <Image src={product.product.imageCover} width={100} height={100} className="w-16 md:w-24 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <UpdateCartBtn count={product.count} id={product.product.id}/>
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {product.price * product.count} EGP
        </td>
        <td className="px-6 py-4">
            <RemoveCart id={product.product.id}/>
        </td>
      </tr>)}
   
    </tbody>
  </table>
</div>
    </> }

  


      
    </>
  )
}








