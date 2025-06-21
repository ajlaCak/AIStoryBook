'use client'

import React, { useRef, useState, useEffect } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io'
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { eq } from 'drizzle-orm'
import StoryPages from '../_components/StoryPages'
import { useParams } from 'next/navigation'
import LastPage from '../_components/LastPage'

function ViewStory() {
  const [story, setStory] = useState<any>()
  const bookRef = useRef<any>(null)
  const [count, setCount] = useState(0)
  const params = useParams();

  useEffect(() => {
    getStory()
  }, [])

  const getStory = async () => {
    const result = await db.select().from(StoryData)
      .where(eq(StoryData.storyId, params.id as string)) // Ensure correct type

    setStory(result[0])
  }

  return (
    <div className='p-10 md:px-20 lg:px-40 flex justify-center flex-col'>
      <h2 className='font-bold text-4xl text-center p-10 bg-primary text-white'>
        {story?.output?.title}
      </h2>

      <div className='relative'>
        
      {story?.output?.chapters  && (
        //@ts-ignore
  <HTMLFlipBook
    width={450}
    height={500}
    showCover={true}
    className='mt-10'
    useMouseEvents={false}
    ref={bookRef}
  >
    {/* COVER PAGE */}
    <div className='bg-white p-10 flex items-center justify-center'>
      <img
  src={story?.imageBase64}
  alt="story cover"
  className="w-full h-full object-cover rounded-xl"
/>

    </div>

    {/* CHAPTER PAGES */}
    {story.output.chapters.map((chapter: any, index: number) => (
      <div key={index} className='bg-white p-10 border'>
        <StoryPages storyChapter={chapter} />
      </div>
    
    ))}
    {/* LAST PAGE */}
  <LastPage />
  </HTMLFlipBook>
)}


        {/* PREVIOUS ARROW */}
        {count > 0 && (
          <div className='absolute -left-5 top-[250px]' onClick={() => {
            bookRef.current.pageFlip().flipPrev()
            setCount(count - 1)
          }}>
            <IoIosArrowDropleftCircle className='text-[40px] text-primary cursor-pointer' />
          </div>
        )}

        {/* NEXT ARROW */}
        {count < (story?.output?.chapters?.length - 1) && (
          <div className='absolute right-0 top-[250px]' onClick={() => {
            bookRef.current.pageFlip().flipNext()
            setCount(count + 1)
          }}>
            <IoIosArrowDroprightCircle className='text-[40px] text-primary cursor-pointer' />
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewStory
