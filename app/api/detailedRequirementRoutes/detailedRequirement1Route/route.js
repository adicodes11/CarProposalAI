// src/app/api/detailedRequirementPagesRoutes/detailedRequirement1Route/route.js
import { NextResponse } from 'next/server';
import CombinedRequirement from '@/models/CombinedRequirementModel';
import { ConnectDB } from '@/lib/config/db';

export async function POST(req) {
  const data = await req.json();

  // Validation: Ensure required fields are present
  const requiredFields = [
    'enginePower', 'batteryCapacity', 'driveModes', 'exteriorDesign', 
    'groundClearance', 'fuelTankCapacityMin', 'fuelTankCapacityMax', 
    'bootSpaceMin', 'bootSpaceMax', 'safetyFeatures', 
    'entertainmentFeatures', 'comfortFeatures', 
    'drivingAssistanceFeatures', 'drivingExperience'
  ];

  for (const field of requiredFields) {
    if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
      return NextResponse.json({ error: `Missing ${field} field.` }, { status: 400 });
    }
  }

  try {
    await ConnectDB();

    const updateData = {
      enginePower: data.enginePower,
      batteryCapacity: data.batteryCapacity,
      driveModes: data.driveModes,
      exteriorDesign: data.exteriorDesign,
      groundClearance: data.groundClearance,
      fuelTankCapacityMin: data.fuelTankCapacityMin,
      fuelTankCapacityMax: data.fuelTankCapacityMax,
      bootSpaceMin: data.bootSpaceMin,
      bootSpaceMax: data.bootSpaceMax,
      safetyFeatures: data.safetyFeatures,
      entertainmentFeatures: data.entertainmentFeatures,
      comfortFeatures: data.comfortFeatures,
      drivingAssistanceFeatures: data.drivingAssistanceFeatures,
      drivingExperience: data.drivingExperience,
      updatedAt: new Date(),
    };

    // Find the most recent record and update it with the new data
    const result = await CombinedRequirement.findOneAndUpdate(
      {}, // Empty filter object to find the most recent document
      updateData, // Fields to update
      { sort: { createdAt: -1 }, new: true } // Sort by the most recent createdAt and return the updated document
    );

    // If no document is found, return an appropriate error
    if (!result) {
      return NextResponse.json({ error: 'No record found to update.' }, { status: 404 });
    }

    // Return the updated document
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error handling detailedRequirement1Route:', error);
    return NextResponse.json({ error: 'Failed to submit data.' }, { status: 500 });
  }
}
