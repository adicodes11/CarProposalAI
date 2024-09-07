// G:/FY Project/AutoProposalAI/app/api/requirementPagesRoutes/requirement2Route/route.js

import { NextResponse } from 'next/server';
import CustomerRequirementInput from '@/models/CustomerRequirementInput';
import { ConnectDB } from '@/lib/config/db';

export async function POST(req) {
  const { bodyStyle } = await req.json();

  // Validation: Ensure required fields are present
  if (!bodyStyle) {
    return NextResponse.json({ error: 'Missing body style.' }, { status: 400 });
  }

  try {
    // Connect to the database
    await ConnectDB();

    // Build the update object
    const updateData = {
      bodyStyle,
      updatedAt: new Date(),
    };

    // Find the most recent record and update it with body style
    const result = await CustomerRequirementInput.findOneAndUpdate(
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
    console.error('Error handling requirement2Route:', error);
    return NextResponse.json({ error: 'Failed to submit data.' }, { status: 500 });
  }
}
