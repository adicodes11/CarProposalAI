"use client"; // Mark this component as a Client Component

import React from 'react';
import PropTypes from 'prop-types'; // For prop validation

const NavigationButtons = ({ onBackClick, onNextClick }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-8">
      {/* Container to center buttons horizontally */}
      <div className="flex gap-12"> {/* Adjusted the gap value to match Requirement1 page */}
        {/* Back Button */}
        <button
          onClick={onBackClick}
          className="flex items-center px-6 py-2 border border-blue-700 rounded-md text-blue-700 font-bold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back
        </button>

        {/* Next Button */}
        <button
          onClick={onNextClick}
          className="px-6 py-2 border border-red-700 rounded-md text-white font-bold bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Define PropTypes for validation
NavigationButtons.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
};

export default NavigationButtons;
