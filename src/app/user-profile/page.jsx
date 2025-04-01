"use client"
import { getUser, isLogined } from '@/utils/helper';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserProfile = ({ userData }) => {
    const router = useRouter();
    const [editMode, setEditMode] = useState(false);
    const searchParams = useSearchParams()
    const handleEditClick = () => {
        setEditMode(true);
    }
    useEffect(() => {
        fetchData();
        if (!isLogined()) {
          router.replace("/login")
      }
      if (getUser()?.role?.name === "ShopManager"){
          router.replace("/shop-manager")
      }
    }, [searchParams])

    const renderForm = () => {
        // Implement your edit form here
        return (
            <form className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <div className="mt-1">
                        <input name="username" type="text" defaultValue={userData.username} required
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1">
                        <input name="email" type="email" defaultValue={userData.email} autoComplete="email" required
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button type="submit"
                        className="flex justify-center w-full rounded-md border border-transparent bg-black hover:bg-red-500 hover:text-black py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                        Save Changes
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="bg-white shadow-md rounded-md p-6">
                    <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />
                    <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">User Profile</h2>

                    <div className="space-y-6">
                        {editMode ? (
                            renderForm()
                        ) : (
                            <>
                                <p className="text-lg text-gray-700">Username: {userData.username}</p>
                                <p className="text-lg text-gray-700">Email: {userData.email}</p>
                                <button type="button" onClick={handleEditClick} className="flex justify-center w-full rounded-md border border-transparent bg-black hover:bg-red-500 hover:text-black py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                                    Edit Profile
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
