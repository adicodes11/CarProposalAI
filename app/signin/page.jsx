"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('User signed in successfully!');

        // Save the user's first name and userId to session storage
        sessionStorage.setItem('firstName', data.firstName);
        sessionStorage.setItem('userId', data.userId); // Save userId to sessionStorage

        setTimeout(() => {
          router.push('/welcome'); // Redirect to the welcome page
        }, 1500);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error signing in user:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow flex-col justify-center items-center bg-white pt-16">
        <h1 className="text-3xl font-bold mb-6">Welcome back! Please sign in.</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded shadow-lg">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            Sign In
          </button>
          {message && (
            <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>
        <p className="mt-6 text-gray-600">
          Need an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up for free
          </a>
        </p>
      </div>
      <div style={{ paddingTop: '20rem' }}>
        <Footer />
      </div>
    </div>
  );
}
