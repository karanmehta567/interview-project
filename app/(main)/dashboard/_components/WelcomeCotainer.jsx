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
    <div className='bg-white p-5 rounded-xl flex justify-between items-center'>
      <div>
        <h2 className='text-lg font-bold font-sans'>
          Great to have you {user?.name}!
        </h2>
        <h2 className='text-zinc-600 font-sans'>
          AI driven interview platform which lets you mock your interviews and helps in hiring
        </h2>
      </div>

      {/* Popover Trigger on Profile Image */}
      {user && (
        <Popover>
          <PopoverTrigger asChild>
            <Image
              src={'/avatar.png'||user.picture}
              alt='user-image'
              width={40}
              height={40}
              className='rounded-full cursor-pointer border border-gray-200 hover:scale-105 transition'
            />
          </PopoverTrigger>
          <PopoverContent className="w-32 p-2">
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
