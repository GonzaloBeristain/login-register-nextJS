"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const loginPage = () => {
  const { 
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const router = useRouter();

  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });

    console.log(res)

    if (res.error) {
      setError(res.error)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  });

  return (
    <div className="flex justify-center items-center h-[calc(100vh-7rem)]">
      <form onSubmit={onSubmit} className="w-1/4">

        {error && (
          <span className="block bg-red-600 text-md rounded px-1 mb-2">{error}</span>
        )}
        
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>

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
            placeholder="********"
        />
        {errors.password && (
            <span className="block text-red-500 text-xs">{errors.password.message}</span>
        )}

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2 hover:bg-blue-600 active:bg-blue-800 shadow transition-colors duration-200 font-bold">
          Login
        </button>
      </form>
    </div>
  )
};

export default loginPage;