'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import {  Loader, LogInIcon } from 'lucide-react'
import  { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { loginFormType, loginSchema } from '@/app/schema/login.schema'
import { signIn } from 'next-auth/react'
export default function LogIn() {
  const [isLoading, setIsLoading] = useState(false)
const router=useRouter()
  const form = useForm({
    defaultValues:{
     
      email:'',
      password:'',
     
    },
    resolver: zodResolver(loginSchema)})
interface LoginFormValues{
  name:'email'|'password',
  label:string,
  placeholder:string,
  autoComplete:string,
  type:string
}
    const inputs : LoginFormValues[]=[{
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
    }
  
  ]
  const  handeleLogin = async (values:loginFormType)=>{
    console.log(values)
    setIsLoading(true)

try{

 const response= await signIn('credentials',{
  email:values.email,
  password:values.password,
  redirect:false,
  callbackUrl:'/'
 })
 console.log(response)
 if(response?.ok){
  toast.success('Login successfully',{position:'top-right',autoClose:1000,delay:1000})
  setTimeout(()=>{
    router.push('/'),1000
 })
 }else{
  toast.error('Invalid email or password',{position:'top-right',autoClose:1000,delay:1000})
 }

}catch (error){
  toast.error('An error occurred during login',{position:'top-right',autoClose:1000,delay:1000})
}finally{setIsLoading(false)}
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
<Link href={'/forgotPassword'}>
<p className='text-green-600 hover:underline my-2'>ForgotPassword ?</p>

</Link>
<Button disabled={isLoading} className='w-full  bg-green-500 cursor-pointer hover:bg-green-600 trantion duration-200 p-5 text-[18px] font-semibold' type='submit'>{isLoading ? <Loader className=' animate-spin' /> : <>Login <LogInIcon /></>}</Button>
<p className='my-3 text-center'>New to freshCart? <Link href="/register" className='text-green-500 hover:underline'>signUp Now!</Link></p>
   </form>

   </div>

    </>
  )
}
