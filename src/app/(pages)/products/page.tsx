import { getAllProducts } from '@/api/allProducts.api'
import React from 'react'
import { productType } from '@/types/product.type'
import AllProducts from '@/app/_components/allProducts/allProducts'

export default async function Products() {


  return (
   <>
   
   <AllProducts/>
   </>
  )
}
