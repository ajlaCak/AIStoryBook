"use client"
import React, { useState } from 'react'
import Image from "next/image";

export interface OptionFiled{
    label:string,
    imageUrl:string,
    isFree:boolean
}

function StoryType({userSelection}:any) {
    const OptionList=[
        
        {
            label:'Fairy tale',
            imageUrl:'/fairytale.png',
            isFree:true
        },
        {
            label:'Moral story',
            imageUrl:'/educational.png',
            isFree:true
        },
        {
            label:'Adventure story',
            imageUrl:'/adventure.png',
            isFree:true
        },
        {
            label:'Bedtime story',
            imageUrl:'/bedtime.png',
            isFree:true
        }

    ]

    const [selectedOption,setSelectedOption]=useState<string>();

    const onUserSelect=(item:OptionFiled)=>{
        setSelectedOption(item.label);
        userSelection({
            fieldValue:item?.label,
            fieldName:'storyType'
        })

    }

  return (
    <div>
        <label className='font-bold text-4xl text-primary '>2.Story Type</label>
        <div className='grid grid-cols-4 gap-5 mt-3'>
            {OptionList.map((item,index)=>
            <div  key={item.label || index}  className={`relative grayscale hover:grayscale-0 cursor-pointer
            ${selectedOption==item.label?'grayscale-0':'grayscale'}
            `} onClick={()=>onUserSelect(item)}>
                <h2 className="absolute inset-0 flex items-center justify-center text-white text-xl  bg-black bg-opacity-40 rounded-3xl">
                    {item.label}
                </h2>                
                <Image src={item.imageUrl} alt={item.label}
                width={300} height={500}
                className='object-cover h-[260px] rounded-3xl'
                />
            </div>
            )}
        </div>
    </div>
  )
}

export default StoryType