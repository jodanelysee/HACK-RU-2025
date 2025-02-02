import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    useEffect(() => {
        localStorage.clear();
      });

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        const userObj = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userObj),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Display success message from server
                window.location.href = "http://localhost:5173/home";
                //set userID in local storage
                localStorage.setItem("userID", data.user._id);
                console.log(data);
            } else {
                alert(data.message); // Display error message from server
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred during login");
        }
    };

    return (
        <div className="p-8 rounded border border-gray-200">
            <h1 className="font-medium text-3xl">Log In</h1>
            <p className="text-gray-600 mt-6">If you have an account, use this form to login.</p>
            <form onSubmit={handleLogin}>
                <div className="mt-8 grid lg:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="email" className="text-sm text-gray-700 block mb-1 font-medium">Email</label>
                        <input type="text" name="email" id="email" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="yourmail@provider.com" />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm text-gray-700 block mb-1 font-medium">Password</label>
                        <input type="password" name="password" id="password" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter your password" />
                    </div>
                </div>
                <div className="space-x-4 mt-8">
                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Login</button>
                </div>
                <p>If you do not already have an account, please <Link to="/register" className="text-blue-950 underline">Register</Link> here</p>
            </form>
        </div>
    );
};

export default Login;
