"use client";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/services/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setFullName] = React.useState("");
  const [error, setError] = React.useState("");
  const [session, setSession] = React.useState(undefined);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const router=useRouter()
  // --- SIGN UP ---
  const signUpNewUser = async ({ email, password,name }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    if(data?.user){
      const {error:insertError}=await supabase.from('Users').insert([{name:name,email:data.user.email}])
    }
    router.push('/dashboard')
  };

  // --- SIGN IN ---
  const signInUser = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      console.error("Error while signing in:", error);
      return;
    }
    router.push('/dashboard')
  };

  // --- HANDLE FORM SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      await signUpNewUser({ email, password,name });
    } else {
      await signInUser({ email, password });
    }
  };

  // --- SESSION HANDLING ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  const SignInwithGoogleProvider=async()=>{
    const {data,error}=await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{
        redirectTo:`${window.location.origin}/auth/callback`
      }
    })
    if(error){
      console.error('Signing erorr',error)
    }else{
      window.location.href=data.url
    }
  }
  // --- AUTH FORM ---
  return (
    <div className="min-h-screen flex items-center justify-center px-7">
      <div className="max-w-md w-full backdrop-blur-xl bg-white p-8 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/30 transition-all hover:shadow-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-black drop-shadow-md">
            {isSignUp ? "Create an Account" : "Welcome Back 👋"}
          </h2>
          <p className="text-sm text-gray-600">
            {isSignUp
              ? "Sign up to start your journey"
              : "Login to continue your journey"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          {isSignUp && (
            <div>
              <label className="text-black text-sm font-semibold">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                required
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Chandler Bing"
              />
            </div>
          )}

          <div>
            <label className="text-black text-sm font-semibold">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="text-black text-sm font-semibold">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}
          <div className="p-3 rounded-full bg-amber-100 text-black font-sans flex items-center justify-center border border-white">
            <FcGoogle/><h2 className="ml-2 cursor-pointer" onClick={SignInwithGoogleProvider}>
               {isSignUp ? "Sign in with Google" : "Log in with Google"}{" "}
            </h2>
          </div>
          <Button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-lg font-medium shadow-lg cursor-pointer"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        {/* Toggle mode */}
        <p className="text-sm text-center text-gray-600 mt-6">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-semibold underline hover:text-indigo-500 transition"
          >
            {isSignUp ? "Sign In" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
}
