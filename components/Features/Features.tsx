import React from "react";

const Features: React.FC = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center -mx-4">
        <div className="w-full px-4 mb-6 md:w-1/2 lg:w-1/3">
          <div className="h-full p-6 text-left transition duration-200 rounded-md ">
            <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-6 text-green-600 bg-green-100 rounded-lg ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="w-5 h-5 bi bi-map"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
                />
              </svg>
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
            <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-6 text-green-600 bg-green-100 rounded-lg ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="w-5 h-5 bi bi-map"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
                />
              </svg>
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
            <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-6 text-green-600 bg-green-100 rounded-lg ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="w-5 h-5 bi bi-map"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
                />
              </svg>
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
