
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useState, useTransition} from "react";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/CardWrapper";
import { FormError, FormSuccess } from "./FormMessage";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser } from "@/redux/actions/userAction";

export const LoginSchema = z.object({
  email: z
    .string({ invalid_type_error: "Must be a string" })
    .email({ message: "Valid email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const LoginForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
 
  const dispatch = useAppDispatch();
  // const { isLoading, user} = useAppSelector((state: RootState) => state.user);
  
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition( async() => {
      try {
        const data = await dispatch(loginUser(values)).unwrap();
        setSuccess(data.message);
        if (data.user.userPreferences.enable2FA) {
          router.push("/verify2fa");
        }else {
          router.push("/dashboard");
        }
      } catch (error:any) {
        setError(error)
      }
    }
    )
  };



  return (
    <div className="flex justify-center items-center h-full">
      <CardWrapper
        label="Don't have an account? Register"
        Opplink="/register"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className=" flex flex-col gap-y-5">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 text-center"> Login Form</h1>
              <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormError message={error} />
                 <FormSuccess message={success} />
               <Button type="submit" className="cursor-pointer">Submit</Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
