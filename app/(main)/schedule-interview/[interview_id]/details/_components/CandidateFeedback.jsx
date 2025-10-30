import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

function CandidateFeedback({detail}) {
    return (
    <Dialog>
    <DialogTrigger asChild>
        <Button variant={'outline'} className='text-blue-400'>View Report</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Feedback</DialogTitle>
        <DialogDescription asChild>
          <div>
            <div className='flex items-center'>
                    <h2 className="font-semibold text-lg rounded-full px-4 py-2 bg-orange-200 w-fit">
                    {detail?.userName?.[0]}
                    </h2>
                    <div className='flex flex-col'>
                        <h2 className='ml-3 font-bold font-sans text-black'>
                        {detail?.userName}
                        </h2>
                        <h2 className='ml-3 font-bold font-sans text-gray-500 flex justify-end'>
                        {detail?.userEmail}
                        </h2>
                    </div>
            </div>
            <div className='mt-5'>
                <h2 className='font-bold font-sans'>Skills Assesment</h2>
                <div className='mt-3 grid grid-cols-3 gap-8'>
                    <div>
                        <h2>Technical Skills <span>{detail?.feedback?.feedback?.rating?.technicalKnowledge}</span></h2>
                        <Progress value={detail?.feedback?.feedback?.rating?.technicalKnowledge*10} className='mt-1'/>
                    </div>
                    <div>
                        <h2>Communication <span>{detail?.feedback?.feedback?.rating?.technicalKnowledge}</span></h2>
                        <Progress value={detail?.feedback?.feedback?.rating?.technicalKnowledge*10} className='mt-1'/>
                    </div>
                    <div>
                        <h2>Problem Solving <span>{detail?.feedback?.feedback?.rating?.problemSolving}</span></h2>
                        <Progress value={detail?.feedback?.feedback?.rating?.problemSolving*10} className='mt-1'/>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <h2 className='font-semibold font-sans '>Performance Summary</h2>
                <div className='p-3 rounded-lg bg-orange-200 mt-2'>
                    <p className='font-sans text-gray-700 -mt-2'>{detail?.feedback?.feedback?.summary}</p>
                </div>
            </div>
            <div className='mt-5'>
                <h2 className='font-semibold font-sans'>Conclusion</h2>
                <div className='rounded-lg bg-orange-200 mt-3 p-3'>
                <p className='font-sans text-gray-700 -mt-2 font-bold'>{detail?.feedback?.feedback?.RecommendationMsg}</p>
                </div>
            </div>  
        </div>
        </DialogDescription>
        </DialogHeader>
    </DialogContent>
</Dialog>
    )
}

export default CandidateFeedback