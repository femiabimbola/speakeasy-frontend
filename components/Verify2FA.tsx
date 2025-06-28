"use client"

import { getUser } from "@/redux/actions/userAction";
import { Form,FormControl, FormField,
  FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: { input: "" },
  });

const onSubmit = (values: z.infer<typeof verifySchema>) => {
  // handleTokenVerification(values)
}

const [error, setError] = useState<string | undefined>("");
const [success, setSuccess] = useState<string | undefined>("");
const router = useRouter();

  return (
    <div className="h-screen flex items-center justify-center">
    <CardWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className=" flex flex-col gap-y-5">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 text-center"> Verify TOTP</h1>
            <FormField
                control={form.control}
                name="input"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>TOTP</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your TOTP"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             <FormError message={error} />
              <FormSuccess message={success} />
             <Button type="submit" className="cursor-pointer">Submit</Button>
             <div>
             </div>
          </div>
        </form>
      </Form>
      {/* <Button onClick={handleResetTOTP} className="cursor-pointer"> 
        Reset TOTP
      </Button> */}
    </CardWrapper>
  </div>
  )

};
