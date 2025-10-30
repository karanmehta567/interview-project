import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Calendar, Clock, CopyPlusIcon, List, Mail, MessageCircleIcon, Play} from 'lucide-react'
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
    <div>
        <div className='w-full flex justify-center items-center'>
            <Image src={'/tick.png'} height={200} width={200} alt='check image' className='h-[100px] w-[100px] text-blue-500'/>
            <h2 className='font-bold text-lg font-sans'>AI Interview is ready!</h2>
        </div>
        <div className='flex justify-center items-center'>
            <p className='font-medium font-sans'>Share this Link with the candidate to start the interview</p>
        </div>
        <div className='w-full p-7 mt-6 rounded-xl bg-white'>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold font-sans'>Interview Link</h2>
                <h2 className='p-1 px-3 text-primary bg-blue-50  rounded-lg font-sans'>Valid for 7 days</h2>
            </div>
            <div className='mt-3 flex gap-4'>
                <Input defaultValue={GetTheInterview()} disabled={true}/>
                <Button onClick={()=>CopyTheLink()} className='cursor-pointer'><CopyPlusIcon/>Copy Link</Button>
            </div>
            <hr className='mt-5'/>
            <div className='flex gap-7 mt-3'>
                <h2 className='text-sm text-gray-800 flex items-center gap-2'><Clock className='h-4 w-4'/>{formData?.duration} minutes</h2>
                <h2 className='text-sm text-gray-800 flex items-center gap-2'><Calendar className='h-4 w-4'/>
                    Expires on {formData?.date ? new Date(formData.date).toLocaleDateString() : '—'}
                </h2>
            </div>
        </div>
        <div className='mt-7 bg-white p-7 rounded-lg w-full'>
            <h2 className='font-sans font-bold'>Share Via</h2>
            <div className='flex gap-7 mt-4'>
                <Button className='flex items-center justify-center'><Mail/>Email</Button>
                <Button className='flex items-center justify-center'><MessageCircleIcon/>Whatsapp</Button>
            </div>
        </div>
        <div className='flex w-full gap-5 justify-between mt-4'>
            <Link href={'/dashboard'}>
            <Button variant={'black'} className='items-center cursor-pointer border border-b-2 bg-white'><ArrowLeft/>Back to Dashboard</Button>
            </Link>
            <Link href={'/interview'+'/'+interview_id}>
                <Button className='items-center justify-center cursor-pointer'><Play/>Proceed to the Interview Stage</Button>
            </Link>
        </div>
    </div>
  )
}

export default InterviewLink