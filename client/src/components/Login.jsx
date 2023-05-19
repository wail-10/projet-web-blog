import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login form submitted');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <form className="max-w-md px-4 py-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-800">Email</label>
            <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f9c4c8]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-gray-800">Password</label>
            <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f9c4c8]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#f9c4c8] rounded-md hover:bg-[#ebcdcf] focus:outline-none"
            >
            Log in
            </button>
        </form>
        </div>
    );
};

export default Login;
