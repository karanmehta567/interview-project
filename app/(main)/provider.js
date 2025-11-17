import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from './_components/AppSidebar'
import WelcomeCotainer from './dashboard/_components/WelcomeCotainer'

function DProvider({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className='w-full px-4 py-6 sm:px-6 lg:px-10'>
                <div className='flex flex-col gap-6'>
                    <div className='flex items-center gap-2 md:hidden'>
                        <SidebarTrigger className='md:hidden' />
                        <span className='text-sm font-semibold text-gray-600'>Menu</span>
                    </div>
                    <WelcomeCotainer />
                    <div className='space-y-6'>
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DProvider