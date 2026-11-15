'use client'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { VerifyCodes } from '@/Password.api/verifyCode.api'

export default function VerifyCode() {
    const router=useRouter()
    const [resetCode,setResetCode]=useState('')
    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
  try {
      const response=await VerifyCodes(resetCode)
    console.log('nnnnnnn',response)
if(response.status=='Success'){
    toast.success('Verify Code Successfully',{position:'top-right',autoClose:2000,closeOnClick:true})
   router.push(`/resetPassword`)
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
      <FieldLabel className='mt-3 font-bold text-[16px]' htmlFor="input-field-code">Reset Code:</FieldLabel>
      <Input
      onChange={(e)=>setResetCode(e.target.value)}
        id="input-field-code"
        type="text"
        placeholder="Enter your Code"
        className="w-full p-6"
      />
     
    </Field>
    <button type='submit' className='w-full bg-green-500 text-white py-3   font-semibold my-5 rounded-2xl hover:bg-green-600 trantion-all duration-150 cursor-pointer'>Confirm Reset Code</button>
        </form>
 

    </div>
     
    </>
  )
}
