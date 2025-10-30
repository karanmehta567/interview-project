'use client'
import React from 'react'
import InterviewHeader from './_components/InterviewHeader'
import { InterviewContext } from '@/context/InterviewContext'

function Layout({children}) {
    const [interviewInfo,setInterviewInfo]=React.useState()
  return (
    <InterviewContext.Provider value={{interviewInfo,setInterviewInfo}}>
        <div className='h-screen'>
            <InterviewHeader/>
            {children}
        </div>
    </InterviewContext.Provider>
  )
}

export default Layout