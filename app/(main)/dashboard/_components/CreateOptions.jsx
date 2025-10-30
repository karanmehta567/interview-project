import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
    <div className='grid grid-cols-2 ml-3 gap-5'>
        <Link className='border border-gray-300 bg-white rounded-lg p-5 cursor-pointer' href={'/dashboard/create-interview'}>
            <Video className='p-3 text-primary bg-blue-100 h-12 w-12 rounded-lg'/>
            <h2 className='font-bold font-sans mt-2'>Create New Interview</h2>
            <p className='text-zinc-700 font-sans mt-2'>Create interviews with AI and schedule them with candidates</p>
        </Link>
        <div>
            <div className='border border-gray-300 bg-white rounded-lg p-5'>
            <Phone className='p-3 text-primary bg-blue-100 h-12 w-12 rounded-lg'/>
            <h2 className='font-bold font-sans mt-2'>Phone screening call</h2>
            <p className='text-zinc-700 font-sans mt-2'>Schedule phone screening call with candidates</p>
        </div>
        </div>
    </div>
  )
}

export default CreateOptions