"use client";
import { api } from "@/components/api/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { MdNumbers } from "react-icons/md";
const page: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Verifying...", { id: "1" });
    const { code }: any = e.target;
    try {
      const response = await api.get(
        `/user/email-verify/${code.value}/?email=${email}`
      );
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        toast.success("Your email has been successfully verified.", {
          id: "1",
        });
        router.push("/");
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [searchParams, email]);
  return (
    <div>
      <section className="bg-white">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md"
            method="POST"
          >
            <img className="w-auto h-7 sm:h-8" src="/logo.png" alt="" />
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl">
              Verify your email address
            </h1>
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <MdNumbers className="mx-3 text-gray-400" fontSize={20} />
              </span>
              <input
                type="number"
                maxLength={6}
                pattern="[0-9]{6}"
                name="code"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-9 focus:outline-none focus:ring-0 "
                placeholder="Verification Code"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform  rounded-lg bg-base text-text focus:outline-none focus:ring-0"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default page;
