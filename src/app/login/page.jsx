"use client";
import { callAPI } from '@/utils/api-caller';
import { setToken, setUser } from '@/utils/helper';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")
    const router = useRouter()
    const onLoginClick = async() => {
        console.log("email vua nhap: " + email)
        console.log("password vua nhap: " + password)
        try {
            const data = {
                identifier: email,
                password
            }
            const res = await callAPI("/auth/local", "POST", data)
            console.log(res.data)
            setToken(res.data.jwt)
            const userRes = await callAPI("/users/me", "GET")
            setUser(userRes.data)
            console.log(res.data.jwt)
            router.replace("/")
        } catch (error) {
            setErrorText("Sai tài khoản hoặc mật khẩu!")
            console.log(error)
        }
     
            
    }
    return(
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
                <div>
                    <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Username/Email address</label>
                    <div className="mt-2">
                        <input id="email" name="email" type="email" autocomplete="email" value={email} onChange={(e)=>{setEmail(e.target.value); setErrorText("")}} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-red-500 hover:text-red-600">Forgot password?</a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input id="password" name="password" type="password" autocomplete="current-password" value={password} onChange={(e)=>{setPassword(e.target.value);  setErrorText("")}} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <span style={{color: "red"}}>{errorText}</span>
                <div>
                    <button onClick={()=>onLoginClick()} type="button" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <a href="/register" className="font-semibold leading-6 px-2 text-red-600 hover:text-red-600">Register</a>
            </p>
        </div>
    </div>
    )
}
export default LoginPage;