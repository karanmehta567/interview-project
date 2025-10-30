"use client";
import { UserDetailContext } from "@/context/ContextProvider";
import { supabase } from "@/services/supabaseClient";
import React, { useContext, useEffect, useState } from "react";

function Provider({ children }) {
  const [user,setUser]=useState()
  useEffect(() => {
    const check = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const authuser = sessionData?.session?.user;
      if (authuser) {
        await checkNewUser(authuser);
      } else {
        console.error("No user signed in yet");
      }
    };
    check();
  }, []);

  const checkNewUser = async (user) => {
    try {
      const { data: existingUsers, error: selectError } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user.email);

      if (selectError) throw selectError;

      if (!existingUsers || existingUsers.length === 0) {
        const { data, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              name: user.user_metadata?.name,
              email: user.email,
              picture: user.user_metadata?.picture,
            },
          ]);
          setUser(data)
        if (insertError) throw insertError;
      } else {
        setUser(existingUsers[0])
      }
    } catch (error) {
      console.error("❌ Supabase error:", error?.message);
    }
  };

  return(
    <UserDetailContext.Provider value={{user,setUser}}>
  {children}
  </UserDetailContext.Provider>
  );
}

export const useUser=()=>{
  const context=useContext(UserDetailContext)
  return context
}
export default Provider;
