import React, { useState } from 'react'
import api from '../utils/api';
import { Link } from 'react-router-dom';

const Signup = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const response = await api.post('https://sunncast-1.onrender.com/auth/register', {
          userEmail: email,
          userName: name, 
          password
        });
        window.location.href = '/login';
      } catch (error) {
        console.log('Something went wrong')
      }
    };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Register
          </button>
        </form>
        <Link to={'/login'}>
        <div className="text-sm pt-5 text-blue-500 text-center">
          Login
        </div>
        </Link>
      </div>
    </div>
  )
}

export default Signup