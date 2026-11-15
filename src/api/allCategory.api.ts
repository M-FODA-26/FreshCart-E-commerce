



export const GetAllCategory=async()=>{
 let response =fetch('https://ecommerce.routemisr.com/api/v1/categories')

 let data=(await response).json()
 return data


}