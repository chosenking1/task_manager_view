import React, { useState } from 'react';
import axios from 'axios';
import apiUrl from '../../apiConfig';


const RegisterDepartment = () => {
  const [dept_name, setDept_name] = useState('');
  axios.defaults.baseURL = apiUrl;

  const handleRegister = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    axios
      .post('/api/department', { dept_name }, {
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Department registration successful:', response.data);
        // Reset the form
        setDept_name('');
      })
      .catch((error) => {
        console.error('Department registration failed:', error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="container mx-auto p-4 bg-gradient-to-br from-blue-500 to-black rounded-md shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-4">Register Department</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="dept_name">
              Department Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              type="text"
              id="dept_name"
              value={dept_name}
              onChange={(e) => setDept_name(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterDepartment;
