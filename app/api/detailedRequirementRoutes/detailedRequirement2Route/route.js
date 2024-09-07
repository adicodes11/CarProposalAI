import { NextResponse } from "next/server";
import CustomerRequirementInput from "@/models/CustomerRequirementInput";
import { ConnectDB } from "@/lib/config/db";

export async function POST(req) {
  const {
    windowMirrorFeatures = [],
    fogLights,
    daytimeRunningLights,
    headlights,
    automaticHeadlamps,
    followMeHomeHeadlamps,
    taillights,
    connectedCarFeatures = [],
    infotainmentFeatures = [],
    additionalFeatures = "",
    carModelVariant = "",
    extendedWarranty = "",
    registrationInsurance = "",
  } = await req.json();

  try {
    await ConnectDB();

    // Build the update data object (without nested exteriorLighting)
    const updateData = {
      windowMirrorFeatures: windowMirrorFeatures.length > 0 ? windowMirrorFeatures : [],
      fogLights: fogLights || "",
      daytimeRunningLights: daytimeRunningLights || "",
      headlights: headlights || "",
      automaticHeadlamps: automaticHeadlamps || "",
      followMeHomeHeadlamps: followMeHomeHeadlamps || "",
      taillights: taillights || "",
      connectedCarFeatures: connectedCarFeatures.length > 0 ? connectedCarFeatures : [],
      infotainmentFeatures: infotainmentFeatures.length > 0 ? infotainmentFeatures : [],
      additionalFeatures: additionalFeatures || "",
      carModelVariant: carModelVariant || "",
      extendedWarranty: extendedWarranty || "",
      registrationInsurance: registrationInsurance || "",
      updatedAt: new Date(),
    };

    // Find and update the most recent document (you should modify this query as needed)
    const result = await CustomerRequirementInput.findOneAndUpdate(
      {}, // Adjust this filter based on your user/session handling (e.g., by user ID)
      updateData,
      { sort: { createdAt: -1 }, new: true }
    );

    if (!result) {
      return NextResponse.json({ error: "No record found to update." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error handling detailedRequirement2Route:", error);
    return NextResponse.json({ error: "Failed to submit data." }, { status: 500 });
  }
}
