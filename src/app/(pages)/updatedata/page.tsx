'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import {  Loader, SquarePen } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { LoggedUserDataFormType, LoggedUserDataSchema } from '@/app/schema/LoggedUserData.schema'
import { LoggedUserData } from '@/Password.api/LoggedUserData.api'
export default function Updatedata() {
  const [isLoading, setIsLoading] = useState(false)
const router=useRouter()
  const form = useForm({
    defaultValues:{
     name:'',
      email:'',
      phone:'',
     
    },
    resolver: zodResolver(LoggedUserDataSchema)})
interface LoggeduserdataFormValues{
  name:'name'|'email'|'phone',
  label:string,
  placeholder:string,
  autoComplete:string,
  type:string
}
    const inputs : LoggeduserdataFormValues[]=
    [
        {
      name:'name',
      label:'Name',
      placeholder:'Enter your Name',
      autoComplete:'name',
      type:'text'
    },
        {
      name:'email',
      label:'Email',
      placeholder:'Enter your email',
      autoComplete:'email',
      type:'email'
    },{
      name:'phone',
      label:'Phone',
      placeholder:'Enter your Phone',
      autoComplete:'phone',
      type:'tel'
    }
  
  ]
  const  handeleLogin = async (values:LoggedUserDataFormType)=>{
    console.log(values)
    setIsLoading(true)
try {
    const response=await LoggedUserData(values)
console.log(response)
if (response.message=="success") {
    toast.success('Update Successfuly',{position:'top-right',autoClose:1000,closeOnClick:true})
    router.push('/')
    
}else{
    toast.error("can't Updata",{position:'top-right',autoClose:1000,closeOnClick:true})
}

} catch (error) {
    toast.error("can't Updata",{position:'top-right',autoClose:1000,closeOnClick:true})
    
}finally{
    setIsLoading(false)
}
  }


  return (
    <>
   <div className='w-[90%] lg:w-[60%] mx-auto my-5 shadow-2xl rounded-2xl p-5'>
       <h1 className='text-2xl font-bold text-center my-5 text-green-600'>Welcome to freshCart,Login here:</h1>
   <form className='p-5' onSubmit={form.handleSubmit(handeleLogin)}>
        {inputs.map((input)=><Controller 
        key={input.name}
  name={input.name}
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name} className='mt-3 font-bold text-[16px] '>{input.label}</FieldLabel>
      <Input
      className='w-full p-6'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder={input.placeholder}
        autoComplete={input.autoComplete}
        type={input.type}
      />
     
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>)}

<Button disabled={isLoading} className='w-full  bg-green-500 cursor-pointer hover:bg-green-600 trantion duration-200 p-5 text-[18px] font-semibold my-5' type='submit'>{isLoading ? <Loader className=' animate-spin' /> : <>Update <SquarePen size={28} strokeWidth={2.75} /></>}</Button>
   </form>

   </div>

    </>
  )
}
