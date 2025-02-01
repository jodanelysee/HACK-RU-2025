import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const first_name = form.first_name.value;
        const last_name = form.last_name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(first_name);
        console.log(last_name);
        console.log(email);
        console.log(password);

        const userObj = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
        };

        console.log(userObj);

        // send data to mongo
        fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userObj),
        })
            .then((res) => res.json())
            .then((data) => {
                //console.log(data)
                alert("User Signed Up Successfully");
                // bring to login page after successful sign up
                window.location.href = "http://localhost:5173/login";
                form.reset();
            });
    };

    return (
        <div className="p-8 rounded border border-gray-200">
            <h1 className="font-medium text-3xl">Sign Up</h1>
            <p className="text-gray-600 mt-6">If you do not have an account, use this form to create one.</p>
            <form onSubmit={handleSignUp}>
                <div className="mt-8 grid lg:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="first_name" className="text-sm text-gray-700 block mb-1 font-medium">First Name</label>
                        <input type="text" name="first_name" id="first_name" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter your first name" />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="text-sm text-gray-700 block mb-1 font-medium">Last Name</label>
                        <input type="text" name="last_name" id="last_name" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter your last name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm text-gray-700 block mb-1 font-medium">Email Address</label>
                        <input type="text" name="email" id="email" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="yourmail@provider.com" />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm text-gray-700 block mb-1 font-medium">Password</label>
                        <input type="text" name="password" id="password" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter your password" />
                    </div>
                </div>
                <div className="space-x-4 mt-8">
                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Sign Up</button>
                </div>
                <p>If you already have an account, please <Link to="/login" className="text-blue-950 underline">Login</Link> here</p>
            </form>
        </div>
    );
};

export default Signup;
