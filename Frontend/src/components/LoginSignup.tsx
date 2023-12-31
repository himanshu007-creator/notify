"use client";

import { login, signup } from "@/app/apiCalls/login";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import appLogo from "../../public/images/logo.png";
import { AuthPageType } from "./types";


export const LoginSignup: React.FC = () => {
    const [selectedPageType, setSelectedPageType] = useState<AuthPageType>('login')
    const [userName, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    const handleAuthTypeChange = () => {
        if (selectedPageType === 'login') {
            setSelectedPageType('signup')
        } else {
            setSelectedPageType('login')
        }
    }

    const handleLoginOrSignup = async () => {
        setLoading(true)
        if (selectedPageType === 'login') {
            const loginSuccess = await login(email, password)
            if(loginSuccess) {
                router.push( "/");
            }
        } else {
            const signupSuccess = await signup(userName, email, password)
            if(signupSuccess) {
                router.push( "/");
            }
        }
        setLoading(false)
    }

    return (
        <div className="h-screen w-full mx-auto pt-16">
            <div className="h-[420px] w-96 bg-red-500 mx-auto justify-center px-8 py-2 bg-zinc-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                <Image
                    src={appLogo.src}
                    className="mx-auto rounded-full"
                    alt="Logo"
                    width={69}
                    height={69}
                />
                <p className="text-3xl text-center text-black py-2 font-bold">Notify</p>
                <p className="text-center text-black font-semibold">
                    {selectedPageType === 'login' ? 'Login' : 'Sign Up'}
                </p>
                <div className="mt-2 text-black">

                    {
                        selectedPageType === 'signup' &&
                        <input
                            type="text"
                            className="w-full h-10 rounded-md border-2 border-gray-400 p-2"
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => { setUsername(e.target.value) }}
                        />
                    }
                    <input
                        type="email"
                        className="w-full h-10 rounded-md border-2 border-gray-400 p-2 mt-4"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />

                    <input
                        type="password"
                        className="w-full h-10 rounded-md border-2 border-gray-400 p-2 mt-4"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <p>
                        <button onClick={handleLoginOrSignup} className="w-full h-10 rounded-md border-2 border-gray-400 p-2 mt-4 bg-red-600 text-white">
                            {loading && <span className="animate-spin mr-2">🔄</span>}
                            {!loading && selectedPageType === 'login' ? 'Login' : 'Sign Up'}
                        </button>
                    </p>
                    <p className="text-center mt-4 text-blue-400" onClick={handleAuthTypeChange}>
                        {
                            selectedPageType === 'login' ? 'Don\'t have an account? Sign up' : 'Already have an account? Sign in'
                        }
                    </p>

                </div>
            </div>

        </div>

    )
}