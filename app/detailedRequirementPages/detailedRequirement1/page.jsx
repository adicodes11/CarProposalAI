  "use client";

  import React, { useState, useEffect } from "react";
  import Image from "next/image";
  import { assets } from "@/assets/assets";
  import Footer2 from "@/components/Footer2";
  import { useRouter } from "next/navigation";

  const DetailedRequirement1 = () => {
    const router = useRouter();

    const sections = [
      "Car Power",
      "Drive Modes",
      "Exterior Design",
      "Fuel Tank & Boot Space",
      "Safety & Features",
    ];

    const [answers, setAnswers] = useState({
      enginePower: "",
      batteryCapacity: "",
      driveModes: "",
      exteriorDesign: [],
      groundClearance: "",
      fuelTankCapacity: "",
      bootSpace: "",
      safetyFeatures: [],
      entertainmentFeatures: [],
      comfortFeatures: [],
      drivingAssistanceFeatures: [],
      drivingExperience: "",
    });

    const [currentSection, setCurrentSection] = useState(0); // Active section
    const [progress, setProgress] = useState(0); // Progress percentage
    const [fuelType, setFuelType] = useState(""); // Fuel type from session storage

    useEffect(() => {
      // Fetch fuel type from sessionStorage and restore answers
      const storedFuelType = sessionStorage.getItem("fuelType");
      if (storedFuelType) setFuelType(storedFuelType);

      const storedAnswers = JSON.parse(sessionStorage.getItem("detailedAnswers")) || {};
      setAnswers(storedAnswers);
      calculateProgress();
    }, []);

    useEffect(() => {
      // Store answers to sessionStorage whenever changes are made
      sessionStorage.setItem("detailedAnswers", JSON.stringify(answers));
      calculateProgress();
    }, [answers]);

    const handleAnswerChange = (field, value) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [field]: value,
      }));
    };

    const handleCheckboxChange = (field, value) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [field]: prevAnswers[field].includes(value)
          ? prevAnswers[field].filter((item) => item !== value)
          : [...prevAnswers[field], value],
      }));
    };

    const calculateProgress = () => {
      let filledSections = 0;
      const requiredFields = [
        answers.enginePower || answers.batteryCapacity,
        answers.driveModes,
        answers.exteriorDesign.length > 0,
        answers.groundClearance,
        answers.fuelTankCapacity,
        answers.bootSpace,
        answers.safetyFeatures.length > 0,
        answers.entertainmentFeatures.length > 0,
        answers.comfortFeatures.length > 0,
        answers.drivingAssistanceFeatures.length > 0,
        answers.drivingExperience,
      ];

      filledSections = requiredFields.filter((field) => field).length;
      const progressPercent = (filledSections / requiredFields.length) * 100;
      setProgress(progressPercent);
    };

    const handleSubmit = async () => {
      const body = {
        ...answers,
        fuelType: sessionStorage.getItem("fuelType"),
        budgetMin: sessionStorage.getItem("budgetMin"),
        budgetMax: sessionStorage.getItem("budgetMax"),
        location: sessionStorage.getItem("location"),
        bodyStyle: JSON.parse(sessionStorage.getItem("bodyStyle")) || [],
        transmissionType: sessionStorage.getItem("transmissionType"),
        drivingRange: sessionStorage.getItem("drivingRange"),
        seatingCapacity: sessionStorage.getItem("seatingCapacity"),
        primaryUse: sessionStorage.getItem("primaryUse"),
        carColor: sessionStorage.getItem("carColor"),
      };

      try {
        const response = await fetch(
          "/api/detailedRequirementRoutes/detailedRequirement1Route",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Data submitted successfully", data);
          alert("Your details have been submitted successfully!");
        } else {
          const errorData = await response.json();
          console.error("Error submitting data", errorData);
          alert("Error submitting your details. Please try again.");
        }
      } catch (error) {
        console.error("Network error while submitting data", error);
        alert("A network error occurred. Please try again.");
      }
    };

    const handleNext = async () => {
      if (currentSection === 4) {
        await handleSubmit();
        router.push("/detailedRequirementPages/detailedRequirement2"); // Redirect to detailedRequirement2 page
      } else {
        const nextSection = currentSection + 1;
        setCurrentSection(nextSection);
        if (nextSection === 4) {
          await handleSubmit(); // Submit data when moving to the last section
        }
      }
    };

    const handleBack = () => {
      if (currentSection > 0) {
        setCurrentSection(currentSection - 1);
      }
    };

    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex">
          {/* Blue Side Frame */}
          <div
            className="w-1/6 bg-blue-600 text-white p-8 flex flex-col justify-between"
            style={{ height: "calc(100vh)" }}
          >
            {/* Larger Icon */}
            <div className="flex items-center justify-center mb-6">
              <Image src={assets.logo} width={150} height={100} alt="logo.png" />
            </div>

            {/* Section Headings */}
            <div className="flex flex-col gap-4">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`cursor-pointer py-2 px-4 rounded-lg ${
                    index === currentSection ? "bg-orange-400" : "bg-blue-400"
                  }`}
                  onClick={() => setCurrentSection(index)}
                >
                  {section}
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="relative w-full h-4 bg-blue-400 rounded-lg overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-green-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-left mt-2 font-bold">
                Progress: {Math.round(progress)}%
              </div>
            </div>
          </div>

          {/* Main Content - Right Frame */}
          <div className="w-5/6 p-6 bg-white">
            <div className="space-y-8">
              {/* Car Power */}
              <div className={`${currentSection === 0 ? "block" : "hidden"}`}>
                {fuelType !== "Electric" ? (
                  <>
                    <h2 className="text-lg font-bold mt-8">
                      How important is car power to you?
                    </h2>
                    <div className="flex gap-4 flex-wrap mb-6">
                      {[
                        "Low (1000 - 1200 cc)",
                        "Moderate (1200 - 1500 cc)",
                        "High (1500 - 2000 cc)",
                        "Very High (2000 cc and above)",
                      ].map((option) => (
                        <label key={option} className="block">
                          <input
                            type="radio"
                            name="enginePower"
                            value={option}
                            checked={answers.enginePower === option}
                            onChange={() =>
                              handleAnswerChange("enginePower", option)
                            }
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-bold mt-8">
                      What is your preferred battery capacity?
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                      Note: Electric car prices and driving range increase with
                      greater battery capacity.
                    </p>
                    <select
                      onChange={(e) =>
                        handleAnswerChange("batteryCapacity", e.target.value)
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                      value={answers.batteryCapacity}
                    >
                      <option value="">Select Battery Capacity</option>
                      {["26 kWh", "30 kWh", "40 kWh", "50 kWh and above"].map(
                        (option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        )
                      )}
                    </select>
                  </>
                )}
              </div>

              {/* Drive Modes */}
              <div className={`${currentSection === 1 ? "block" : "hidden"}`}>
                <h2 className="text-lg font-bold">
                  Which of the following drive modes are available in the car you
                  are interested in?
                </h2>
                <div className="flex gap-4 flex-wrap">
                  {[
                    "3 Drive Modes - Economy, City, and Sports",
                    "Standard",
                    "2 Modes - City and Sport",
                    "2 Modes - Eco and City",
                    "Sport Mode",
                    "Sport/Standard",
                  ].map((option) => (
                    <label key={option} className="block">
                      <input
                        type="radio"
                        name="driveModes"
                        value={option}
                        checked={answers.driveModes === option}
                        onChange={() =>
                          handleAnswerChange("driveModes", option)
                        }
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Exterior Design */}
              <div className={`${currentSection === 2 ? "block" : "hidden"}`}>
                <h1 className="text-lg font-bold">Exterior Design Preferences</h1>
                <div className="space-y-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold"></h3>
                    <div className="flex gap-4 flex-wrap">
                      {[
                        "Alloy Wheels",
                        "LED Headlights",
                        "Fog Lamps",
                        "Roof Rails",
                        "Body-Colored Bumpers",
                      ].map((option) => (
                        <label key={option} className="block">
                          <input
                            type="checkbox"
                            value={option}
                            checked={answers.exteriorDesign.includes(option)}
                            onChange={() =>
                              handleCheckboxChange("exteriorDesign", option)
                            }
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h1 className="text-lg font-bold">Ground Clearance</h1>
                    <div className="flex gap-4 flex-wrap">
                      {["High", "Moderate", "Low"].map((option) => (
                        <label key={option} className="block">
                          <input
                            type="radio"
                            name="groundClearance"
                            value={option}
                            checked={answers.groundClearance === option}
                            onChange={() =>
                              handleAnswerChange("groundClearance", option)
                            }
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fuel Tank and Boot Space */}
              <div className={`${currentSection === 3 ? "block" : "hidden"}`}>
                <div className="space-y-4">
                  <div className="mb-4">
                    <h1 className="text-lg font-bold">Fuel Tank Capacity</h1>
                    <select
                      onChange={(e) =>
                        handleAnswerChange("fuelTankCapacity", e.target.value)
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                      value={answers.fuelTankCapacity}
                    >
                      <option value="">Select Fuel Tank Capacity</option>
                      {[
                        "Less than 40 liters",
                        "40-50 liters",
                        "50-60 liters",
                        "60-70 liters",
                        "More than 70 liters",
                      ].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <h1 className="text-lg font-bold">Boot Space Capacity</h1>
                    <select
                      onChange={(e) =>
                        handleAnswerChange("bootSpace", e.target.value)
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                      value={answers.bootSpace}
                    >
                      <option value="">Select Boot Space Capacity</option>
                      {[
                        "Less than 300 liters",
                        "300-400 liters",
                        "400-500 liters",
                        "500-600 liters",
                        "More than 600 liters",
                      ].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Safety & Features */}
              <div className={`${currentSection === 4 ? "block" : "hidden"}`}>
                <h1 className="text-lg font-bold">Safety Features</h1>
                <div className="space-y-12">
                  {/* Safety Features */}
                  <div className="mb-4 mt-2">
                    <h3 className="text-lg font-semibold"></h3>
                    <div className="flex gap-4 flex-wrap">
                      {[
                        "Airbags",
                        "ABS",
                        "Electronic Brakeforce Distribution (EBD)",
                        "Traction Control System (TCS)",
                        "Electronic Stability Program (ESP)",
                        "Child Seat Anchor Points (ISOFIX)",
                        "Blind Spot Detection",
                        "Forward Collision Warning (FCW)",
                        "360-Degree Camera System",
                        "Parking Assist",
                        "Lane Departure Warning",
                      ].map((option) => (
                        <label key={option} className="block">
                          <input
                            type="checkbox"
                            value={option}
                            checked={answers.safetyFeatures.includes(option)}
                            onChange={() =>
                              handleCheckboxChange("safetyFeatures", option)
                            }
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Entertainment Features */}
                  <div className="mb-4 mt-2">
                    <h1 className="text-lg font-bold">
                      Entertainment Features
                    </h1>
                    <div className="flex gap-4 flex-wrap">
                      {[
                        "Bluetooth Connectivity",
                        "FM Radio",
                        "Touchscreen Display",
                        "Apple CarPlay / Android Auto",
                        "Multifunction Steering Wheel",
                        "Multi Speaker Sound System",
                      ].map((option) => (
                        <label key={option} className="block">
                          <input
                            type="checkbox"
                            value={option}
                            checked={answers.entertainmentFeatures.includes(
                              option
                            )}
                            onChange={() =>
                              handleCheckboxChange(
                                "entertainmentFeatures",
                                option
                              )
                            }
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Comfort Features */}
                  <div className="mb-4">
                    <h1 className="text-lg font-bold">Comfort Features</h1>
                    <div className="flex gap-4 flex-wrap">
                      {[
                        "Sunroof / Moonroof",
                        "Adjustable Steering Wheel",
                        "Air Conditioner / Automatic Climate Control",
                        "Power Adjustable Front Seats",
                        "Rear Seat Armrest",
                        "Ambient Lighting",
                      ].map((option) => (
                        <label key={option} className="block">
                          <input
                            type="checkbox"
                            value={option}
                            checked={answers.comfortFeatures.includes(option)}
                            onChange={() =>
                              handleCheckboxChange("comfortFeatures", option)
                            }
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Driving Assistance Features */}
                  <div className="mb-4">
                    <h1 className="text-lg font-bold">
                      Driving Assistance Features
                    </h1>
                    <div className="flex gap-4 flex-wrap">
                      {[
                        "Cruise Control",
                        "Navigation System",
                        "Reverse Parking Camera",
                        "Rain Sensing Wipers",
                        "Hill Assist",
                      ].map((option) => (
                        <label key={option} className="block">
                          <input
                            type="checkbox"
                            value={option}
                            checked={answers.drivingAssistanceFeatures.includes(
                              option
                            )}
                            onChange={() =>
                              handleCheckboxChange(
                                "drivingAssistanceFeatures",
                                option
                              )
                            }
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Driving Experience */}
                  <div className="mb-4">
                    <h1 className="text-lg font-bold">Driving Experience</h1>
                    <div className="flex gap-4 flex-wrap">
                      {[
                        "Smooth and Comfortable",
                        "Sporty and Fast",
                        "Off-Road Capable",
                        "Luxurious",
                        "Fuel Efficient",
                        "Tech-Driven Experience",
                      ].map((option) => (
                        <label key={option} className="block">
                          <input
                            type="radio"
                            name="drivingExperience"
                            value={option}
                            checked={answers.drivingExperience === option}
                            onChange={() =>
                              handleAnswerChange("drivingExperience", option)
                            }
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg"
                disabled={currentSection === 0}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                {currentSection === 4 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>

        <Footer2 />
      </div>
    );
  };

  export default DetailedRequirement1;
