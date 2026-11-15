"use client"
import React from 'react'
import Link from 'next/link'
import {  LogIn, LogOut, Menu, ShoppingCart, TruckElectric, User } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,

  DropdownMenuSeparator,
 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from 'next-auth/react'


export default function Navbar({CartOfNumber, wishlistofnumber }:{CartOfNumber:React.ReactNode, wishlistofnumber:React.ReactNode}) {
const logOut=()=>{
  signOut({callbackUrl:'/login'})
}
  const {data:session,status}=useSession()
  // console.log('sess',session)
  // console.log('status',status)
  return (
    <>
   <nav className='bg-gray-100 p-5 fixed w-full z-10'>
  <div className='flex justify-between items-center mx-auto max-w-[80%]'>
{/* left nav */}
<div className='flex gap-5 items-center'>
  <Link href={'/'} className='flex gap-1 items-center'>
    <ShoppingCart color='green' />
    <h1 className='font-semibold text-2xl text-green-600'>FreshCart</h1>
  </Link>
  <ul className=' gap-5  items-center hidden lg:flex'>
    <li><Link className='text-[17px] hover:text-green-600 trantion duration-300' href='/products'>Products</Link></li>
    <li><Link className='text-[17px] hover:text-green-600 trantion duration-300' href='/categories'>Categories</Link></li>
    <li><Link className='text-[17px] hover:text-green-600 trantion duration-300' href='/brands'>Brands</Link></li>

  </ul>
</div>
{/* right nav */}
<div className=''>
  <ul className=' gap-5 items-center hidden lg:flex'>
{session ? <>
   <li>  
{CartOfNumber}
</li>
<li> 
  {wishlistofnumber} 
</li>
<li>
    <DropdownMenu >
      <DropdownMenuTrigger render={<Button className={'border-5 border-green-600 w-10 h-10 cursor-pointer rounded-full'} variant="outline">M</Button>} />
      <DropdownMenuContent className={'py-4'}>
        <DropdownMenuItem className={'text-md'}>
         <Link href={'/profile'} className={'flex items-center gap-1'}>
          My Profile
          <User color='green'  strokeWidth={2.75} />
         </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={'text-md '}>
         
          <Link href={'/allorders'} className='flex items-center gap-1'>
          Orders
          <TruckElectric color='green'  strokeWidth={2.75} />
          </Link>
        </DropdownMenuItem>
      
        <DropdownMenuSeparator />
        <DropdownMenuItem  onClick={()=>logOut()} variant="destructive">
         <span  className='text-[17px] hover:text-red-600 trantion duration-300 flex gap-1 items-center cursor-pointer'>
    SignOut <LogOut />

  </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  
</li>
</>  : <>
<li>  
  <Link className='text-[17px] hover:text-green-600 trantion duration-300 flex items-center gap-1' href='/login'>Login<LogIn /></Link>
</li>
<li>
  <Link className='text-[17px] hover:text-green-600 trantion duration-300' href='/register'>Register</Link>

</li></>}


</ul>
</div>

    <DropdownMenu>
      <DropdownMenuTrigger  className="cursor-pointer lg:hidden" render={<Button variant="outline"><Menu /></Button>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
             <DropdownMenuItem>  
              <li><Link className='text-[17px] hover:text-green-600 trantion duration-200' href='/products'>Products</Link></li>
</DropdownMenuItem>
          <DropdownMenuItem>  
              <li><Link className='text-[17px] hover:text-green-600 trantion duration-200' href='/categories'>Categories</Link></li>
</DropdownMenuItem>
          <DropdownMenuItem>  
              <li><Link className='text-[17px] hover:text-green-600 trantion duration-200' href='/brands'>Brands</Link></li>
</DropdownMenuItem>
          {session ? <>
             <DropdownMenuItem>
             <li>  
              
      {CartOfNumber}
             
</li>
</DropdownMenuItem>
  <DropdownMenuItem>
            <li className=' '>  
{wishlistofnumber}
</li></DropdownMenuItem>
<DropdownMenuItem>
   <span onClick={()=>logOut()} className='text-[17px] hover:text-red-600 trantion duration-300 flex gap-1 cursor-pointer'>
    signOut <LogOut />

  </span>
</DropdownMenuItem>
        
          </> : <>
              <DropdownMenuItem>
            <li>  
  <Link className='text-[17px] hover:text-green-600 trantion duration-200 flex items-center gap-1' href='/login'>Login<LogIn /></Link>
</li></DropdownMenuItem>
          <DropdownMenuItem>
                <li>
  <Link className='text-[17px] hover:text-green-600 trantion duration-200' href='/register'>Register</Link>

</li></DropdownMenuItem>
          </>}
       
       
      
          
         
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

  </div>

   </nav>
    </>
  )
}

