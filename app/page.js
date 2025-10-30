'use client'
import { useUser } from './Provider'
import { redirect } from 'next/navigation';

function page() {
    const { user } = useUser();
    if (user) {
        redirect('/dashboard')
    } else {
        redirect('/auth')
    }
}

export default page