"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const registerPage = () => {
    const { 
        register, 
        handleSubmit, 
        formState: {errors} 
        } = useForm();

    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        if (data.password  !== data.confirmPassword) {
            return alert("Password do not match")
        }
        
        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                username: data.username,
                email:  data.email,
                password: data.password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if(res.ok) {
            router.push("/auth/login")
        }
    });
    console.log(errors);

    return (
        <div className="flex justify-center items-center h-[calc(100vh-7rem)]">
            <form onSubmit={onSubmit} className="w-1/4">
                <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>

                <label htmlFor="username" className="text-slate-300 mb-2 block text-sm">
                    Username:
                </label>
                <input 
                    type="text"
                    {...register("username", {
                        required: {
                            value: true,
                            message: "Username is required",
                        }
                    })}
                    className="p-3 rounded block mb-2 bg-slate-800 text-slate-300 w-full"
                    placeholder="username123"
                />
                {errors.username && (
                    <span className="block text-red-500 text-xs">{errors.username.message}</span>
                )}
                
                <label htmlFor="email" className="text-slate-300 mb-2 block text-sm">
                    Email:
                </label>
                <input 
                    type="email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Email is required",
                        }
                    })}
                    className="p-3 rounded block mb-2 bg-slate-800 text-slate-300 w-full"
                    placeholder="user@email.com"
                />
                {errors.email && (
                    <span className="block text-red-500 text-xs">{errors.email.message}</span>
                )}

                <label htmlFor="password" className="text-slate-300 mb-2 block text-sm">
                    Password:
                </label>
                <input 
                    type="password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Password is required",
                        }
                    })}
                    className="p-3 rounded block mb-2 bg-slate-800 text-slate-300 w-full"
                    placeholder="12345"
                />
                {errors.password && (
                    <span className="block text-red-500 text-xs">{errors.password.message}</span>
                )}

                <label htmlFor="confirmPassword" className="text-slate-300 mb-2 block text-sm">
                    Confirm Password:
                </label>
                <input 
                    type="password"
                    {...register("confirmPassword", {
                        required: {
                            value: true,
                            message: "Confirm Password is required",
                        }
                    })}
                    className="p-3 rounded block mb-2 bg-slate-800 text-slate-300 w-full"
                    placeholder="12345"
                />
                {errors.confirmPassword && (
                    <span className="block text-red-500 text-xs">{errors.confirmPassword.message}</span>
                )}

                <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2 hover:bg-blue-600 active:bg-blue-800 shadow transition-colors duration-200 font-bold">
                    Register
                </button>
            </form>
        </div>
    )
};

export default registerPage;