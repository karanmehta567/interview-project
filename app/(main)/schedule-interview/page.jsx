'use client'
import { useUser } from '@/app/Provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { Plus, Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard'

function ScheduleInterview() {
  const {user}=useUser()
  const [interviewList,setInterviewList]=useState()
    useEffect(()=>{
      user&&GetInterviewFeedback()
    },[user])

  const GetInterviewFeedback=async()=>{
    const {data:interviews,error}=await supabase.from('interviews')
    .select('jobPosition,duration,interview_id,interview-feedback(userEmail)')
    .eq('userEmail',user?.email)
    .order('id',{ascending:false})
    setInterviewList(interviews)
  }
  return (
    <div className='mt-5'>
      <h2 className='font-sans font-semibold'>Interview List with Feedback</h2>
        {
            interviewList?.length==0&&
            <div className='p-5 flex flex-col gap-3 items-center'>
                <Video className='h-10 w-10 text-primary'/>
                <h2>You dont't have any past interviews records!</h2>
                <Button><Plus/> Create now!</Button>
            </div>   
        }
        {
            interviewList&&
            <div className='grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
                {interviewList.map((interview,index)=>(
                    <InterviewCard key={index} interview={interview} viewDetail={true}/>
                ))}
            </div>
        }
    </div>
  )
}

export default ScheduleInterview