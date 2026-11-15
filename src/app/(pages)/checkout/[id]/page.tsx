'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import {  CreditCard, HandCoins, Loader  } from 'lucide-react'
import  { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'
import { checkoutFormType, checkoutSchema } from '@/app/schema/checkout.schema'
import { OnlinePayment } from '@/CheckoutApi/CheckoutSession.api'
import { CreateCash } from '@/CheckoutApi/CreateCash.api'
import { toast } from 'react-toastify'
export default function Checkout() {
  const {id}:{id:string}=useParams()
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | null>(null)
  const [isloading, setIsloadin] = useState(false)
  const router = useRouter()
  const form = useForm<checkoutFormType>({
    defaultValues:{
     details:'',
      phone:'',
      city:'',
     
    },
    resolver: zodResolver(checkoutSchema)})
interface checkoutInputs{
  name:'details'|'phone'|'city',
  label:string,
  placeholder:string,
  autoComplete:string,
  type:string
}
    const inputs : checkoutInputs[]=[{
      name:'details',
      label:'Address Details',
      placeholder:'Enter your details',
      autoComplete:'details',
      type:'text'
    },{
      name:'phone',
      label:'Phone',
      placeholder:'Enter your phone',
      autoComplete:'phone',
      type:'tel'
    },{
      name:'city',
      label:'City',
      placeholder:'Enter your city',
      autoComplete:'city',
      type:'text'
    }
  
  ]
  const handleCardCheckout = async (values:checkoutFormType)=>{
    setPaymentMethod('card')
    setIsloadin(true)
    try {
      const response=await OnlinePayment(id,window.location.origin,values)
      if (response.status == 'success') {
        window.location.assign(response.session.url)
        return
      }

      toast.error(response.message || 'Unable to start card payment. Please try again.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to start card payment. Please try again.')
    } finally {
      setIsloadin(false)
      setPaymentMethod(null)
    }
  }

  const handleCashCheckout = async (values:checkoutFormType)=>{
    setPaymentMethod('cash')
    setIsloadin(true)
    try {
      const response=await CreateCash(id,values)
      toast.success(response.message || 'Order placed! You can pay when it arrives.')
      window.location.assign('/allorders')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to place your order. Please try again.')
    } finally {
    setIsloadin(false)

      setPaymentMethod(null)
    }
  }

  return (
    <>
   <div className='w-[90%] lg:w-[60%] mx-auto my-8 shadow-xl rounded-2xl border border-slate-100 bg-white p-5 sm:p-8'>
       <div className='mb-7 text-center'>
         <p className='text-sm font-semibold uppercase tracking-[0.2em] text-green-600'>Almost yours</p>
         <h1 className='mt-2 text-3xl font-bold text-slate-900'>Checkout</h1>
         <p className='mt-2 text-sm text-slate-500'>Add your delivery address, then choose how you want to pay.</p>
       </div>
   <form className='space-y-5' onSubmit={form.handleSubmit(handleCardCheckout)}>
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
<div className='mt-8 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2'>
  <Button disabled={paymentMethod !== null} className='h-auto min-h-20 justify-between rounded-xl border border-slate-200 cursor-pointer bg-white px-5 py-4 text-left text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50' type='submit'>
    <span className='flex flex-col items-start gap-1'>
      <span className='text-base font-semibold'>{paymentMethod === 'card' ? 'Connecting to card payment…' : 'Pay by card'}</span>
      <span className='text-xs font-normal text-slate-500'>Secure online checkout</span>
    </span>
    {paymentMethod === 'card' ? <Loader className='animate-spin' size={20} /> : <CreditCard size={20} />}
  </Button>
  <Button disabled={paymentMethod !== null} onClick={form.handleSubmit(handleCashCheckout)} className='h-auto min-h-20 justify-between cursor-pointer rounded-xl bg-green-600 px-5 py-4 text-left text-white shadow-sm transition hover:bg-green-700' type='button'>
    <span className='flex flex-col items-start gap-1'>
      <span className='text-base font-semibold'>{paymentMethod === 'cash' ? 'Placing your order…' : 'Cash on delivery'}</span>
      <span className='text-xs font-normal text-green-50'>Pay only when it reaches you</span>
    </span>
    {paymentMethod === 'cash' ? <Loader className='animate-spin' size={20} /> : <HandCoins size={20} />}
  </Button>
  </div>
   </form>

   </div>

    </>
  )
}
