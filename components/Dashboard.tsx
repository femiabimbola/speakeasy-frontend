"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, User, Shield, Bell } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/actions/userAction";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import axios from "axios";


export const UserDashboard = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const fetchUser = async () => {
    try {
      console.log("called");
      const result = await dispatch(getUser()).unwrap();
      console.log(result);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    console.log("use effect is called")
    fetchUser();
  }, []);

  const { isLoading, user } = useAppSelector((state: any) => state.user);

  const set2fa = () => {
    if(!user.userPreferences.enable2FA) router.push('/setup2fa')
  }

  const signOut = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/`, )
      // setSuccess(data.message);
      router.push("/login")
    } catch (error: any) {
      // setError(error.response.data.message)
    }
  }

  if(!user) return <p> Loading...</p>
 
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-white">User Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* User Profile Card */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarFallback>
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email || "No email provided"}
                </p>
                <Badge
                  className="mt-2"
                  variant={user.role === "USER" ? "secondary" : "default"}
                >
                  {user.role}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings Card */}
          <Card className="col-span-2">
            <CardHeader className=" flex justify-between">
              <CardTitle className="text-lg">Account Settings</CardTitle>
              <Button className="cursor-pointer" onClick={signOut}> Logout</Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Email Verification</p>
                    <p className="text-sm text-gray-600">
                      {user.isEmailVerified
                        ? "Email is verified"
                        : "Email not verified"}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={user.isEmailVerified ? "default" : "destructive"}
                >
                  {user.isEmailVerified ? "Verified" : "Unverified"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">
                      {user.userPreferences.enable2FA
                        ? "2FA is enabled"
                        : "2FA is disabled"}
                    </p>
                  </div>
                </div>
                <Switch checked={user.userPreferences.enable2FA} onCheckedChange={set2fa} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">
                      {user.userPreferences.emailNotifications
                        ? "Notifications enabled"
                        : "Notifications disabled"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={user.userPreferences.emailNotifications}
                  // disabled
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
