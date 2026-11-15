import React from 'react'
import { GetAllCategory } from '@/api/allCategory.api'
import { CategoryType } from '@/types/category.type'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

export default async function AllCategory() {
const {data}=await GetAllCategory()
console.log(data)

  return (
    <>
         <div className='w-[75%] mx-auto'>
               <div className='flex flex-wrap'>
          {data.map((categ:CategoryType)=>
          <>
            <div className='w-full sm:w-1/2 md:1/3 lg:1/4  xl:w-1/5 my-8'>
      <div className='me-5'>
    <Card  className="p-0 w-full max-w-sm ring-0  cursor-pointer group shadow">
      <CardHeader className='p-0'>
      <Link href={`/categories/${categ._id}`}>
        <CardTitle>
                  <Image className=' h-65  w-full object-cover  ' width={300} height={300} src={categ.image} alt={categ.name} />
        </CardTitle>
        <h3 className='text-center p-4 bg-gray-200 text-[18px] '>{categ.name}</h3>
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
