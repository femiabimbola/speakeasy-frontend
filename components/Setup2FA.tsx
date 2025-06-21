"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Setup2fa = ({sessionToken}: {sessionToken: string | undefined}) => {
  
  const { loading, user} = useAppSelector((state: any) => state.user);
  const router = useRouter();

   useEffect(() => {
    if (!sessionToken) {
      router.push("/login");
    }
  }, [sessionToken]);

  console.log("Current User State:", user)
  return (
    <div> 
      <p> The user is {user}</p>
      The Set Up 2FA
      
    </div>
    
  )
}