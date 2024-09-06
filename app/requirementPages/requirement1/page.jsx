"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import Footer2 from '@/components/Footer2';

const Requirement1 = () => {
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const router = useRouter();

  // Assume userId is fetched from session or authentication context
  const userId = '66d5c93e711f3d3f93968f94';  // Example hardcoded userId

  // Load previous selections from sessionStorage
  useEffect(() => {
    const savedBudget = sessionStorage.getItem('budget');
    const savedLocation = sessionStorage.getItem('location');
    if (savedBudget) setBudget(savedBudget);
    if (savedLocation) {
      setLocation(savedLocation);
      setShowLocation(true);
    }
  }, []);

  const handleBudgetChange = (selectedBudget) => {
    setBudget(selectedBudget);
    setShowLocation(true);
    sessionStorage.setItem('budget', selectedBudget); // Save to sessionStorage
  };

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);
    sessionStorage.setItem('location', selectedLocation); // Save to sessionStorage
  };

  const handleBack = () => {
    router.push('/welcome');
  };

  const handleNext = async () => {
    if (!budget || !location) {
      alert('Please select both budget and location.');
      return;
    }

    const [minBudgetStr, maxBudgetStr] = budget.split(' - ');
    const minBudget = parseInt(minBudgetStr.replace('₹', '').replace(',', '').replace('Lakh', '')) * 100000;
    const maxBudget = maxBudgetStr === 'and above'
      ? Number.MAX_SAFE_INTEGER
      : parseInt(maxBudgetStr.replace('₹', '').replace(',', '').replace('Lakh', '')) * 100000;

    try {
      const response = await fetch('/api/requirementPagesRoutes/requirement1Route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budgetMin: minBudget, budgetMax: maxBudget, location, userId }),  // Include userId
      });

      if (response.ok) {
        router.push('/requirementPages/requirement2');
      } else {
        alert('Failed to submit your data. Please check the console for details.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-between h-screen relative">
      <div className="absolute top-5 left-[80px]">
        <Image
          src={assets.logo}
          width={130}
          height={100}
          alt="logo.png"
          className="w-[130px] sm:w-auto"
        />
      </div>
      <div className="flex flex-col flex-grow justify-center">
        <div className="mb-11 w-full max-w-lg text-center">
          <h1 className="text-2xl font-bold mb-6">What is your budget range for the car?</h1>
          <div className="grid grid-cols-2 gap-4">
            {[
              "₹5 Lakh - ₹7 Lakh",
              "₹7 Lakh - ₹10 Lakh",
              "₹10 Lakh - ₹13 Lakh",
              "₹13 Lakh - ₹16 Lakh",
              "₹16 Lakh - ₹20 Lakh",
              "₹20 Lakh - ₹25 Lakh",
              "₹25 Lakh - ₹30 Lakh",
              "₹30 Lakh and above",
            ].map((option) => (
              <button
                key={option}
                onClick={() => handleBudgetChange(option)}
                className={`px-4 py-3 border rounded-md ${
                  budget === option ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showLocation && (
          <div className="mb-4 w-full max-w-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Please select your location of buying the car:</h2>
            <select
              value={location}
              onChange={handleLocationChange}
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Location</option>
              {[
                "Mumbai",
                "Bangalore",
                "Delhi",
                "Pune",
                "Navi Mumbai",
                "Hyderabad",
                "Ahmedabad",
                "Chennai",
                "Kolkata",
                "Nagpur",
              ].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex w-full max-w-lg justify-between mt-4">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-100 text-blue-600 border border-blue-600 rounded-md"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Next
          </button>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default Requirement1;
