import { Getspecificbrand } from '@/api/Getspecificbrand.api'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

export default async function BrandDetai({params}:{params:Promise<{id:string}>}) {
    const {id}=await params
const response=await Getspecificbrand(id)
console.log('branddddddddddd',response)
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
