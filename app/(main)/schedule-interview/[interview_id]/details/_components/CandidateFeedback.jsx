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

function CandidateFeedback({ detail }) {
    const ratings = detail?.feedback?.feedback?.rating || {}
    const communicationScore = ratings?.communication ?? ratings?.technicalKnowledge ?? 0
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'} className='text-blue-500'>View Report</Button>
            </DialogTrigger>
            <DialogContent className='max-w-xl'>
                <DialogHeader>
                    <DialogTitle>Feedback</DialogTitle>
                    <DialogDescription asChild>
                        <div className='space-y-5'>
                            <div className='flex items-center gap-3'>
                                <h2 className="font-semibold text-lg rounded-full px-4 py-2 bg-orange-200 w-fit">
                                    {detail?.userName?.[0]}
                                </h2>
                                <div className='flex flex-col'>
                                    <h2 className='font-bold font-sans text-black'>
                                        {detail?.userName}
                                    </h2>
                                    <p className='text-sm text-gray-500'>{detail?.userEmail}</p>
                                </div>
                            </div>
                            <div>
                                <h2 className='font-bold font-sans'>Skills Assessment</h2>
                                <div className='mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div>
                                        <h3 className='text-sm font-medium'>Technical Skills <span>{ratings?.technicalKnowledge}</span></h3>
                                        <Progress value={(ratings?.technicalKnowledge ?? 0) * 10} className='mt-1' />
                                    </div>
                                    <div>
                                        <h3 className='text-sm font-medium'>Communication <span>{communicationScore}</span></h3>
                                        <Progress value={communicationScore * 10} className='mt-1' />
                                    </div>
                                    <div className='sm:col-span-2'>
                                        <h3 className='text-sm font-medium'>Problem Solving <span>{ratings?.problemSolving}</span></h3>
                                        <Progress value={(ratings?.problemSolving ?? 0) * 10} className='mt-1' />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className='font-semibold font-sans '>Performance Summary</h2>
                                <div className='p-3 rounded-lg bg-orange-100 mt-2'>
                                    <p className='font-sans text-gray-700'>{detail?.feedback?.feedback?.summary}</p>
                                </div>
                            </div>
                            <div>
                                <h2 className='font-semibold font-sans'>Conclusion</h2>
                                <div className='rounded-lg bg-orange-100 mt-3 p-3'>
                                    <p className='font-sans text-gray-700 font-semibold'>{detail?.feedback?.feedback?.RecommendationMsg}</p>
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
