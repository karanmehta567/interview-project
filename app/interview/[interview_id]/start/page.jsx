'use client'
import React, { useContext, useEffect, useRef, useCallback } from 'react'
import { InterviewContext } from '@/context/InterviewContext'
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import Vapi from '@vapi-ai/web'
import AlerrtConfirmation from './_components/AlerrtConfirmation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import { supabase } from '@/services/supabaseClient'
import { useParams, useRouter } from 'next/navigation'

function StartInterview() {
  const { interviewInfo } = useContext(InterviewContext)
  const params=useParams()
  const interview_id=params.interview_id
  const vapiRef = useRef(null)
  const router=useRouter()
  const [loading,setLoading]=React.useState(false)
  // Active user state
  const [activeUser, setActiveUser] = React.useState(false)
  const [conversation,setConversation]=React.useState()

  const GenerateFeedback=async()=>{
    setLoading(true)
    const result=await axios.post('/api/ai-feedback',{
      conversation:conversation
    })
    const Content=result.data.content
    const final_content=Content.replace('```json','').replace('```','')
    try {
        const { data, error } = await supabase
          .from('interview-feedback')
          .insert([
            { 
            userName: interviewInfo?.username,
            userEmail: interviewInfo?.email,
            interview_id:interview_id,
            feedback:JSON.parse(final_content),
          }])
          .select()
          if(error){
            console.error("Supabase insert error:", error); 
          }
    } catch (error) {
        console.error('Error while inserting',error)
    }
    router.replace(`/dashboard`);
    setLoading(false)
  }
  // Initialize Vapi instance only once
  useEffect(() => {
    if (vapiRef.current || typeof window === 'undefined') return

    const key = process.env.NEXT_PUBLIC_VAPI_KEY

    const instance = new Vapi(key)
    instance.on('error', (err) => console.error('Vapi error:', err))
    vapiRef.current = instance
  }, [])

  // Event handlers (stable with useCallback)
  const handleCallStart = useCallback(() => toast("Call connected"), [])
  const handleSpeechStart = useCallback(() => setActiveUser(false), [])
  const handleSpeechEnd = useCallback(() => setActiveUser(true), [])
  const handleCallEnd = useCallback(() => {
    toast("Interview has ended")

    if (!conversation || conversation.length === 0) {
      console.warn("Conversation not captured yet ❌")
      return
    }

    GenerateFeedback() // ✅ Only call when conversation exists
  }, [conversation])

  const handleMessage = useCallback((message) => {
  if (message?.conversation) {
    setConversation(message.conversation)
  }
}, [])

  // Attach Vapi events only once
  useEffect(() => {
    const vapi = vapiRef.current
    if (!vapi) return

    vapi.on('call-start', handleCallStart)
    vapi.on('speech-start', handleSpeechStart)
    vapi.on('speech-end', handleSpeechEnd)
    vapi.on('call-end', handleCallEnd)
    vapi.on('message', handleMessage)

    return () => {
      vapi.off('call-start', handleCallStart)
      vapi.off('speech-start', handleSpeechStart)
      vapi.off('speech-end', handleSpeechEnd)
      vapi.off('call-end', handleCallEnd)
      vapi.off('message', handleMessage)
    }
  }, [handleCallStart, handleSpeechStart, handleSpeechEnd, handleCallEnd, handleMessage])
  const onStartCall = () => {
    const vapi = vapiRef.current
    if (!interviewInfo || !vapi) return

    const questionList = interviewInfo?.interviewData?.questionList
      ?.map(q => q.question)
      ?.join(', ')

    const interviewRecruiterPrompt = {
      name: "AI Interview Recruiter",
      firstMessage: `Hi ${interviewInfo?.username}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      model: {
        provider: "openai",
        model: "gpt-4.1",
        temperature: 0.7,
        messages: []
      },
      transcriber: { provider: "deepgram", model: "nova-3", language: "en-US" },
      voice: { provider: "11labs", voiceId: "2BsEFcU7jUhLaUwV4h7l" }
    }

    try { vapi.start(interviewRecruiterPrompt) } 
    catch (error) { console.error('Error while starting vapi', error) }
  }

  return (
    <div className='p-20 lg:px-48 xl:px-56 bg-gray-100'>
      <h2 className='font-bold text-xl flex justify-between'>
        AI Interview Session
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-4'>
        <div className='bg-white p-20 rounded-lg border flex items-center justify-center flex-col'>
          <Image src='/robo.jpg' width={100} height={100} className='h-[200px] w-[200px] object-cover' alt='AI Recruiter' />
          <h2 className='font-sans font-bold'>AI Recruiter</h2>
        </div>
        <div>
          <div className='bg-white h-[400px] rounded-lg border flex items-center justify-center flex-col'>
            {interviewInfo?.username &&
              <h2 className='text-2xl bg-blue-600 rounded-full px-10 py-5 p-3 text-white flex items-center justify-center'>
                {interviewInfo?.username[0]}
              </h2>}
            <h2 className='font-sans font-bold mt-13'>{interviewInfo?.username}</h2>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-5 justify-center mt-7'>
        {/* <Mic className='rounded-full h-12 w-12 p-3 bg-gray-500 text-white cursor-pointer' /> */}
        <AlerrtConfirmation onStopInterview={() => {
          const vapi = vapiRef.current;
          if (!vapi) return;

          if (conversation?.length > 0) handleCallEnd();
          else toast("Conversation not captured yet");

        }}>
          {!loading?<Phone className='rounded-full h-12 w-12 bg-red-600 text-white p-3 cursor-pointer' />:<Loader2Icon className='animate-spin'/>}
        </AlerrtConfirmation>
      </div>
      <div className='flex justify-center items-center mt-4'>
        <Button onClick={onStartCall}>Start Interview</Button>
      </div>
    </div>
  )
}

export default StartInterview
