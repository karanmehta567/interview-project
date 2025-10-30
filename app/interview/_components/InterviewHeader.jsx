import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm'>
        <Image src={'/job.jpg'} alt='logo tag' width={200} height={100} className='w=[140px]'/>
    </div>
  )
}

export default InterviewHeader