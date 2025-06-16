"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export const Setup2fa = ({sessionToken}: {sessionToken: string | undefined}) => {
  const { loading, user} = useAppSelector((state: any) => state.user);
  const router = useRouter();
 
  // const getAccessToken = (): string | null => {
  //   // return getCookie('accessToken');
  // };
  if(!sessionToken ) router.push("/login");
   console.log(user)
  return (
    <div> 
      <p> The user is {user}</p>
      The Set Up 2FA
      
    </div>
    
  )
}