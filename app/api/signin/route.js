import { NextResponse } from 'next/server';
import User from '@/models/UserModel';  // Ensure the path is correct
import { ConnectDB } from '@/lib/config/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        await ConnectDB();

        const { email, password } = await request.json();
        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return NextResponse.json({ error: "User not found!" }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials!" }, { status: 401 });
        }

        // Extract the first name from the full name
        const firstName = user.fullname.split(' ')[0];

        return NextResponse.json({ msg: "User signed in successfully!", firstName }, { status: 200 });
    } catch (error) {
        console.error("Sign-in failed:", error);
        return NextResponse.json({ error: "Sign-in failed!" }, { status: 500 });
    }
}
