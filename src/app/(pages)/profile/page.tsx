'use client'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { KeyRound, UserPen } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
export default  function Profile() {
const {data:session}= useSession()
console.log('sssss',session)





  


 return (
    <>
   <div className='w-[90%] lg:w-[45%] mx-auto my-5 shadow-2xl rounded-2xl p-5 bg-[#F8F9FA]'>
       <h1 className='text-2xl font-semibold text-center my-5 text-green-600'>My Profile</h1>
  <form >

 <Field className='my-3'>
      <FieldLabel htmlFor="input-field-username" className='font-semibold text-md'>UserName</FieldLabel>
      <Input
       value={session?.user.name}
        id="input-field-username"
        type='text'
        className='bg-white p-5 disabled:text-black text-black disabled:opacity-100'
        disabled
      />
    </Field>
 <Field className='my-3'>
      <FieldLabel htmlFor="input-field-email" className='font-semibold text-md'>UserEmail</FieldLabel>
      <Input
       value={session?.user.email}
        id="input-field-email"
        type='email'
        className='bg-white p-5  disabled:text-black text-black disabled:opacity-100'
        disabled
      />
    </Field>

     <div className='flex items-center gap-2'>
      <Link className='w-full   hover:bg-green-600 trantion-all duration-150 cursor-pointer rounded-[10px]  bg-green-500  ' href={'/updatedata'}>
        <button className='text-white flex items-center gap-1 justify-center py-2  mx-auto font-semibold'>UpdateData <UserPen size={18} strokeWidth={2.75} /></button>
      
      </Link>
     <button className='text-white bg-green-500 py-2 w-full flex items-center gap-1  justify-center font-semibold cursor-pointer rounded-[10px] hover:bg-green-600 trantion-all duration-150'>ChangePassword <KeyRound size={18} strokeWidth={2.75} /></button>

     </div>
  </form>

   </div>

    </>
  )
}
