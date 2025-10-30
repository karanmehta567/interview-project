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
    <div className='p-5 rounded-xl bg-white border ml-1'>
        <div className='flex justify-between items-center'>
            <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
            <h2 className='text-sm'>{moment(interview?.created_at).format('MMMM Do YYYY')}</h2>
        </div>
        <h2 className='mt-3 font-semibold font-sans text-lg'>{interview?.jobPosition}</h2>
        <div className='flex justify-between'>
        <h2 className='mt-2 text-gray-400 font-sans'>{interview?.duration} Mins.</h2>
        {/* <span className='text-blue-600 font-sans'>{interview['interview-feedback']?.length}{''}{interview['interview-feedback']?.length===1 ? ' candidate':' candidates'} </span> */}
        </div>
       {!viewDetail? <div className='flex gap-3 w-full mt-3'>
            <Button variant='outline' className={'max-w-fit'} onClick={copyLink}><CopyIcon/>Copy Link</Button>
            <Button className={'max-w-fit'} onClick={onSend}><Send/>Send</Button>
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