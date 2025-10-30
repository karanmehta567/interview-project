'use client'
import { useUser } from '@/app/Provider'
import { supabase } from '@/services/supabaseClient'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import JobDetail from './_components/JobDetail'
import Candidate from './_components/Candidate'

function Details() {
    const {interview_id}=useParams()
    const {user}=useUser()
    const [interviewList,setInterviewList]=useState()
    useEffect(()=>{
        user&&GetInterviewDetail()
    },[user])
    const GetInterviewDetail=async()=>{
        const {data,error}=await supabase.from('interviews')
            .select('jobPosition,duration,jobdescription,questionList,type,created_at,interview_id,interview-feedback(userEmail,userName,feedback,created_at)')
            .eq('interview_id',interview_id)
            .single()
            setInterviewList(data)
    }
   const feedback = interviewList?.['interview-feedback']?.[0];
  return (
    <div className='mt-2'>
      <h2 className='font-semibold text-2xl '>Interview Detail</h2>
      <JobDetail interviewDetail={interviewList}/>
      <Candidate interviewDetail={feedback}/>
    </div>
  )
}

export default Details