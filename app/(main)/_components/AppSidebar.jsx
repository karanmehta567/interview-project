'use client'
import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Constants } from '@/services/Constants'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function AppSidebar() {
    const path=usePathname()
return (
    <Sidebar className='bg-white'>
    <SidebarHeader className='flex flex-col items-start gap-4 p-4'>
        <Image src={'/job.jpg'} width={200} height={80} alt='logo image' className='w-full max-w-[160px] rounded-md object-cover'/>
        <Link href={'/dashboard/create-interview'} className='w-full'>
        <Button className='w-full text-sm sm:text-base cursor-pointer'><Plus/>Create New Interview</Button>
        </Link>
        </SidebarHeader>
        <SidebarContent className='px-2 pb-4'>
            <SidebarGroup>
                <SidebarContent>
                    <SidebarMenu>
                        {Constants.map((option,index)=>
                            <SidebarMenuItem key={index} className='p-1 font-sans'>
                                <SidebarMenuButton asChild className={`${path==option.path && 'bg-blue-50 text-primary'} p-4`}>
                                    <Link href={option.path} className='flex items-center gap-3'>
                                    <option.icon className={`${path==option.path ?'text-primary':'text-gray-600'}`}/>
                                    <span className={`text-sm font-medium ${path==option.path ?'text-primary':'text-gray-700'}`}>{option.name}</span> 
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                    </SidebarMenu>
                </SidebarContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className='p-4 text-xs text-gray-500'>
            Powered by AI Recruiter
        </SidebarFooter>
    </Sidebar>
)
}

export default AppSidebar