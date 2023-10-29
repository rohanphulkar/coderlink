"use client";

import { ReduxProvider } from "@/redux/Provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { Toaster } from "react-hot-toast";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[85rem] mx-auto">
      <ReduxProvider>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
        >
          {children}
        </GoogleOAuthProvider>
      </ReduxProvider>
      <Toaster />
    </div>
  );
};

export default Wrapper;
