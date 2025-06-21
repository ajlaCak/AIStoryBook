import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Hero() {
  return (
    <div className='min-h-screen'> 
      <div className="relative w-full h-[100px]">
        <Image
          src="/newspaper.jpg" 
          alt="Full screen background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
        />
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2">
  {/* Text and Button Section */}
  <div className="flex-1 text-center mt-10 p-3">
    <h2 className="text-white text-[60px] font-extrabold mb-4">
    Create Magical Stories 
    </h2>
    <p className="text-l font-extralight mb-6 text-[#b9b9a9]">
    Unleash the magic of storytelling with AI-generated stories! Create unique tales filled with adventures, laughter, and creativity—tailored just for you. Whether you're in the mood for a bedtime story or an epic quest, our AI is here to bring your imagination to life, page by page!    </p>
    <Link href={'/create-story'}>
    <button className="bg-[#b9b9a9] text-black px-8 py-4 rounded-lg hover:bg-white">
      Create Story
    </button></Link>
  </div>

  {/* Image Section */}
  <div className="flex-1 flex justify-center">
    <div className="relative w-[80%] max-w-[500px]">
    <Image src={'/landing.svg'} alt='hero' width={700} height={400}/>
    </div>
  </div>
  
</div>


    </div>
  )
}

export default Hero
