import { NextResponse } from 'next/server';
import CustomerRequirementInput from '@/models/CustomerRequirementInput';
import { ConnectDB } from '@/lib/config/db';

export async function POST(req) {
  const { fuelType, transmissionType, drivingRange, seatingCapacity } = await req.json();

  // Validate required fields
  if (!fuelType || !seatingCapacity) {
    return NextResponse.json({ error: 'Fuel type and seating capacity are required.' }, { status: 400 });
  }

  try {
    await ConnectDB();

    // Find the most recent document and update it
    const result = await CustomerRequirementInput.findOneAndUpdate(
      {},  // Empty filter object to find the most recent document
      {
        fuelType,
        transmissionType,
        drivingRange,
        seatingCapacity,
        updatedAt: new Date(),
      },
      { sort: { createdAt: -1 }, new: true } // Sort by the most recent createdAt and return the updated document
    );

    if (!result) {
      return NextResponse.json({ error: 'No record found to update.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error handling requirement3Route:', error);
    return NextResponse.json({ error: 'Failed to submit data.' }, { status: 500 });
  }
}
