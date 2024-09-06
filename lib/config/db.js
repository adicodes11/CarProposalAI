// src/lib/config/db.js

import mongoose from 'mongoose';

export const ConnectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return; // Check if already connected

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed');
  }
};
