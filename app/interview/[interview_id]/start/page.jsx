'use client'
import React, { useContext, useEffect, useRef, useCallback } from 'react'
import { InterviewContext } from '@/context/InterviewContext'
import { Loader2Icon, Phone } from 'lucide-react'
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
    vapi.on('call-end', handleCallEnd)
    vapi.on('message', handleMessage)

    return () => {
      vapi.off('call-start', handleCallStart)
      vapi.off('call-end', handleCallEnd)
      vapi.off('message', handleMessage)
    }
  }, [handleCallStart, handleCallEnd, handleMessage])
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
    <div className='px-4 py-10 sm:px-8 lg:px-20 bg-gray-100 min-h-screen'>
      <h2 className='font-bold text-xl sm:text-2xl text-center sm:text-left'>
        AI Interview Session
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-7 mt-6'>
        <div className='bg-white p-10 sm:p-16 rounded-lg border flex items-center justify-center flex-col text-center'>
          <Image src='/robo.jpg' width={100} height={100} className='h-[180px] w-[180px] sm:h-[220px] sm:w-[220px] object-cover' alt='AI Recruiter' />
          <h2 className='font-sans font-bold mt-4'>AI Recruiter</h2>
        </div>
        <div>
          <div className='bg-white min-h-[280px] sm:min-h-[360px] rounded-lg border flex items-center justify-center flex-col gap-4'>
            {interviewInfo?.username &&
              <h2 className='text-2xl bg-blue-600 rounded-full px-10 py-5 text-white flex items-center justify-center'>
                {interviewInfo?.username[0]}
              </h2>}
            <h2 className='font-sans font-bold text-center text-lg'>{interviewInfo?.username}</h2>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-5 justify-center mt-7 flex-wrap'>
        <AlerrtConfirmation onStopInterview={() => {
          const vapi = vapiRef.current;
          if (!vapi) return;

          if (conversation?.length > 0) handleCallEnd();
          else toast("Conversation not captured yet");

        }}>
          {!loading?<Phone className='rounded-full h-12 w-12 bg-red-600 text-white p-3 cursor-pointer' />:<Loader2Icon className='animate-spin h-8 w-8'/>}
        </AlerrtConfirmation>
      </div>
      <div className='flex justify-center items-center mt-4'>
        <Button onClick={onStartCall} className='w-full sm:w-auto justify-center'>Start Interview</Button>
      </div>
    </div>
  )
}

export default StartInterview
