import React from 'react';
import { Atom, Commet } from 'react-loading-indicators';

const Spinner = () => (
  <div className="flex justify-center items-center min-h-screen">
   {/* <Commet color="#C7E0A3" size="medium" text="" textColor="" /> */}
   <Atom color="#C7E0A3" size="medium" text="" textColor="" />
  </div>
);

export default Spinner; 