"use client";
import { useEffect } from "react";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

    useEffect(() => {
        const handleSession = async () => {
        // Wait for Supabase to update session after redirect
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error("Session fetch error:", error);
            router.push("/");
            return;
        }

        if (data?.session) {
            // ✅ User logged in successfully
            router.push("/dashboard");
        } else {
            // If no session, redirect back to login
            router.push("/");
        }
        };

        handleSession();
    }, [router]);

  return (
        <div className="min-h-screen flex items-center justify-center text-lg text-gray-700">
        Redirecting you to Dashboard...
        </div>
  );
}
