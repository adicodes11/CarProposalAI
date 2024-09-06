// Add this directive at the top of the file
'use client';

import React from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Header({ isLoggedIn, onLogoutClick }) {
  const router = useRouter();

  // Function to handle navigation
  const handleLoginClick = () => {
    if (isLoggedIn) {
      onLogoutClick(); // Log out if already logged in
    } else {
      router.push('/signin'); // Navigate to signin page if not logged in
    }
  };

  return (
    <div className='py-5 px-5 md:px-12 lg:px-20'>
      <div className='flex justify-between items-center'>
        {/* Logo or Title */}
        <Image src={assets.logo} width={150} height={100} alt='logo.png' className='w-[130px] sm:w-auto' />
        
        {/* Button Container */}
        <div className='flex items-center gap-4'>
          <Link href='/'>
            <span className='font-bold text-lg py-1 px-3 text-gray-800 hover:text-blue-500 transition-colors duration-300 cursor-pointer'>
              Home
            </span>
          </Link>
          <Link href='/about'>
            <span className='font-bold text-lg py-1 px-3 text-gray-800 hover:text-blue-500 transition-colors duration-300 cursor-pointer'>
              About Us
            </span>
          </Link>
          <Link href='/contact'>
            <span className='font-bold text-lg py-1 px-3 text-gray-800 hover:text-blue-500 transition-colors duration-300 cursor-pointer'>
              Contact Us
            </span>
          </Link>
          <Link href='/help'>
            <span className='font-bold text-lg py-1 px-3 text-gray-800 hover:text-blue-500 transition-colors duration-300 cursor-pointer'>
              Help
            </span>
          </Link>
          <button
            className='font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black text-black hover:bg-black hover:text-white transition-colors duration-300'
            onClick={handleLoginClick}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
