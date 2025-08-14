import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
function SecuritySettings() {
  const [showSection, setShowSection] = useState({
    showPrivacy: false,
    showCancellation: false,
  });
  const policyOptions = [
    { label: "Purpose of Stay" },
    { label: "Check-in Time" },
    { label: "Check-out Time" },
    { label: "Early Check-in" },
    { label: "Late Check-out" },
  ];
  const policys = [
    { label: "Privacy Policy" },
    { label: "Cancellation Policy" },
    { label: "Couple Policy" },
    { label: "Refund Policy" },
    { label: "Payment Policy" },
    { label: "Smoking Policy" },
    { label: "Pet Policy" },
    { label: "Parking Policy" },
    { label: "Children Policy" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Security Settings</CardTitle>
        {/* <CardDescription>
          Update your account information and preferences.
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <div>
          <div className="mb-4 ml-1">
            <h2 className="text-lg font-semibold mb-2">Policies</h2>
            <p className="text-sm text-gray-500">
              Set policies for your hotel.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 *:h-fit *:border *:rounded-lg *:p-4 *:hover:shadow-xl *:hover:translate-y-[-10px] *:transition-all *:duration-300 ">
            {policys.map((policy, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <label className="flex justify-between text-sm font-medium ">
                  {policy.label}
                  <Switch
                    className="cursor-pointer"
                    onClick={() => {
                      const newShowSection = { ...showSection };
                      setShowSection({
                        ...newShowSection,
                        [policy.label.toLowerCase().replace(" ", "")]:
                          !newShowSection[
                            policy.label.toLowerCase().replace(" ", "")
                          ],
                      });
                    }}
                  />
                </label>
                {showSection[policy.label.toLowerCase().replace(" ", "")] && (
                  <Textarea
                    className="mt-2"
                    placeholder={`Enter ${policy.label}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="my-4 ml-1">
            <h2 className="text-lg font-semibold ">Others</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 *:hover:shadow-xl *:hover:translate-y-[-10px] *:transition-all *:duration-300 ">
            {policyOptions.map((option, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <label className="flex justify-between text-sm font-medium">
                  {option.label}
                  <Switch className="cursor-pointer" />
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      {/* <CardFooter></CardFooter> */}
    </Card>
  );
}

export default SecuritySettings;
