import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";

function AccountSetting() {
  const { user } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Update your account information and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 h-full">
          <div className="md:col-span-4 col-span-5 w-full">
            <div className="flex gap-4 p-4 w-full *:w-full">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  First Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={user.firstName}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={user.lastName}
                />
              </div>
            </div>
            <div className="flex gap-4 p-4 w-full *:w-full">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={user.emailAddresses[0].emailAddress}
                />
              </div>
              <div className="relative ">
                <label className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                  Password
                  <Eye
                    onClick={() => setShowPassword(!showPassword)}
                    className=" cursor-pointer"
                    size={16}
                  />
                </label>
                <Input
                  type={showPassword ? "text" : `password`}
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <div className="border md:col-span-1 col-span-5 rounded-md">
            <div className="flex flex-col items-center justify-center h-full">
              <img
                src={user.imageUrl}
                alt={user.firstName}
                className="w-24 h-24 rounded-full"
              />
              <div className="mt-4">
                <Input type="file" id="file" className="hidden" />
                <label
                  htmlFor="file"
                  className="cursor-pointer text-sm border rounded px-2 py-1"
                >
                  Change Profile Picture
                </label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AccountSetting;
