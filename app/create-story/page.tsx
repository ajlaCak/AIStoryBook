'use client'
import React, { useContext, useState } from 'react'
import StorySubjetcInput from './_components/StorySubjetcInput'
import StoryType from './_components/StoryType'
import AgeGroup from './_components/AgeGroup'
import ImageStyle from './_components/ImageStyle'
import { Button } from '@heroui/button'
import { Bounce, toast } from 'react-toastify'

import { db } from '@/config/db'
import { StoryData, Users } from '@/config/schema'
import { Form } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid';
import CustomLoader from './_components/customLoader'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { userDetailContext } from '../_context/userDetailContext'

const CREATE_STORY_PROMPT=process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT
export interface fieldData{
  fieldName:string,
  fieldValue:string
}
export interface formDataType{
  storySubject:string,
  storyType:string,
  imageStyle:string,
  ageGroup:string
}
function CreateStory() {

  const [formData,setFormData]=useState<formDataType>();
  const [loading,setLoading]=useState(false);
  const router=useRouter();
  const notify = (msg:string) => toast(msg);
  const notifyError = (msg:string) => toast.error(msg);
  const {user}=useUser();
  const {userDetail,setUserDetail}=useContext(userDetailContext);

  /**
   * used to add data to form
   * @param data 
   */
  const onHandleUserSelection=(data:fieldData)=>{
    setFormData((prev:any)=>({
      ...prev,
      [data.fieldName]:data.fieldValue
    }));
    console.log(formData)
  }

  const GenerateStory = async () => {
  if (userDetail.credit <= 0) {
    notifyError('You dont have enough credits!');
    return;
  }

  setLoading(true);

  const FINAL_PROMPT = CREATE_STORY_PROMPT
    ?.replace('{ageGroup}', formData?.ageGroup ?? '')
    .replace('{storyType}', formData?.storyType ?? '')
    .replace('{storySubject}', formData?.storySubject ?? '')
    .replace('{imageStyle}', formData?.imageStyle ?? '') + "\nPlease write the story only in English.";

  try {
    const response = await fetch('/api/generate-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formData,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        storyPrompt: FINAL_PROMPT,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      notify('Story generated');
       await UpdateUserCredits();
      router.replace('/view-story/' + data.storyId);
    } else {
      notifyError(data.error || 'Failed to generate story');
    }
  } catch (error) {
    console.error(error);
    notifyError('Server error, try again');
  }

  setLoading(false);
};


  /**
   * Save Data in Database
   * @param output AI Output
   * @returns 
   */
  const SaveInDB=async(output:string)=>{
    const recordId=uuidv4();
    setLoading(true)
    try{
      const result=await db.insert(StoryData).values({
          storyId:recordId,
          ageGroup:formData?.ageGroup,
          imageStyle:formData?.imageStyle,
          storySubject:formData?.storySubject,
          storyType:formData?.storyType,
          output:JSON.parse(output),
         // imageBase64:base64Image,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          userName:user?.fullName
      }).returning({storyId:StoryData?.storyId})
      setLoading(false);
      return result;
    }
    catch(e)
    {
        setLoading(false);
    } 
  }


  const UpdateUserCredits=async()=>{
    const result=await db.update(Users).set({
      credit:Number(userDetail?.credit-1)
    }).where(eq(Users.userEmail,user?.primaryEmailAddress?.emailAddress??''))
    .returning({id:Users.id})
  }

  return (
    <div className='p-10 md:px-20 lg:px-40'>
      <h2 className='font-extrabold text-[70px] text-primary text-center'>CREATE YOUR STORY</h2>
      <p className='text-2xl text-primary text-center'>Unlock your creativity with AI: Craft stories like never before!Let our AI bring your imagination to life, one story at a time.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-14'>
        {/* Story Subject  */}
          <StorySubjetcInput userSelection={onHandleUserSelection}/>
        {/* Story Type  */}
          <StoryType userSelection={onHandleUserSelection}/>
        {/* Age Group  */}
          <AgeGroup userSelection={onHandleUserSelection}/>
        {/* Image Style  */}
         <ImageStyle userSelection={onHandleUserSelection}/>
      </div>

      <div className='flex justify-end my-10 flex-col items-end'>
        <Button color='primary' 
        disabled={loading}
        className='p-10 text-2xl'
        onClick={GenerateStory}>
          Generate Story</Button>
          <span>1 Credit will user</span>
      </div>
      <CustomLoader isLoading={loading}/>

    </div>
  )
}

export default CreateStory