import React from 'react'
import DProvider from './provider'

function DashboardLayout({ children }) {
    return (
        <div className='bg-secondary'>
            <DProvider>
                <div className='p-2'>
                    {children}
                </div>
            </DProvider>
        </div>
    )
}
export default DashboardLayout