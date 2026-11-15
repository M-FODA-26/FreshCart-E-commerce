'use client'
import { registerSchema ,RegisterFormType} from '@/app/schema/register.schema'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LayersArrowUp, Loader } from 'lucide-react'
import  { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Registeration } from '@/api/register.api'
export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
const router=useRouter()
  const form = useForm<RegisterFormType>({
    defaultValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'', 
    },
    resolver: zodResolver(registerSchema)})
interface RegisterFormValues{
  name:'name'|'email'|'password'|'rePassword'|'phone',
  label:string,
  placeholder:string,
  autoComplete:string,
  type:string
}
    const inputs : RegisterFormValues[]=[{
      name:'name',
      label:'Name',
      placeholder:'Enter your name',
      autoComplete:'name',
      type:'text'
    },{
      name:'email',
      label:'Email',
      placeholder:'Enter your email',
      autoComplete:'email',
      type:'email'
    },{
      name:'password',
      label:'Password',
      placeholder:'Enter your password',
      autoComplete:'password',
      type:'password'
    },{
      name:'rePassword',
      label:'rePassword',
      placeholder:'Enter your rePassword',
      autoComplete:'rePassword',
      type:'password'
    },{
      name:'phone',
      label:'Phone',
      placeholder:'Enter your Phone',
      autoComplete:'Phone',
      type:'tel'
    }
  ]
  const  handleRegister = async (values:RegisterFormType)=>{
    setIsLoading(true)

  try {
   const data =await Registeration(values)
    if(data.message=='success'){
toast.success('Register successfully',{position:'top-right',autoClose:1000,delay:1000})
  router.push('/login')
    }else{
      toast.error(data.message || 'Registration failed. Please try again.',{position:'top-right',autoClose:1000,delay:1000})
    }
  }catch (error) {
    toast.error(error instanceof Error ? error.message : 'An error occurred during registration',{position:'top-right',autoClose:1000,delay:1000})
  }finally {setIsLoading(false)}}

  return (
    <>
   <div className='w-[90%] lg:w-[60%] mx-auto my-5 shadow-2xl rounded-2xl p-5'>
       <h1 className='text-2xl font-bold text-center my-5 text-green-600'>Welcome to freshCart,signUp here:</h1>
   <form className='p-5' onSubmit={form.handleSubmit(handleRegister)}>
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
<p className='my-3'>Already have an account? <Link href="/login" className='text-green-500 hover:underline'>Login here</Link></p>
<Button disabled={isLoading} className='w-full  bg-green-500 cursor-pointer hover:bg-green-600 trantion duration-200 p-5 text-[18px] font-semibold' type='submit'>{isLoading ? <Loader className=' animate-spin' /> : <>signUP <LayersArrowUp /></>}</Button>
   </form>

   </div>

    </>
  )
}
