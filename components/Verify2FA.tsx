"use client"

import { getUser } from "@/redux/actions/userAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

export const Verify = () => {
  const dispatch = useAppDispatch();
  const { isLoading, user} = useAppSelector((state: RootState) => state.user)

  console.log("Current User State:", user)

  const fetchUser = async () => {
    try {
      const result = await dispatch(getUser()).unwrap();
      console.log('User data:', result);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser()
  }, [])
  


  return (
    <div>
       <p className="text-white"> The verify 2fa is {user?.firstName}</p>;
    </div>
  )

};
