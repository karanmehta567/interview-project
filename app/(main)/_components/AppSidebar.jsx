'use client'
import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Constants, signOutWithGoogleProvider } from '@/services/Constants'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function AppSidebar() {
    const path=usePathname()
return (
    <Sidebar>
    <SidebarHeader className='flex items-center'>
        <Image src={'/job.jpg'} width={200} height={200} alt='logo image'/>
        <Link href={'/dashboard/create-interview'}>
        <Button className='w-full mt-5'><Plus/>Create New Interview</Button>
        </Link>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarContent>
                    <SidebarMenu>
                        {Constants.map((option,index)=>
                            <SidebarMenuItem key={index} className='p-1 font-sans'>
                                <SidebarMenuButton asChild className={`${path==option.path && 'bg-blue-50'} p-5`}>
                                    <Link href={option.path}>
                                    <option.icon className={`${path==option.path &&'text-primary'}`}/>
                                    <span className={`text-[16px] ${path==option.path &&'text-primary'}`}>{option.name}</span> 
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                    </SidebarMenu>
                </SidebarContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
    </Sidebar>
)
}

export default AppSidebar