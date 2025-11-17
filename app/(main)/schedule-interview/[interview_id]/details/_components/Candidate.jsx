import React from 'react'
import moment from 'moment'
import CandidateFeedback from './CandidateFeedback'

function Candidate({interviewDetail}) {
    if(!interviewDetail){
        return null
    }
    return (
            <div>
            <div className="p-5 border rounded-xl mt-6 bg-white space-y-4">
                <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                <div className='flex items-center gap-3'>
                    <h2 className="font-semibold text-lg rounded-full px-4 py-2 bg-orange-200 w-fit">
                    {interviewDetail?.userName?.[0]}
                    </h2>
                    <div>
                    <h2 className='font-bold font-sans text-black'>
                    {interviewDetail?.userName}
                    </h2>
                    <p className='text-sm text-gray-500'>{interviewDetail?.userEmail}</p>
                    </div>
                </div>
                    <CandidateFeedback detail={interviewDetail}/>
                </div>
                <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <h2 className='text-md text-gray-400'>
                    Completed on: {moment(interviewDetail?.created_at).format('MMMM Do YYYY')}
                </h2>
                <div className='px-4 py-2 bg-orange-200 rounded-full text-sm font-semibold text-gray-800 w-fit'>
                    {(interviewDetail?.feedback?.feedback?.rating?.technicalKnowledge ?? '—')}/10 overall
                </div>
                </div>
            </div>
            </div>
    )
}

export default Candidate
