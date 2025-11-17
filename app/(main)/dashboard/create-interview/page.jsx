'use client'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import CreateBoxInterview from './_components/CreateBoxInterview'
import QuestionsList from './_components/QuestionsList'
import { toast } from 'sonner'
import InterviewLink from './_components/InterviewLink'

function CreateInterview() {
    const router=useRouter()
    const [step,setSteps]=React.useState(1)
    const [formData,setFormData]=React.useState()
    const [interviewid,setInterviewId]=React.useState()
    const onHandleInputChange=(field,value)=>{
        setFormData(prev=>({
            ...prev,
            [field]:value
        }))
    }
    function OnGoTonext(){
      if(!formData?.jobPosition || !formData?.jobdescription || !formData?.duration || !formData?.date || !formData?.type){
        toast('Please Enter all the required details')
        return;
      }
      setSteps(step+1)
    }
    const onCreateLink=(interview_id)=>{
      setInterviewId(interview_id)
      setSteps(step+1)
    }
  return (
    <div className='w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5'>
            <ArrowLeft onClick={()=>router.back()} className='cursor-pointer'/>
            <h2 className='font-sans text-2xl font-bold'>Create New Interview</h2>
        </div>
        <Progress value={ step*33.33} className='my-5'/>
        {step == 1 
            ? <CreateBoxInterview onHandleInputChange={onHandleInputChange} GoToNext={()=>OnGoTonext()}/> 
            : step == 2 
                ? <QuestionsList formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/> 
                : step == 3 
                    ? <InterviewLink interview_id={interviewid} formData={formData}/> 
                    : null
        }
    </div>
  )
}

export default CreateInterview