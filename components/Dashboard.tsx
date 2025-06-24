'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, User, Shield, Bell } from 'lucide-react';

const user = {
  email: 'jane.doe@example.com',
  firstName: 'Jane',
  lastName: 'Doe',
  isEmailVerified: true,
  role: 'USER',
  userPreferences: {
    enable2FA: true,
    emailNotifications: false,
    twoFactorSecret: null,
  },
};

export const UserDashboard = () =>{
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>

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
                  {user.email || 'No email provided'}
                </p>
                <Badge
                  className="mt-2"
                  variant={user.role === 'USER' ? 'secondary' : 'default'}
                >
                  {user.role}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings Card */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Email Verification</p>
                    <p className="text-sm text-gray-600">
                      {user.isEmailVerified
                        ? 'Email is verified'
                        : 'Email not verified'}
                    </p>
                  </div>
                </div>
                <Badge variant={user.isEmailVerified ? 'default' : 'destructive'}>
                  {user.isEmailVerified ? 'Verified' : 'Unverified'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">
                      {user.userPreferences.enable2FA
                        ? '2FA is enabled'
                        : '2FA is disabled'}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={user.userPreferences.enable2FA}
                  disabled
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">
                      {user.userPreferences.emailNotifications
                        ? 'Notifications enabled'
                        : 'Notifications disabled'}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={user.userPreferences.emailNotifications}
                  disabled
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}