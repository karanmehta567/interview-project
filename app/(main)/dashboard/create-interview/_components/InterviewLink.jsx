import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Calendar, Clock, CopyPlusIcon, Mail, MessageCircleIcon, Play} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewLink({interview_id,formData}) {
    const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id
    const GetTheInterview=()=>{
        return url
    }
    const CopyTheLink=async()=>{
        await navigator.clipboard.writeText(url)
        toast('Link copied')
    }
  return (
    <div className='space-y-6'>
        <div className='w-full flex flex-col items-center text-center gap-2'>
            <Image src={'/tick.png'} height={200} width={200} alt='check image' className='h-[100px] w-[100px] text-blue-500'/>
            <h2 className='font-bold text-lg font-sans'>AI Interview is ready!</h2>
        </div>
        <div className='flex justify-center items-center px-4 text-center'>
            <p className='font-medium font-sans'>Share this link with the candidate to start the interview.</p>
        </div>
        <div className='w-full p-5 sm:p-7 rounded-xl bg-white border border-gray-100 space-y-4'>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                <h2 className='font-bold font-sans'>Interview Link</h2>
                <h2 className='p-1 px-3 text-primary bg-blue-50 rounded-lg font-sans text-sm w-fit'>Valid for 7 days</h2>
            </div>
            <div className='flex flex-col gap-3 sm:flex-row'>
                <Input defaultValue={GetTheInterview()} disabled={true} className='flex-1'/>
                <Button onClick={()=>CopyTheLink()} className='cursor-pointer w-full sm:w-auto'><CopyPlusIcon/>Copy Link</Button>
            </div>
            <hr className='mt-2'/>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-7'>
                <h2 className='text-sm text-gray-800 flex items-center gap-2'><Clock className='h-4 w-4'/>{formData?.duration} minutes</h2>
                <h2 className='text-sm text-gray-800 flex items-center gap-2'><Calendar className='h-4 w-4'/>
                    Expires on {formData?.date ? new Date(formData.date).toLocaleDateString() : '—'}
                </h2>
            </div>
        </div>
        <div className='bg-white p-5 sm:p-7 rounded-lg w-full border border-gray-100 space-y-4'>
            <h2 className='font-sans font-bold'>Share Via</h2>
            <div className='flex flex-col sm:flex-row gap-4'>
                <Button className='flex items-center justify-center w-full sm:w-auto'><Mail/>Email</Button>
                <Button className='flex items-center justify-center w-full sm:w-auto'><MessageCircleIcon/>Whatsapp</Button>
            </div>
        </div>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <Link href={'/dashboard'} className='w-full sm:w-auto'>
            <Button variant={'black'} className='items-center cursor-pointer border border-b-2 bg-white w-full sm:w-auto'><ArrowLeft/>Back to Dashboard</Button>
            </Link>
            <Link href={'/interview'+'/'+interview_id} className='w-full sm:w-auto'>
                <Button className='items-center justify-center cursor-pointer w-full sm:w-auto'><Play/>Proceed to the Interview Stage</Button>
            </Link>
        </div>
    </div>
  )
}

export default InterviewLink