"use client"
import { ClerkProvider } from '@clerk/nextjs'
import { HeroUIProvider } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Users } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/config/db';
import { useUser } from '@clerk/nextjs';
import { userDetailContext } from './_context/userDetailContext'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Provider({children}:{children:React.ReactNode}) {
   const [userDetail,setUserDetail]=useState<any>();
   const {user}=useUser();
   useEffect(()=>{
    user&&saveNewUserIfNotExist();
   },[user]
  )

   const saveNewUserIfNotExist=async()=>{
    //check if use exist
    const userResp=await db.select().from(Users)
    .where(eq(Users.userEmail,user?.primaryEmailAddress?.emailAddress??''))
     console.log("ExisitngUser",userResp);

     if(!userResp[0]){
        const result=await db.insert(Users).values({
          userEmail:user?.primaryEmailAddress?.emailAddress,
          userName:user?.fullName
        }).returning({
            userEmail:Users.userEmail,
            userName:Users.userName,
            credit:Users.credit
          })
          console.log("new user",result[0])
        setUserDetail(result[0]);
     }else{
      setUserDetail(userResp[0])
     }
   }
  return (
    <userDetailContext.Provider value={{userDetail,setUserDetail}}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID??'' }}>
    <HeroUIProvider>
      {/* Header */}
    <Header/>
    {children}
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
  </HeroUIProvider>
  </PayPalScriptProvider>
 </userDetailContext.Provider>
  )
}

export default Provider