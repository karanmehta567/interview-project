import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <Link className='border border-gray-200 bg-white rounded-lg p-5 cursor-pointer transition hover:shadow-md flex flex-col gap-3' href={'/dashboard/create-interview'}>
            <Video className='p-3 text-primary bg-blue-100 h-12 w-12 rounded-lg'/>
            <h2 className='font-bold font-sans text-lg'>Create New Interview</h2>
            <p className='text-zinc-700 font-sans text-sm'>Create interviews with AI and schedule them with candidates.</p>
        </Link>
        <div className='border border-gray-200 bg-white rounded-lg p-5 flex flex-col gap-3'>
            <Phone className='p-3 text-primary bg-blue-100 h-12 w-12 rounded-lg'/>
            <h2 className='font-bold font-sans text-lg'>Phone screening call</h2>
            <p className='text-zinc-700 font-sans text-sm'>Schedule phone screenings and stay close to talent pipelines.</p>
        </div>
    </div>
  )
}

export default CreateOptions