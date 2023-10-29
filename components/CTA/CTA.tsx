import Link from "next/link";
import React from "react";

const CTA: React.FC = () => {
  return (
    <div>
      <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-10 md:px-7">
        <div className="relative py-24 bg-gradient-to-r from-violet-500  to-blue-600 rounded-3xl">
          <div className="max-w-2xl px-4 mx-auto text-left">
            <h2 className="flex flex-wrap items-center justify-center text-xl font-bold tracking-wide text-gray-100 my-7  md:text-3xl">
              Unlock the Power of AI Copywriting: Sign Up for a Free Trial
              Today!
            </h2>
            <p className="mb-8 text-center font-medium text-gray-300 md:text-lg">
              Find the perfect content for your project with Metabyte. With
              Metabyte you'll never run out of content.
            </p>
            <div className="flex flex-wrap items-center justify-center">
              <Link href="/login">
                <button className="inline-flex items-center px-4 py-2 my-4 font-semibold text-gray-100 bg-transparent border border-white rounded-3xl hover:bg-white hover:text-black">
                  <span>Find out more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="w-4 h-4 ml-3 bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
