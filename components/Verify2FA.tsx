"use client"

import { getUser } from "@/redux/actions/userAction";
import { Form,FormControl, FormField,
  FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "@/components/CardWrapper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { FormError, FormSuccess } from "./FormMessage";


const verifySchema = z.object({
  input: z.string().min(1, { message: "Password is required" }),
});

export const Verify = () => {

  const [otp, setOtp] = useState('')

  useEffect(() => {
    if (otp.length === 6) {
      handleVerify()
    }
  }, [otp])

  
  // const dispatch = useAppDispatch();

  // const fetchUser = async () => {
  //   try {
  //     const result = await dispatch(getUser()).unwrap();
  //   } catch (error) {
  //     console.error('Error fetching user:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser()
  // }, [])
  

  // const form = useForm<z.infer<typeof verifySchema>>({
  //   resolver: zodResolver(verifySchema),
  //   defaultValues: { input: "" },
  // });

const onSubmit = (values: z.infer<typeof verifySchema>) => {
  // handleTokenVerification(values)
}

const [error, setError] = useState<string | undefined>("");
const [success, setSuccess] = useState<string | undefined>("");
const router = useRouter();

  return (
    <div className="h-screen flex items-center justify-center">
    <CardWrapper>
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
    </CardWrapper>
  </div>
  )

};
