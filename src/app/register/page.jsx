"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RegisterPage = () => {
    const [message, setMessage] = useState(null);
  
    const register = async (event) => {
        event.preventDefault();
        setMessage(null);
      
        const formData = new FormData(event.target);
        const jsonData = Object.fromEntries(formData);
  
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        };
  
        const req = await fetch('http://localhost:1337/api/auth/local/register', reqOptions);
        const res = await req.json();
  
        if (res.error) {
            setMessage(res.error.message);
            return;
        }
  
        if (res.jwt && res.user) {
            setMessage('Successful registration.');
        }
    };

    return (
        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="bg-white shadow-md rounded-md p-6">
                    <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />
                    <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">Sign up for an account</h2>
                    <form className="space-y-6" onSubmit={register}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <div className="mt-1">
                                <input name="username" type="text" required
                                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1">
                                <input name="email" type="email" autoComplete="email" required
                                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1">
                                <input name="password" type="password" autoComplete="current-password" required
                                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                className="flex w-full justify-center rounded-md border border-transparent bg-black hover:bg-red-500 hover:text-black mb-5 py-2 px-4 hover:text-md text-sm font-bold text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                                Register Account
                            </button>
                            <label className="flex text-sm font-medium justify-center mb-1 text-gray-700">Have an account?</label>
                            <a href='/login'
                                className="flex w-full justify-center rounded-md border border-transparent bg-black hover:bg-red-500 hover:text-black py-2 mb-5 px-4 hover:text-md text-sm font-bold text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                                Login
                            </a>
                        </div>
                    </form>
                    <div className='z-50'>{message}</div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
