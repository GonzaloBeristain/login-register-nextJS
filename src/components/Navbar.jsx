import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <nav className="flex justify-between items-center bg-slate-900 px-36 py-3">
            <h1 className="text-2xl font-bold">
                Next-Login/Register
            </h1>

            <ul className="flex space-x-5 text-xl">

            {!session?.user ? (
                <>
                    <li className="hover:text-slate-500 transition-colors shadow duration-200">
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li className="hover:text-slate-500 transition-colors shadow duration-200">
                        <Link href="/auth/login">
                            Login
                        </Link>
                    </li>
                    <li className="hover:text-slate-500 transition-colors shadow duration-200">
                        <Link href="/auth/register">
                            Register
                        </Link>
                    </li>
                </>
            ) : (
                <>
                    <li className="hover:text-slate-500 transition-colors shadow duration-200">
                        <Link href="/dashboard">
                            Dashboard
                        </Link>
                    </li>
                    <li className="hover:text-slate-500 transition-colors shadow duration-200">
                        <Link href="/api/auth/signout">
                            Logout
                        </Link>
                    </li>
                </>
                )}

            </ul>
        </nav>
    )
};