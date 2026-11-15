import React from 'react'
import { CategoryType } from '@/types/category.type'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { GetAllBrands } from '@/api/GetAllBrands.api'

export default async function AllBrands() {
const {data}=await GetAllBrands()
console.log(data)

  return (
    <>
         <div className='w-[75%] mx-auto'>
               <div className='flex flex-wrap'>
          {data.map((brand:CategoryType)=>
          <>
            <div className='w-full sm:w-1/2 md:1/3 lg:1/4  xl:w-1/5 my-8'>
      <div className='me-5'>
    <Card  className="p-0 w-full max-w-sm ring-0  cursor-pointer group shadow">
      <CardHeader className='p-0'>
      <Link href={`/brands/${brand._id}`}>
        <CardTitle>
                  <Image className=' h-40  w-full object-cover  ' width={300} height={300} src={brand.image} alt={brand.name} />
        </CardTitle>
        <h3 className='text-center p-4 text-[#212836] bg-gray-200 text-[18px] '>{brand.name}</h3>
      </Link>
        
      </CardHeader>
      
     
    </Card>
      </div>
    </div></>
         )}
            </div>
           </div>
    </>
  )
}
