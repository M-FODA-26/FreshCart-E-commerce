import React from 'react'
 import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { productType } from '@/types/product.type'
import Image from 'next/image'
import AddBtn from '../AddBtn/AddBtn'
import AddHeart from '../AddHeart/AddHeart'

export default function SingleProduct({currentProduct,isWishList}:{currentProduct:productType,isWishList:boolean}) {
  return (
    <>
     
    <div className='w-full sm:w-1/2 md:1/3 lg:1/4  xl:w-1/5 my-8'>
      <div className='p-2'>
    <Card  className="w-full max-w-sm ring-0 hover:ring-1 ring-green-500 cursor-pointer group">
      <CardHeader>
        <AddHeart id={currentProduct.id} isWishList={isWishList}/>
      <Link href={`/products/${currentProduct.id}`}>
        <CardTitle>
                  <Image className='rounded-2xl' width={300} height={300} src={currentProduct.imageCover} alt={currentProduct.category.name} />
        </CardTitle>
      </Link>
        <CardDescription>
          <h2 className='text-green-600'>{currentProduct.category.name}</h2>
          <p className='text-black text-xl'>{currentProduct.title}</p>
          <div className='flex justify-between my-1'>
            <div className='font-semibold'>
              {currentProduct.price} EGP
            </div>
            <div className='flex items-center gap-2 font-semibold'>
              {currentProduct.ratingsAverage}<Star className='text-[#FDC700]' size={18} fill='#FDC700' />
            </div>
          </div>
          
       
        </CardDescription>
        <AddBtn id={currentProduct.id}/>
      </CardHeader>
      
     
    </Card>
      </div>
    </div>
    
      
    </>
  )
}
