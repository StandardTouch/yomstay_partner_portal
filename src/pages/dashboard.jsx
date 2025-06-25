import { UserButton, useUser } from '@clerk/clerk-react';
import React from 'react'

import { Button } from '@/components/ui/button';
import { SidebarProvider, useSidebar } from '../components/ui/sidebar';
import { AppSidebar } from '../components/sidebar';
import { FaBars } from 'react-icons/fa6';


const Dashboard = () => {
    const { user } = useUser();
    const { toggleSidebar, open } = useSidebar();
  return (
    <div className="flex w-full min-h-screen ">
       <AppSidebar/>
      <div className='w-full'>

    <header className='h-16 flex justify-around fixed items-center w-full bg-gray-200'>
        <div>
            <button
              onClick={toggleSidebar}
              className="mr-4 p-2 rounded hover:bg-gray-300 focus:outline-none focus:ring"
              aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>
      <div className='md:text-3xl text-2xl justify-self-center'>Welcome to Partner portal</div>

         <UserButton signOutRedirectUrl="/login" />
    </header>
    </div>
  </div>
  )
}

export default function Dashboaard(){
  return (

    <SidebarProvider>
        <Dashboard/>
      </SidebarProvider>
  );
} 