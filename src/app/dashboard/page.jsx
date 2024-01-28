"use client";
import { signOut } from "next-auth/react";

const dashboardPage = () => {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-7rem)]">
            <div>
                <h1 className="text-5xl">Dashboard</h1>
                <button className="w-full bg-red-900 text-white p-3 rounded-lg mt-2 hover:bg-red-800 active:bg-red-700 shadow transition-colors duration-200 font-bold" 
                onClick={() => signOut()}>
                Logout
                </button>
            </div>
        </div>
    )
};

export default dashboardPage;