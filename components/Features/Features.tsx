import React from "react";
import { GrOptimize } from "react-icons/gr";
import { LuBrainCircuit } from "react-icons/lu";
import { MdOutlineAttachMoney } from "react-icons/md";
const Features: React.FC = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center -mx-4">
        <div className="w-full px-4 mb-6 md:w-1/2 lg:w-1/3">
          <div className="h-full p-6 text-left transition duration-200 rounded-md ">
            <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-6 text-blue-600 bg-blue-100 rounded-lg ">
              <LuBrainCircuit fontSize={24} />
            </div>
            <h2 className="mb-4 text-xl font-bold leading-tight md:text-2xl">
              AI Generated Content
            </h2>
            <p className="font-medium text-gray-600">
              Our platform uses advanced AI technology to generate copy that is
              tailored to your needs.
            </p>
          </div>
        </div>
        <div className="w-full px-4 mb-6 md:w-1/2 lg:w-1/3">
          <div className="h-full p-6 text-left transition duration-200 rounded-md ">
            <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-6 text-blue-600 bg-blue-100 rounded-lg ">
              <GrOptimize fontSize={24} />
            </div>
            <h2 className="mb-4 text-xl font-bold leading-tight md:text-2xl">
              Automated Optimization
            </h2>
            <p className="font-medium text-gray-600">
              Our platform automatically optimizes your content to ensure it is
              engaging and effective.
            </p>
          </div>
        </div>
        <div className="w-full px-4 mb-6 md:w-1/2 lg:w-1/3">
          <div className="h-full p-6 text-left transition duration-200 rounded-md ">
            <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-6 text-blue-600 bg-blue-100 rounded-lg ">
              <MdOutlineAttachMoney fontSize={24} />
            </div>
            <h2 className="mb-4 text-xl font-bold leading-tight md:text-2xl">
              Affordable Pricing
            </h2>
            <p className="font-medium text-gray-600">
              Our pricing model is designed to be affordable for individuals and
              all size of businesses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
