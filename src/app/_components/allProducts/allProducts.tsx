import React from 'react'
import { getAllProducts } from '@/api/allProducts.api'
import { productType } from '@/types/product.type'
import SingleProduct from '../singleProduct/singleProduct'
import { getLoggedWishList } from '@/Wislist.api/getLoggedWishList.api'
import { Wish } from '@/types/WishList.type'

export default async function AllProducts() {
let {data}= await getAllProducts()
// console.log(data)
 const wishList=await getLoggedWishList()
  console.log('wishhhhh',wishList)
const wishListIds=wishList.data.map((product:Wish)=>product.id)
  return (
   <>
     <div className='w-[90%] mx-auto'>
         <div className=' flex flex-wrap'>
    {data.map((currentProduct:productType)=><SingleProduct key={currentProduct.id} currentProduct={currentProduct} isWishList={wishListIds.includes(currentProduct.id)}/>
   )}
      </div>
     </div>
   
   </>
  )
}
