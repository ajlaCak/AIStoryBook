"use client"
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import React, { useEffect, useState } from 'react'
import {eq,desc} from 'drizzle-orm'
import  {StoryItemType}  from '../dashboard/_components/UserStoryList'
import StoryItem from '../dashboard/_components/StoryItem'
import { Button } from '@heroui/button'

function ExploreMore() {
const[offset,setOffset]=useState(0);
const [storyList, setStoryList] = useState<StoryItemType[]>([]); // ✅ empty array

useEffect(() => {
    GetAllStories(0);
  }, []); // ✅ only run once on mount
  

  const GetAllStories = async (newOffset: number) => {
    const result: any = await db.select().from(StoryData)
      .orderBy(desc(StoryData.id))
      .limit(8)
      .offset(newOffset);
  
    setStoryList((prev) => [...prev, ...result]);
    setOffset(newOffset); // ✅ update offset after successful fetch
  };
  
  return (
    <div className='min-h-screen p-10 md:px-20 lg:px-40'>
        <h2 className='font-bold text-4xl text-primary text-center'>Explore More Stories</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 
        lg:grid-cols-3 xl:grid-cols-4 mt-10
        gap-10'>
        {storyList?.map((item,index)=>(
            <StoryItem key={index} story={item} />
        ))}
        </div>
        <div className='text-center mt-10'>
        <Button color='primary' onPress={()=>GetAllStories(offset+8)}>Read More</Button>
        </div>
    </div>
  )
}

export default ExploreMore