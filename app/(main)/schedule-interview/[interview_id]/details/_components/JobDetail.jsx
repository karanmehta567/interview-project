import { Calendar, Clock, Tag } from 'lucide-react'
import React from 'react'
import moment from 'moment'

function JobDetail({interviewDetail}) {
  const types = (() => {
    try {
      return JSON.parse(interviewDetail?.type || '[]');
    } catch {
      return [];
    }
  })();
  return (
    <div className='p-5 rounded-lg bg-white mt-5 border border-gray-100 space-y-4'>
        <h2 className='font-sans font-semibold text-lg'>{interviewDetail?.jobPosition}</h2>
        <div className='flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between'> 
         {interviewDetail?.duration&& <div>
            <h2 className='text-md text-gray-600 text-shadow-xs font-sans'>Duration</h2>
            <h2 className='flex text-md items-center gap-2 mt-1 font-sans'><Clock className='text-sm'/>{interviewDetail?.duration} Mins</h2>
          </div>}
          {interviewDetail?.type&&<div>
            <h2 className='text-md text-gray-600 text-shadow-xs font-sans'>Type</h2>
            <h2 className='flex text-md items-center gap-2 mt-1 font-sans'><Tag className='text-sm'/>
              {types.map((item, idx) => (
              <span key={idx} className="flex items-center gap-1 border rounded-full px-2 py-0.5 text-sm font-sans">
                {item}
              </span>
            ))}
            </h2>
          </div>}
          <div>
            <h2 className='text-md text-gray-600 text-shadow-xs font-sans'>Created on</h2>
            <h2 className='flex text-md items-center gap-2 mt-1 font-sans'><Calendar className='text-sm'/>{moment(interviewDetail?.created_at).format('MMMM Do YYYY')}</h2>
          </div>
        </div>
        <div className='mt-5'>
          <h2 className='text-md text-gray-600 text-shadow-xs font-sans'>Job Description</h2>
          {interviewDetail?.jobdescription&&<p className='mt-1 font-sans text-md leading-6'>{interviewDetail?.jobdescription}</p>}
        </div>
        <div className='mt-5 space-y-3'>
            <div>
              <h2 className='text-md text-gray-500 text-shadow-xs font-sans'>Interview Questions</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-3'>
                {interviewDetail?.questionList?.map((item,index)=>(
                  <div className='p-3 bg-amber-100 rounded-xl' key={index}>
                  <h2 className='text-md font-sans'>{index+1}: {item?.question}</h2>
                  </div>
                ))}
              </div>
            </div>
        </div>
    </div>
  )
}

export default JobDetail