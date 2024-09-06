import { NextResponse } from 'next/server';
import User from '@/models/UserModel';  // Ensure the path is correct
import { ConnectDB } from '@/lib/config/db';
import bcrypt from 'bcryptjs';

// Helper function to check if password is in the breached list
async function isPasswordBreached(password) {
    const hash = bcrypt.hashSync(password, 10); // Hash the password
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5).toUpperCase();
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const data = await response.text();
    return data.includes(suffix);
}

// Handle POST request to create a new user
export async function POST(request) {
    try {
        await ConnectDB(); // Await the DB connection

        const formData = await request.json(); // Parsing JSON data
        const { fullname, email, password } = formData;

        // Normalize email to lowercase to prevent case sensitivity issues
        const normalizedEmail = email.toLowerCase();

        // Check if the user already exists
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists!" }, { status: 400 });
        }

        // Check if the password is breached
        if (await isPasswordBreached(password)) {
            return NextResponse.json({ error: "Password has been found in a data breach. Please choose a different password." }, { status: 400 });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await User.create({ fullname, email: normalizedEmail, password: hashedPassword });

        // Extract the first name from the full name
        const firstName = fullname.split(' ')[0];

        return NextResponse.json({ msg: "User registered successfully!", firstName }, { status: 201 });
    } catch (error) {
        console.error("User registration failed:", error);
        return NextResponse.json({ error: "User registration failed!" }, { status: 500 });
    }
}
