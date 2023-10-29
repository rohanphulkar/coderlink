"use client";
import { api } from "@/components/api/api";
import { Login } from "@/components/auth/Login";

import { useGoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";

// const Login = (dispatch: any, token: any, email: any) => {
//   dispatch(login({ token: token, email: email }));
// };
const page: React.FC = () => {
  const dispatch = useDispatch();
  const handleGoogleLogin = async (token: string) => {
    toast.loading("Processing, Please Wait...", { id: "1" });
    try {
      const response = await api.post("/user/login/google/", {
        token: token,
      });
      const result = await response.data;
      const status = await response.status;
      toast.success("Done...", { id: "1" });
      if (status === 200) {
        Login(result.token, result.email);
        toast.success("Login Successful", { id: "1" });
      } else {
        toast.error("Invalid credentials", { id: "1" });
      }
    } catch (error: any) {
      if (error) {
        if (error.response.status === 401) {
          toast.error(error.response.data.error, { id: "1" });
        }
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleGoogleLogin(codeResponse.access_token),
    onError(errorResponse) {
      toast.error("Authentication failed.");
    },
    flow: "implicit",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Processing...", { id: "1" });
    try {
      const { email, password }: any = e.target;
      const response = await api.post("/user/login/", {
        email: email.value,
        password: password.value,
      });
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        Login(result.access, result.email);
        toast.success("Login Successful", { id: "1" });
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: "1" });
    }
  };
  return (
    <div>
      <section className="bg-white">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="w-full max-w-md"
          >
            <img className="w-auto h-7 sm:h-8" src="/logo.png" alt="" />
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl">
              sign In
            </h1>
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                type="email"
                name="email"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:outline-none focus:ring-0 "
                placeholder="Email address"
              />
            </div>
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-0 "
                placeholder="Password"
              />
              <button
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                type="button"
                className="absolute right-2 sm:right-3"
              >
                {showPassword ? (
                  <FiEye fontSize={18} className="text-gray-700" />
                ) : (
                  <FiEyeOff fontSize={18} className="text-gray-700" />
                )}
              </button>
            </div>
            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform  rounded-lg bg-base text-text focus:outline-none focus:ring-0">
                Sign in
              </button>
              <p className="mt-4 text-center text-gray-600">or sign in with</p>
              <button
                onClick={() => {
                  login();
                }}
                type="button"
                className="flex w-full items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg"
              >
                <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
                <span className="mx-2">Sign in with Google</span>
              </button>

              <div className="mt-6 text-center ">
                <Link href="/signup">
                  <p className="text-sm text-primary hover:underline">
                    Don&apos;t have an account yet? Sign up
                  </p>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default page;
