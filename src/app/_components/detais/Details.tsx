'use client'
import  { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ShoppingCartPlus, Star } from 'lucide-react';
import { productType } from '@/types/product.type';
import AddBtn from '../AddBtn/AddBtn';
import { Button } from '@/components/ui/button';
import CheckOutBtn from '../CheckOutBtn/CheckOutBtn';
export default function Details({data}:{data:productType}) {
const [selectedImage,setSelectedImage]=useState(data.imageCover)
const renderStars=(rating:number)=>{
    const fullStars=Math.floor(rating)
    const stars=[]
    for (let index = 0; index < 5; index++) {
        stars.push(
            <Star key={index} fill={index<rating ? '#FDC700' :'transparent'} color='#FDC700' />

        );
        
    }
return <div className='flex gap-0.5 items-center'>{stars}</div>
}
  return (
    <>
        <div className='my-10'>
      <div className=' w-[90%] lg:w-[80%] mx-auto'>
        <div className='  lg:flex'>
          <div className=' p-10 w-full lg:w-1/4   border border-[#F0F0F0] rounded-2xl shadow'>
            <img key={selectedImage} src={selectedImage} className='product-image-enter mb-3' alt={data.slug} />
  <Swiper
      spaceBetween={0}
      slidesPerView={4}
    
     
    >
        {data.images.map((image)=><SwiperSlide key={image} onClick={()=>setSelectedImage(image)}><img className=' cursor-pointer hover:border-3 border-green-800 transition-all duration-100' src={image} alt={data.slug} /></SwiperSlide>)}
     
     
   
    </Swiper>
          </div>
          <div className='mt-5 lg:mt-0 p-5 w-full lg:w-3/4 border border-[#F0F0F0] rounded-2xl shadow'>
<div>
    <span className='text-[#15803D] bg-[#F0FDF4] text-[14px] px-2.5 py-1.5 rounded-2xl me-3'>{data.category.name}</span>
    <span className='text-[#364153] bg-[#F3F4F6] tex-[14px] rounded-2xl py-1 px-2.5'>{data.brand.name}</span>
    <h2 className='my-3 text-[25px] font-bold'>{data.title}</h2>
    <div className='flex items-center gap-1'>
    {renderStars(data.ratingsAverage)}
<div>
    <span className=' text-gray-800'>{data.ratingsAverage} ({data.ratingsQuantity} reviews)</span>
</div>
    </div>
    <h2 className='text-[30px] font-bold my-1'>{data.price} EGP</h2>
    <hr/>
</div>
<div className='mt-3'>
    <p className='text-gray-600 font-medium'>{data.description}</p>
</div>
<div className='my-3 w-full'>
  <div className=''>
  <div>
    <AddBtn show id={data.id}/> 
  </div>
  <div>
     <CheckOutBtn cartId={data._id}/>
  </div>
  </div>
  </div> 

          </div>

        </div>
      </div>
    </div>
    </>
  )
}
