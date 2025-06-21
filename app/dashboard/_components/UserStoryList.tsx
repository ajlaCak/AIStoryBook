"use client"
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import {eq,desc} from 'drizzle-orm'
import StoryItem from './StoryItem';
//import CustomLoader from '.../'

export type StoryItemType={
    id: number,
    storyType: string,
    ageGroup: string,
    imageBase64: string,
    imageStyle: string,
    userEmail: string,
    userImage: string,
    userName: string,
    output: [] | any,
    storyId: string,
    storySubject: string
}

function UserStoryList() {
    const {user}=useUser();
    const [storyList, setStoryList] = useState<StoryItemType[]>();
    const[loading,setLoading]=useState();
    useEffect(()=>{
        user&&getUserStory();
    },[user])

const getUserStory=async()=>{
    const result:any=await db.select().from(StoryData)
    .where(eq(StoryData.userEmail,user?.primaryEmailAddress?.emailAddress??''))
    .orderBy(desc(StoryData.id))
    console.log(result);
    setStoryList(result);
}

  return (
    <div>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>
        {storyList&&storyList.map((item:StoryItemType,index:number)=>(
            <StoryItem key={item.id ?? index} story={item}/>

       ) )}
    </div>
   
    </div>
  )
}

export default UserStoryList