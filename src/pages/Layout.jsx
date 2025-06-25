import { UserButton, useUser } from '@clerk/clerk-react';
import React from 'react';
import Dashboaard from './dashboard';

const Layout = () => {
  const { user } = useUser();

  return (
    <Dashboaard/>
  );
};

export default Layout; 