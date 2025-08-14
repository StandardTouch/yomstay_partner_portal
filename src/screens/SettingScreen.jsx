import React from "react";
import SecuritySettings from "./Setting/SecuritySettings";
import AccountSetting from "./Setting/AccountSetting";

function SettingScreen() {
  return (
    <div className="p-4 sm:p-8 w-full max-w-7xl mx-auto relative">
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-bold ">General Settings</h1>
      </div>
      <div className="">
        {/* <AccountSetting /> */}
        <SecuritySettings />
      </div>
    </div>
  );
}

export default SettingScreen;
