'use client'

import { useUser } from '@/app/Provider'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'

function WelcomeContainer() {
  const { user } = useUser()
  const router = useRouter()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut({ scope: 'local' })
    if (error) {
      console.error('Error signing out:', error)
      return
    }
    router.push('/auth')
  }

  return (
    <div className='bg-white p-5 rounded-xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shadow-sm border border-gray-100'>
      <div className='space-y-1 text-center sm:text-left'>
        <h2 className='text-lg sm:text-xl font-bold font-sans'>
          Great to have you {user?.name}!
        </h2>
        <p className='text-zinc-600 font-sans text-sm sm:text-base'>
          AI driven interview platform that helps you mock interviews and speed up hiring.
        </p>
      </div>

      {/* Popover Trigger on Profile Image */}
      {user && (
        <Popover>
          <PopoverTrigger asChild>
            <Image
              src={user?.picture ?? '/avatar.png'}
              alt='user-image'
              width={48}
              height={48}
              className='rounded-full cursor-pointer border border-gray-200 hover:scale-105 transition h-12 w-12 object-cover mx-auto sm:mx-0'
            />
          </PopoverTrigger>
          <PopoverContent className="w-36 p-3">
            <Button
              variant="destructive"
              className="w-full text-sm"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

export default WelcomeContainer
