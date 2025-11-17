'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient' // your Supabase client

export default function ProtectedRoute({ children }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)

useEffect(() => {
    // Get current session on load
    const getSession = async () => {
        const { data, error } = await supabase.auth.getSession()
        if (error) console.error(error)
        if (!data.session) {
            router.replace('/auth')
        } else {
            setSession(data.session)
        }
        setLoading(false)
        }

    getSession()
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
            router.replace('/auth')
        } else {
            setSession(session)
        }
        })

        return () => {
        listener.subscription.unsubscribe()
        }
    }, [router])

    if (loading) {
        return (
        <div className="flex items-center justify-center h-screen text-lg font-semibold">
            Loading...
        </div>
        )
    }

return <>{session && children}</>
}
