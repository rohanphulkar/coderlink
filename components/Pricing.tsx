import Image from "next/image";
import React from "react";
import SectionTitle from "./common/SectionTitle";

const Pricing: React.FC = () => {
  return (
    <div>
      <div className="justify-center flex-1  px-4 py-4 mx-auto lg:py-0 md:px-6">
        <SectionTitle title="Pricing" center />

        <div className="flex flex-wrap justify-center -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/2 lg:w-1/3">
            <div className="flex flex-col items-center border-blue-400 border rounded-lg">
              <div className="flex justify-center w-full  rounded-b-full">
                <p className="py-2 text-blue-600">
                  <Image
                    alt="pricing"
                    src="/icons/pricing-1.png"
                    width={70}
                    height={70}
                  />
                </p>
              </div>
              <div className="px-16 py-6 text-center w-full">
                <h2 className="mb-6 text-3xl font-semibold text-gray-700 lg:text-4xl">
                  Monthly
                </h2>
                <ul className="mb-6 lg:self-center">
                  <li className="flex items-center font-medium text-gray-500">
                    <a href="#" className="mr-2 text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-check-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                      </svg>
                    </a>
                    <span>Unlimited Content Creation</span>
                  </li>
                </ul>
                <div className="mb-6">
                  <span className="text-5xl font-medium text-gray-700">$</span>
                  <span className="text-5xl font-medium text-gray-700">5</span>
                </div>
                <a
                  href="#"
                  className="inline-block w-full py-3 font-medium text-center text-blue-600 border border-blue-600 rounded-full hover:bg-blue-700 hover:text-gray-200"
                >
                  Purchase Now{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="w-full px-3 mb-6 md:w-1/2 lg:w-1/3">
            <div className="flex flex-col items-center border-blue-400 border rounded-lg">
              <div className="flex justify-center w-full  rounded-b-full">
                <p className="py-2 text-blue-600">
                  <Image
                    alt="pricing"
                    src="/icons/pricing-2.png"
                    width={70}
                    height={70}
                  />
                </p>
              </div>
              <div className="px-16 py-6 text-center w-full">
                <h2 className="mb-6 text-3xl font-semibold text-gray-700 lg:text-4xl">
                  Yearly
                </h2>
                <ul className="mb-6 lg:self-center">
                  <li className="flex items-center font-medium text-gray-500">
                    <a href="#" className="mr-2 text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-check-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                      </svg>
                    </a>
                    <span>Unlimited Content Creation</span>
                  </li>
                </ul>
                <div className="mb-6">
                  <span className="text-5xl font-medium text-gray-700">$</span>
                  <span className="text-5xl font-medium text-gray-700">42</span>
                </div>
                <a
                  href="#"
                  className="inline-block w-full py-3 font-medium text-center text-blue-600 border border-blue-600 rounded-full hover:bg-blue-700 hover:text-gray-200"
                >
                  Purchase Now{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
