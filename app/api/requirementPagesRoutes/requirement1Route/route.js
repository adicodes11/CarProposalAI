// src/app/api/requirementPagesRoutes/requirement1Route/route.js
import { NextResponse } from 'next/server';
import CombinedRequirement from '@/models/CombinedRequirementModel';
import { ConnectDB } from '@/lib/config/db';

export async function POST(req) {
  const { budgetMin, budgetMax, location } = await req.json();

  if (!budgetMin || !budgetMax || !location) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    await ConnectDB();

    const result = await CombinedRequirement.create({
      budgetMin,
      budgetMax,
      location,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, data: result._id }); // Return the ID
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
