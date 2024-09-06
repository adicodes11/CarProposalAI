'use client';

import React from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const MiddleSection2 = () => {
  const features = [
    {
      icon: assets.icon_custom_proposals, // Replace with the appropriate asset
      title: "Custom Proposals",
      description: "Personalize your car purchase with AI-generated proposals tailored to your specific needs and preferences.",
    },
    {
      icon: assets.icon_car_models, // Replace with the appropriate asset
      title: "Wide Range of Car Models",
      description: "Choose from over 250 car models with options that suit all types of drivers and budgets.",
    },
    {
      icon: assets.icon_seamless_integration, // Replace with the appropriate asset
      title: "Seamless Integration",
      description: "Enjoy a smooth, hassle-free experience with advanced technology that integrates all your car-buying needs.",
    },
    {
      icon: assets.icon_financing_options, // Replace with the appropriate asset
      title: "Flexible Financing Options",
      description: "Get access to various financing options to make your car purchase more affordable and flexible.",
    },
    {
      icon: assets.icon_expert_guidance, // Replace with the appropriate asset
      title: "Expert Guidance",
      description: "Receive expert advice and guidance at every step, ensuring you make the best decision for your car purchase.",
    },
    {
      icon: assets.icon_customization, // Replace with the appropriate asset
      title: "Customization",
      description: "Customize every aspect of your car, from color to features, ensuring it fits your unique style.",
    },
  ];

  return (
    <div className="px-6 py-20 bg-white text-center">
      <h2 className="text-3xl font-bold text-black mb-10">
        Personalize Your Car Purchase with Advanced AI Proposals
      </h2>
      <p className="text-lg text-black mb-8">
        Discover how our platform revolutionizes the way you purchase cars. Tailored to your needs, every step of the way.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image src={feature.icon} alt={feature.title} width={50} height={50} />
            <h3 className="text-xl font-semibold text-black mt-4">{feature.title}</h3>
            <p className="text-lg text-black mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiddleSection2;
