import React, { useRef, useState, useEffect } from 'react'
import { MdPlayCircleFilled, MdStopCircle } from "react-icons/md"

function StoryPages({ storyChapter }: any) {
  const synth = window.speechSynthesis
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const toggleSpeech = (text: string) => {
    if (synth.speaking) {
      // If currently speaking, stop it
      synth.cancel()
      setIsSpeaking(false)
      utteranceRef.current = null
    } else {
      // Start speaking
      const utterance = new SpeechSynthesisUtterance(text)
      utteranceRef.current = utterance
      setIsSpeaking(true)

      utterance.onend = () => {
        setIsSpeaking(false)
        utteranceRef.current = null
      }

      synth.speak(utterance)
    }
  }

  // Clean up speech on component unmount
  useEffect(() => {
    return () => {
      if (synth.speaking) synth.cancel()
    }
  }, [synth])

  return (
    <div>
      <h2 className='text-2xl font-bold text-primary flex justify-between'>
        {storyChapter?.title}
        <span
          className='text-3xl cursor-pointer select-none'
          onClick={() => toggleSpeech(storyChapter?.text)}
          title={isSpeaking ? 'Stop reading' : 'Read aloud'}
        >
          {isSpeaking ? <MdStopCircle /> : <MdPlayCircleFilled />}
        </span>
      </h2>
      <p className='text-lg p-10 mt-3 rounded-lg bg-slate-100 line-clamp-[10]'>
        {storyChapter?.text}
      </p>
    </div>
  )
}

export default StoryPages
