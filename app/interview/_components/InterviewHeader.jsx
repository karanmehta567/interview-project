import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm flex justify-center sm:justify-start'>
        <Image src={'/job.jpg'} alt='logo tag' width={200} height={80} className='w-32 sm:w-40 rounded-md object-cover'/>
    </div>
  )
}

export default InterviewHeader