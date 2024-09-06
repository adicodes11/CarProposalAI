"use client"; // Mark this component as a Client Component

import React from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets'; // Import the assets

const Header2 = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white p-4 flex items-center">
      {/* Logo */}
      <div className="fixed top-5 left-[80px]"> {/* Match the left value to Requirement1 */}
        <Image
          src={assets.logo}
          width={130}
          height={100}
          alt="logo.png"
          className="w-[130px] sm:w-auto"
        />
      </div>
    </header>
  );
};

export default Header2;
