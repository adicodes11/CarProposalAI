// src/app/api/requirementPagesRoutes/requirement4Route/route.js
import { NextResponse } from 'next/server';
import CustomerRequirementInput from '@/models/CustomerRequirementInput';
import { ConnectDB } from '@/lib/config/db';

export async function POST(req) {
  const { primaryUse, carColor } = await req.json();

  // Validation: Ensure required fields are present
  if (!primaryUse || !carColor) {
    return NextResponse.json({ error: 'Primary use and car color are required.' }, { status: 400 });
  }

  try {
    await ConnectDB();

    // Build the update object
    const updateData = {
      primaryUse,
      carColor,
      updatedAt: new Date(),
    };

    // Find the most recent document and update it
    const result = await CustomerRequirementInput.findOneAndUpdate(
      {},  // Empty filter object to find the most recent document
      updateData, // Fields to update
      { sort: { createdAt: -1 }, new: true } // Sort by the most recent createdAt and return the updated document
    );

    // If no document is found, create a new one
    if (!result) {
      const newDocument = await CustomerRequirementInput.create({
        primaryUse,
        carColor,
        createdAt: new Date(),
      });

      return NextResponse.json({ success: true, data: newDocument._id }); // Return the new document's ID
    }

    return NextResponse.json({ success: true, data: result._id }); // Return the updated document's ID
  } catch (error) {
    console.error('Error handling requirement4Route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
