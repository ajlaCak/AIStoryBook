import { Textarea } from '@heroui/input'
import React from 'react'

function StorySubjetcInput({userSelection}:any) {
  return (
    <div>
      <label className='font-bold text-4xl text-primary'>1. Story Subject</label>
      <Textarea
      placeholder='Enter the desired story theme you want to generate'
      size='lg'
      classNames={{
        input:"resize-y min-h-[230px] text-2xl p-5"
        
      }}
      className='mt-3 max-w-lg'
      onChange={(e)=>userSelection({
        fieldValue:e.target.value,
        fieldName:'storySubject'
      })

      }
      />
        
    </div>
  )
}

export default StorySubjetcInput