import React, { useState } from 'react'
import Image from "next/image";
import { OptionFiled } from './StoryType';

function ImageStyle({userSelection}:any) {
 const OptionList=[
    //Cartoon & Whimsical 
    //Watercolor & Soft Pastels
    // Doodle & Hand-Drawn Style
    //Futuristic

           
           {
               label:'Cartoon & Playful Style',
               imageUrl:'/crtic.png',
               isFree:true
           },
           {
               label:'Watercolor Style',
               imageUrl:'/akvarel.png',
               isFree:true
           },
           {
               label:'Hand-Drawn Style',
               imageUrl:'/rucno.png',
               isFree:true
           },
           {
            label:'Futuristic Style',
            imageUrl:'/futuristic.png',
            isFree:true
        }
   
       ]
   
       const [selectedOption,setSelectedOption]=useState<string>();
        const onUserSelect=(item:OptionFiled)=>{
                     setSelectedOption(item.label);
                     userSelection({
                         fieldValue:item?.label,
                         fieldName:'imageStyle'
                     })
             
                 }
   
     return (
       <div>
           <label className='font-bold text-4xl text-primary '>3.Style</label>
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
                   className='object-cover h-[180px] rounded-3xl'
                   />
               </div>
               )}
           </div>
       </div>
     )
}

export default ImageStyle