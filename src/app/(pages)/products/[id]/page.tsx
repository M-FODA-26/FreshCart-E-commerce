import { productDetail } from '@/api/productDetail.api'
import Details from '@/app/_components/detais/Details'
import React from 'react'

export default async function ProductDetail({params}:{params:Promise<{id:string}>}) {
    let {id} =await params
    // console.log(id)
    let {data}=await productDetail(id)
    // console.log(data)
  return (
    <>
      <Details data={data}/>
    </>
  )
}
