import { GetAllCategory } from '@/api/allCategory.api'
import React from 'react'
import CategorySwiper from '../categorySwiper/categorySwiper'

export default async function CategorySlider() {
    const {data}=await GetAllCategory()
    // console.log(data)
  return (
    <>
     <CategorySwiper data={data}/>
    </>
  )
}
