import Image from "next/image";
import Link from "next/link";
import React from "react";
import SectionTitle from "../common/SectionTitle";

const Pricing: React.FC = () => {
  return (
    <div>
      <div className="justify-center flex-1  px-4 py-4 mx-auto lg:py-0 md:px-6">
        <SectionTitle title="Pricing" center />
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-0 max-w-5xl mx-auto">
          {/* left side - start */}
          <div className="w-full rounded-lg bg-gray-800 p-6 sm:w-1/2 sm:rounded-r-none sm:p-8 lg:w-1/3">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-gray-100 sm:text-3xl">
                Monthly
              </h3>
            </div>
            <div className="mb-4 space-x-2">
              <span className="text-4xl font-bold text-gray-100">$5</span>
            </div>
            <ul className="mb-6 space-y-2 text-gray-300">
              {/* feat - start */}
              <li className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Unlimited Access</span>
              </li>
              {/* feat - end */}
              {/* feat - start */}
              <li className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>24/7 Support</span>
              </li>
              {/* feat - end */}
            </ul>
            <Link href="/login">
              <button
                type="button"
                className="block w-full rounded-lg bg-gray-50 px-8 py-3 text-center text-sm font-semibold text-gray-100 outline-none ring-0 transition duration-100 md:text-base"
              >
                Buy Now
              </button>
            </Link>
          </div>
          {/* left side - end */}
          {/* right side - start */}
          <div className="w-full rounded-lg bg-gradient-to-tr from-indigo-700 to-violet-500 p-6 shadow-xl sm:w-1/2 sm:p-8">
            <div className="mb-4 flex flex-col items-start justify-between gap-4 lg:flex-row">
              <div>
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                  Yearly
                </h3>{" "}
                <p className="text-indigo-100 text-xl font-bold">30% Off</p>
              </div>
            </div>
            <div className="mb-4 space-x-2">
              <span className="text-4xl font-bold text-white">$42</span>
              <span className="text-2xl text-indigo-100 line-through">$60</span>
            </div>
            <ul className="mb-6 space-y-2 text-indigo-100">
              {/* feat - start */}
              <li className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Unlimited Access</span>
              </li>
              {/* feat - end */}
              {/* feat - start */}
              <li className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>24/7 Support</span>
              </li>
              {/* feat - end */}
            </ul>
            <Link href="/login">
              <button
                type="button"
                className="block w-full rounded-lg bg-gray-50 px-8 py-3 text-center text-sm font-semibold text-gray-100 outline-none ring-0 transition duration-100 md:text-base"
              >
                Buy Now
              </button>
            </Link>
          </div>
          {/* right side - end */}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
