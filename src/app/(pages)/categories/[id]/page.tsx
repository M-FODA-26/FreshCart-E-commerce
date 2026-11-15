import { GetSpecificCategory } from '@/api/GetSpecificCategory.api'
import React from 'react'

export default async function CategoryDetail({params}:{params:Promise<{id:string}>}) {
    const {id}=await params
    const response=await GetSpecificCategory(id)
    console.log('spass',response)

  return (
    <>
         <div className='w-[90%] lg:w-[60%] mx-auto  my-8'>
      <div className='me-5 '>
   <div>
    <h1 className='text-2xl font-semibold'>{response.data.name}:</h1>
    <h3 className='flex justify-center my-5 text-4xl'>No Stock Available 😢</h3>
   </div>
      </div>
    </div>
    </>
  )
}
