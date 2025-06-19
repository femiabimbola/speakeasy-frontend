"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export const Verify = () => {
  const { isLoading, user} = useAppSelector((state: RootState) => state.user)

  console.log("Current User State:", user)
  return (
    <div>
       <p className="text-white"> The verify 2fa is {user?.firstName}</p>;
    </div>
  )

};
