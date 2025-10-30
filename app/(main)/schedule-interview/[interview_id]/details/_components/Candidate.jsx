import React from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import CandidateFeedback from './CandidateFeedback'

function Candidate({interviewDetail}) {
    return (
            <div>
            <div className="p-5 border rounded-xl mt-6 bg-white">
                <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <h2 className="font-semibold text-lg rounded-full px-4 py-2 bg-orange-200 w-fit">
                    {interviewDetail?.userName?.[0]}
                    </h2>
                    <h2 className='ml-3 font-bold font-sans text-black'>
                    {interviewDetail?.userName}
                    </h2>
                </div>
                    <CandidateFeedback detail={interviewDetail}/>
                </div>
                <div className='flex justify-between items-center'>
                <h2 className='text-md text-gray-400'>
                    Completed on: {moment(interviewDetail?.created_at).format('MMMM Do YYYY')}
                </h2>
                <div className='px-4.5 py-2 mt-2 bg-orange-200 rounded-full'>
                    <p className='text-black-600'>{interviewDetail?.feedback?.feedback?.rating?.technicalKnowledge}/10</p>
                </div>
                </div>
            </div>
            </div>
    )
}

export default Candidate
