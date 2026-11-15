   'use server'

import { RegisterFormType } from "@/app/schema/register.schema"


   export const Registeration=async(values:RegisterFormType)=>{

     const response =await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',{
      method:'POST',
      body:JSON.stringify(values),
      headers:{'content-type':'application/json'}})
      const payload=await response.json()
      return payload
   }
   
   
 