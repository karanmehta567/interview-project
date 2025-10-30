import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from './_components/AppSidebar'
import WelcomeCotainer from './dashboard/_components/WelcomeCotainer'

function DProvider({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className='w-full p-10'>
                {/* <SidebarTrigger /> */}
                <WelcomeCotainer />
                {children}
            </div>
        </SidebarProvider>
    )
}

export default DProvider