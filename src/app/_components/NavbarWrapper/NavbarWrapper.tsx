import React from 'react'
import Navbar from '../navbar/Navbar'
import CartOfNumber from '../cartOfNumber/cartOfNumber'
import WishListOfNumber from '../WishListOfNumber/WishListOfNumber'

export default function NavbarWrapper() {
  return (
    <>
     <Navbar CartOfNumber={<CartOfNumber/> } wishlistofnumber={<WishListOfNumber/>}  /> 
    </>
  )
}
