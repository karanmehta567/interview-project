'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InterviewContext } from '@/context/InterviewContext'
import { supabase } from '@/services/supabaseClient'
import { CircleAlert, Clock, Loader2Icon, VideoIcon } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { toast } from 'sonner'

function Interview() {
    const { interview_id } = useParams()
    const [interviewData, setInterviewData] = React.useState();
    const [username,setUsername]=React.useState()
    const [loading,setLoading]=React.useState(false)
    const [email,setEmail]=React.useState()
    const {interviewInfo,setInterviewInfo}=useContext(InterviewContext)
    const router=useRouter()
    useEffect(() => {
        interview_id && GetUserInfo()
    }, [interview_id])

const GetUserInfo = async () => {
    setLoading(true)
    try {
        let { data: interviews } = await supabase
            .from('interviews')
            .select('jobPosition, type, jobdescription, duration')
            .eq('interview_id', interview_id)
        setInterviewData(interviews?.[0])
        setLoading(false)
        if(interviews?.length==0){
            toast('Incorrect interview id')
            return;
        }
    } catch (error) {
        setLoading(false)
        toast('Unable to get interview-id')
    }
}
const onJoinNow=async()=>{
    setLoading(true)
    let { data: interviews, error } = await supabase
        .from('interviews')
        .select("*")
        .eq('interview_id',interview_id)
    setInterviewInfo({
        username:username,
        interviewData:interviews[0],
        email:email
    }
    )
    router.push('/interview'+"/"+interview_id+'/start')
    setLoading(false)
}

return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-100 flex flex-col items-center">
        {/* Header Section */}
        <Image
            src="/job.jpg"
            alt="logo"
            width={160}
            height={80}
            className="rounded-md mb-4"
        />

        <h2 className="font-bold text-2xl text-gray-800 text-center font-sans">
        AI Assisted Interview Platform
        </h2>

        <Image
            src="/iluu.jpg"
            alt="illustration"
            width={400}
            height={400}
            className="w-64 sm:w-80 mt-6"
        />

        {/* Job Info */}
        <div className="text-center mt-4">
        <h3 className="font-semibold text-xl text-gray-800">
            {interviewData?.jobPosition || 'Loading...'}
        </h3>
        <p className="text-gray-500 flex items-center justify-center gap-1 mt-1 text-sm">
            <Clock className="h-4 w-4" />
            {interviewData?.duration || '--'} Minutes
        </p>
        </div>

        {/* Input Section */}
        <div className="w-full mt-6">
        <label className="block font-semibold text-gray-700 mb-2">
            Enter your full name
        </label>
        <Input
            placeholder="e.g. Ted Mosby"
            className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition"
            onChange={(event)=>setUsername(event.target.value)}
        />
        <label className="block font-semibold text-gray-700 mb-2 mt-2">
            Enter your E-mail
        </label>
        <Input
            placeholder="ted.mosby@himym.com"
            className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition"
            onChange={(event)=>setEmail(event.target.value)}
        />
        </div>

        {/* Alert Box */}
        <div className="w-full mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
            <CircleAlert className="text-blue-500 h-5 w-5" />
            <h2 className="font-bold text-blue-700 font-sans">Before you begin</h2>
        </div>
        <ul className="space-y-1 text-sm text-blue-700 font-medium">
            <li>• Ensure a stable internet connection</li>
            <li>• Check your camera and microphone</li>
            <li>• Find a quiet environment</li>
        </ul>
        </div>

        {/* Join Button */}
        <Button className="mt-6 w-full font-bold text-base py-5 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition cursor-pointer" disabled={loading ||!username} onClick={()=>onJoinNow()}>
            <VideoIcon className="h-5 w-5" />
            {loading&&<Loader2Icon/>}
            Join Interview
        </Button>
    </div>
    </div>
)
}

export default Interview
