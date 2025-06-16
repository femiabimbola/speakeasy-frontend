"use client"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const Setup2fa = () => {
  const { loading, user} = useAppSelector((state: any) => state.user);
 
  // const getAccessToken = (): string | null => {
  //   // return getCookie('accessToken');
  // };

  return (
    <div> 
      <p> The user is {user}</p>
      The Set Up 2FA
      
    </div>
    
  )
}