// src/app/api/detailedRequirementPagesRoutes/detailedRequirement1Route/route.js
import { NextResponse } from "next/server";
import CombinedRequirement from "@/models/CombinedRequirementModel";
import { ConnectDB } from "@/lib/config/db";

export async function POST(req) {
  const {
    enginePower,
    batteryCapacity,
    driveModes,
    exteriorDesign = [],
    groundClearance,
    fuelTankCapacity,
    bootSpace,
    safetyFeatures = [],
    entertainmentFeatures = [],
    comfortFeatures = [],
    drivingAssistanceFeatures = [],
    drivingExperience,
  } = await req.json();

  try {
    await ConnectDB();

    // Build the update data object
    const updateData = {
      enginePower: enginePower || "",
      batteryCapacity: batteryCapacity || "",
      driveModes: driveModes || "",
      exteriorDesign: exteriorDesign.length > 0 ? exteriorDesign : [],
      groundClearance: groundClearance || "",
      fuelTankCapacity: fuelTankCapacity || "",
      bootSpace: bootSpace || "",
      safetyFeatures: safetyFeatures.length > 0 ? safetyFeatures : [],
      entertainmentFeatures: entertainmentFeatures.length > 0 ? entertainmentFeatures : [],
      comfortFeatures: comfortFeatures.length > 0 ? comfortFeatures : [],
      drivingAssistanceFeatures: drivingAssistanceFeatures.length > 0 ? drivingAssistanceFeatures : [],
      drivingExperience: drivingExperience || "",
      updatedAt: new Date(),
    };

    // Find and update the most recent document (you should modify this query as needed)
    const result = await CombinedRequirement.findOneAndUpdate(
      {}, // Adjust this filter based on your user/session handling (e.g., by user ID)
      updateData,
      { sort: { createdAt: -1 }, new: true }
    );

    if (!result) {
      return NextResponse.json({ error: "No record found to update." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error handling detailedRequirement1Route:", error);
    return NextResponse.json({ error: "Failed to submit data." }, { status: 500 });
  }
}
