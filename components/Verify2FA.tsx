"use client";

import { getUser } from "@/redux/actions/userAction";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (otp.length === 6) {
      handleVerify();
    }
  }, [otp]);

  const handleVerify = async () => {
    setError("")
    try {
      
    } catch (error) {
      
    }
  };

  const onSubmit = (values: z.infer<typeof verifySchema>) => {

  };

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  return (
    <div className="h-screen flex items-center justify-center">
      <CardWrapper>
        <div className=" flex flex-col gap-y-8">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center">
            Activate Two Factor Authentication
          </h1>
          <FormError message={error} />
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              onComplete={handleVerify}
            >
              <InputOTPGroup>
                <InputOTPSlot className=" border-gray-700" index={0} />
                <InputOTPSlot className="border-gray-700" index={1} />
                <InputOTPSlot className=" border-gray-700" index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot className=" border-gray-700" index={3} />
                <InputOTPSlot className=" border-gray-700" index={4} />
                <InputOTPSlot className=" border-gray-700" index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      </CardWrapper>
    </div>
  );
};
