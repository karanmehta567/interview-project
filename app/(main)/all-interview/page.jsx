'use client'
import { supabase } from '@/services/supabaseClient'
import React, { useEffect } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard'
import { Button } from '@/components/ui/button'
import { Plus, Video } from 'lucide-react'
import { useUser } from '@/app/Provider'
import Link from 'next/link'

function page() {
   const [interviewList,setInterviewList]=React.useState([])
    const {user}=useUser()
    useEffect(()=>{
        user&&GetInterviewList()
    },[user])
    const GetInterviewList=async()=>{
        let { data: interviews, error } = await supabase
            .from('interviews')
            .select('*')
            .eq('userEmail',user?.email)
            .order('id',{ascending:false})
        setInterviewList(interviews)
    }
    return (
    <div className='my-5 space-y-4'>
        <h2 className='font-sans font-semibold text-xl sm:text-2xl'>All Previously Created Interviews</h2>
        {
            interviewList?.length==0&&
            <div className='p-5 flex flex-col gap-3 items-center text-center'>
                <Video className='h-10 w-10 text-primary'/>
                <h2>You dont't have any past interviews records!</h2>
                <Link href={'/dashboard/create-interview'}> 
                    <Button><Plus/> Create now!</Button>
                </Link>
            </div>   
        }
        {
            interviewList&&
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                {interviewList.map(( interview,index)=>(
                    <InterviewCard key={index} interview={interview}/>
                ))}
            </div>
        }
    </div>
    )
}

export default page