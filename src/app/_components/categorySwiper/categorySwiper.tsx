'use client'
import React from 'react'
import type { CategoryType } from '@/types/category.type'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
export default function CategorySwiper({data}:{data:CategoryType[]}) {
  return (
    <>
      <div className='w-[90%] mx-auto my-5'>
        <h2 className='mt-10 mb-20 font-extrabold text-3xl  inline-block relative before:absolute before:rounded-3xl before:-left-5 before:w-2 before:h-10 before:bg-green-600 before:z-10'>Shop By <span className='text-green-600'>Category</span></h2>
         <Swiper
      spaceBetween={0}
      slidesPerView={2}
     modules={[Autoplay]}
    autoplay={{ delay: 2000 }}
    breakpoints={{640:{slidesPerView:3},768:{slidesPerView:4},1024:{slidesPerView:7}}}
    >
        {data.map((photo)=> <SwiperSlide key={photo._id}><img src={photo.image} className='w-full h-50 object-cover' alt={photo.slug} /></SwiperSlide>)}

    
      
    </Swiper>
     </div>
    </>
  )
}
