"use client"
import { userDetailContext } from '@/app/_context/userDetailContext'
import { Button } from '@heroui/button';
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext } from 'react'

function DashboardHeader() {
const {userDetail,setUserDetail}=useContext(userDetailContext);

  return (
    <div className='p-7 bg-primary text-white flex justify-between items-center'>
        <h2 className='font-bold text-3xl'>MY STORIES</h2>
        <div className='flex gap-3 items-center'>
            <Image src={'/coin.png'} alt='coin' width={50} height={50}/>
            <span className='text-2xl'>{userDetail?.credit} coins left</span>
            <Link href={'/buy-credits'}>
            <Button className='bg-white'>Buy more Credits</Button>
            </Link>
            
        </div>
    </div>
  )
}

export default DashboardHeader