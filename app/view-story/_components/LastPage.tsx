import { Button } from '@heroui/button'
import React from 'react'

function LastPage({props,ref}:any) {
  return (
    <div className='bg-white p-10 h-full' ref={ref}>
        <h2 className='text-2xl font-bold text-primary flex justify-center'>The End</h2>
        
    </div>
  )
}

export default LastPage