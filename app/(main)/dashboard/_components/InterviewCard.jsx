import { Button } from '@/components/ui/button'
import { CopyIcon, Send } from 'lucide-react'
import moment from 'moment/moment'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({interview,viewDetail=false}) {
    const result=process.env.NEXT_PUBLIC_HOST_URL+"/"+interview?.interview_id
    const copyLink=()=>{
        navigator.clipboard.writeText(result)
        toast('Link copied!')
    }
    const onSend=()=>{
        window.location.href="mailto:xyz@gmail.com?subject=Interview Link & body=Link of the Interview"+result
    }
  return (
    <div className='p-5 rounded-xl bg-white border'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center gap-3'>
                <div className='h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold'>
                    {interview?.jobPosition?.[0]}
                </div>
                <div>
                    <h2 className='mt-1 font-semibold font-sans text-lg'>{interview?.jobPosition}</h2>
                    <p className='text-xs text-gray-500'>{moment(interview?.created_at).format('MMMM Do YYYY')}</p>
                </div>
            </div>
        </div>
        <div className='flex flex-wrap items-center justify-between gap-2 mt-3'>
        <h2 className='text-gray-500 font-sans text-sm'>{interview?.duration} mins</h2>
        </div>
       {!viewDetail? <div className='flex flex-col sm:flex-row gap-3 w-full mt-4'>
            <Button variant='outline' className='w-full sm:w-auto' onClick={copyLink}><CopyIcon/>Copy Link</Button>
            <Button className='w-full sm:w-auto' onClick={onSend}><Send/>Send</Button>
        </div>
        :
        <Link href={'/schedule-interview'+'/'+interview?.interview_id+'/details'}>
        <Button className='mt-5 w-full' variant={'outline'}>View Detail</Button>
        </Link>
        }
    </div>
  )
}

export default InterviewCard