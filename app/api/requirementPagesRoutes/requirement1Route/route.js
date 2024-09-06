import { NextResponse } from 'next/server';
import CombinedRequirement from '@/models/CombinedRequirementModel';
import { ConnectDB } from '@/lib/config/db';

export async function POST(req) {
  const { budgetMin, budgetMax, location, userId } = await req.json();
  
  // Check if all required fields are present
  if (!budgetMin || !budgetMax || !location || !userId) {
    return NextResponse.json({ error: 'Missing required fields or user not logged in' }, { status: 400 });
  }

  try {
    await ConnectDB();

    const result = await CombinedRequirement.create({
      budgetMin,
      budgetMax,
      location,
      createdBy: userId,  // Set the user who created this requirement
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, data: result._id });  // Return the ID
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
