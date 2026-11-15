import { Suspense } from 'react'
import Navbar from '../navbar/Navbar'
import CartOfNumber from '../cartOfNumber/cartOfNumber'
import WishListOfNumber from '../WishListOfNumber/WishListOfNumber'

export default function NavbarWrapper() {
  return (
    <>
     <Navbar
       CartOfNumber={
         <Suspense fallback={<span className="text-[17px] text-slate-400">Cart</span>}>
           <CartOfNumber />
         </Suspense>
       }
       wishlistofnumber={
         <Suspense fallback={<span className="text-[17px] text-slate-400">Wishlist</span>}>
           <WishListOfNumber />
         </Suspense>
       }
     />
    </>
  )
}
