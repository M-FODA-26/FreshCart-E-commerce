import CartShop from '@/app/_components/CartShop/CartShop'
import { getLoggedCart } from '@/cartApi/getLoggedCart.api'
import getMyToken from '@/utilities/getMyToken.utilities'
import React from 'react'

export default async function Cart() {
const response=await getLoggedCart()
// console.log(response)
  return (
    <>
        <CartShop cart={response}/>
    </>
  )
}
