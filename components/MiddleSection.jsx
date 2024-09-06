"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { assets } from '@/assets/assets';
import Link from 'next/link'; // Import Link

const MiddleSection = () => {
  const images = [
    assets.tata_curvv_ev_gold,
    assets.tata_harrier_white,
    assets.tata_punch_red,
    assets.tata_altroz_blue
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change the image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex flex-col items-center px-24 py-12 bg-white">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <div className="text-section max-w-md md:w-1/2 mb-6 md:mb-0">
          <h1 className="text-2xl font-bold mb-6 text-black">
            PERSONALIZE YOUR CAR PURCHASE WITH CUSTOM PROPOSALS
          </h1>
          <p className="text-xl mb-6 text-black">
            Experience a New Era of Gen AI to tailor car proposals to your unique needs.
          </p>
          <Link href="/signin"> {/* Wrap the button with Link */}
          <button className="px-12 py-4 text-lg bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105">
            Generate My Proposal Now
          </button>
          </Link>
          <div className="stats mt-6 flex gap-6 text-gray-800">
            <div>
              <p className="text-2xl font-bold">30%</p>
              <p className="text-sm">Increased Customization</p>
            </div>
            <div>
              <p className="text-2xl font-bold">250+</p>
              <p className="text-sm">Car Models Available</p>
            </div>
          </div>
        </div>
        <div className="image-section md:w-1/2">
          <div className="relative">
            <Image
              src={images[currentImageIndex]}
              alt="Rotating Image"
              width={500} // Reduced width
              height={400} // Reduced height
              className="w-full h-auto object-cover transition-transform duration-700 ease-in-out"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 text-center px-6"> {/* Increased margin-top */}
        <h2 className="text-3xl font-semibold mb-10 text-black">
          Discover a New Way to Customize Your Car Purchase
        </h2>
        <p className="text-lg text-black mb-6">
          Our cutting-edge platform offers an innovative approach to personalizing your car purchase. With advanced AI-driven proposals and a wide range of car models to choose from, you can easily find the perfect vehicle tailored to your needs. Enjoy seamless integration and customized recommendations that make your car-buying experience more efficient and enjoyable.
        </p>
        <Link href="/signin"> {/* Wrap the button with Link */}
          <button className="px-10 py-3 text-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105">
            Explore More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MiddleSection;
