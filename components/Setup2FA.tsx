"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/actions/userAction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CardWrapper from "./CardWrapper";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import axios from "axios";

export const Setup2fa = ({
  sessionToken,
}: {
  sessionToken: string | undefined;
}) => {
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state: any) => state.user);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const TwoFASchema = z.object({
    input: z.string({ invalid_type_error: "Must be a string" }),
  });

  const router = useRouter();

  const fetchUser = async () => {
    try {
      const result = await dispatch(getUser()).unwrap();
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchQRcode = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/2fa/setup`,
      { withCredentials: true }
    );
    setResponse(data.data);
  };

  const onSubmit = (values: z.infer<typeof TwoFASchema>) => {};

  const form = useForm<z.infer<typeof TwoFASchema>>({
    resolver: zodResolver(TwoFASchema),
    defaultValues: { input: "" },
  });

  useEffect(() => {
    if (!sessionToken) {
      router.push("/login");
    }

    fetchUser();
  }, [sessionToken, fetchQRcode]);

  return (
    <div className="flex justify-center items-center h-full">
      <CardWrapper>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className=" flex flex-col gap-y-5">
              <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center">
                Activate Two Factor Authentication, 
              </h1>
              <div className="mx-auto">
                {response && (
                  <h3> Scan with your authenticator application </h3>
                )}
                {response && (
                  <Image
                    src={response}
                    alt="2FA QR Code"
                    width={240}
                    height={240}
                    className="mx-auto"
                  />
                )}
              </div>
              {message && <p className="text-gray-900">{message}</p>}
              <Button type="submit" className="cursor-pointer">
                Continue to Verification
              </Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
