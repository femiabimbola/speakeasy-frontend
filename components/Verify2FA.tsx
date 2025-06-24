"use client"

import { getUser } from "@/redux/actions/userAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

export const Verify = () => {
  const dispatch = useAppDispatch();

  const fetchUser = async () => {
    try {
      const result = await dispatch(getUser()).unwrap();
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser()
  }, [])
  
  const { isLoading, user} = useAppSelector((state: RootState) => state.user)

  return (
    <div>
       <p className="text-white"> The verify 2fa is {user?.firstName}</p>;
    </div>
  )

};
