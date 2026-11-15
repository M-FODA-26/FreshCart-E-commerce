'use client'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { forgotPassword } from '@/Password.api/forgotPassword.api'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function ForgotPassword() {
    const router=useRouter()
const [email,setEmail]=useState('')
async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
  try {
      const response=await forgotPassword(email)
    console.log('ssssssssss',response)
if(response.statusMsg=='success'){
    toast.success(response.message,{position:'top-right',autoClose:2000,closeOnClick:true})
    router.push('/verifyCode')
}else{
    toast.error(response.message,{position:'top-right',autoClose:2000,closeOnClick:true})


}

  } catch (error) {
    toast.error('Failed to send reset code',{position:'top-right',autoClose:1000,closeOnClick:true})
  }
}
  return (
    <>
    <div className='w-[90%] lg:w-[60%] mx-auto my-10 shadow-2xl rounded-2xl p-5'>
        <h1 className='text-green-600 text-2xl text-center'>Account Recovery</h1>
        <form className='p-5' onSubmit={handleSubmit}>
 <Field>
      <FieldLabel className='mt-3 font-bold text-[16px]' htmlFor="input-field-email">Email</FieldLabel>
      <Input
      onChange={(e)=>setEmail(e.target.value)}
        id="input-field-email"
        type="email"
        placeholder="Enter your Email"
        className="w-full p-6"
      />
     
    </Field>
    <button type='submit' className='w-full bg-green-500 text-white py-3   font-semibold my-5 rounded-2xl hover:bg-green-600 trantion-all duration-150 cursor-pointer'>Send Reset Code</button>
        </form>
 

    </div>
     
    </>
  )
}
