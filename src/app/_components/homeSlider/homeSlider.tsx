'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import img1 from '../../../../public/img1.jpeg'
import img2 from '../../../../public/img2.jpeg'
import img3 from '../../../../public/img3.jpeg'
import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
export default function HomeSlider() {
  return (
    <>
     <div className='w-[90%] mx-auto my-5'>
         <Swiper
      spaceBetween={50}
      slidesPerView={1}
     modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
    >
      <SwiperSlide><Image src={img1} className="w-full h-100 object-cover" alt="Image 1" /></SwiperSlide>
      <SwiperSlide><Image src={img2} className="w-full h-100 object-cover" alt="Image 2" /></SwiperSlide>
      <SwiperSlide><Image src={img3} className="w-full h-100 object-cover" alt="Image 3" /></SwiperSlide>
     
    </Swiper>
     </div>
    </>
  )
}
