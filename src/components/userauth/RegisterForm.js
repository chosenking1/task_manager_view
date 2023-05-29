// RegisterForm.js
import React from 'react';

function RegisterForm() {
  return (
    <form className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <div className="mb-4">
        <label htmlFor="name" className="block font-semibold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block font-semibold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded font-semibold"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
