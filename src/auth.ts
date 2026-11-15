import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";




export const authOption:NextAuthOptions={
pages:{signIn:'/login'},
    providers:[
        Credentials({
name:'Credentials',
credentials:{
    email:{},
    password:{}
},
authorize:async(credentials)=>{
    const response=await fetch(`${process.env.API}/auth/signin`,{
        method:'POST',
        body:JSON.stringify({email:credentials?.email,password:credentials?.password}),
        headers:{'content-type':'application/json'}
    })
    const payload=await response.json()
    console.log(payload)
    const decoded:{id:string} = jwtDecode(payload.token);
    console.log(decoded)
    if (payload.message=='success') {
        return {user:payload.user,
            id:decoded.id,
            token:payload.token
        }
        
    }else{
throw new Error(payload.message);
    }

},


        })
    ],
    callbacks:{
          async jwt({ token, user }) {
if (user) {
    token.user=user.user
    token.token=user.token
    
}           

      return token
    },
     async session({ session, token }) {
        if (token.user) {
            session.user=token.user
            
        }
      return session
    }

    }

}















































// import { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { jwtDecode } from "jwt-decode";

// export const authOption:NextAuthOptions={
//     pages:{
//         signIn:'/login'
//     },
//     providers:[
//         Credentials({
//             name:'Credentials',
//             credentials:{
//                 email:{},
//                 password:{}
//             },
//             authorize:async (credentials)=>{
//                 const response=await fetch(`${process.env.API}/auth/signin`,{
//                     method:'POST',
//                     body:JSON.stringify({email:credentials?.email,password:credentials?.password}),
//                     headers:{'content-type':'application/json'}
//                 })
//                 const payload=await response.json()
//                 if(payload.message=='success'){
//                     const decoded:{id:string} = jwtDecode(payload.token);
//                     return{
//                         id:decoded.id,
//                         user:payload.user,
//                         token:payload.token
//                     }
//                 }else{
//                     throw new Error(payload.message)
//                 }
                
//             }
//         })
//     ],
//     callbacks:{
//     async jwt({ token, user }) {

//             if(user){
//                token.user=user.user
//                token.token=user.token
//             }
//             console.log(token)
//                return token
//     },
//     async session({ session, token}) {
//       if (token.user) {
//         session.user = {  ...token.user }
//       }
//     return session
//     }

//     }
// }