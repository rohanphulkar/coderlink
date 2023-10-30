"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { Logout } from "../auth/Logout";

const Navbar: React.FC = () => {
  const email = Cookies.get("email");
  return (
    <div>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4">
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <button type="button" className="flex items-center">
                <Image
                  src="/logo.png"
                  width={32}
                  height={32}
                  alt="logo"
                  className="flex-none text-xl font-semibold"
                />
                <span className="text-2xl font-semibold ml-1">Coderlink</span>
              </button>
            </Link>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex gap-5 mt-5 flex-row justify-center items-center sm:justify-end text-base sm:mt-0 sm:pl-5">
              {email ? (
                <Link href="/app">
                  <button className="font-medium text-gray-700">App</button>
                </Link>
              ) : (
                <Link href="/">
                  <button className="font-medium text-gray-700">Home</button>
                </Link>
              )}

              <Link href="/blog">
                <button className="font-medium text-gray-700">Blog</button>
              </Link>

              {email ? (
                <>
                  <div
                    className="hs-dropdown relative inline-flex "
                    data-hs-dropdown-placement="bottom-right"
                  >
                    <button
                      id="hs-dropdown-with-header"
                      type="button"
                      className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[3rem] w-[3rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-0 transition-all text-xs"
                    >
                      <div className="bg-gray-950 p-3 rounded-xl text-white">
                        <FiUser fontSize={20} />
                      </div>
                    </button>
                    <div
                      className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] z-10 bg-white shadow-md rounded-lg p-2"
                      aria-labelledby="hs-dropdown-with-header"
                    >
                      <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg">
                        <p className="text-sm text-gray-600">Signed in as</p>
                        <p className="text-sm font-medium text-gray-800">
                          {email}
                        </p>
                      </div>
                      <div className="mt-2 py-2 first:pt-0 last:pb-0">
                        <Link href="/user/dashboard">
                          <button className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:outline-none">
                            <LuLayoutDashboard fontSize={20} />
                            Dashboard
                          </button>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            Logout();
                          }}
                          className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:outline-none"
                        >
                          <FiLogOut fontSize={20} />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <button
                      type="button"
                      className="font-semibold bg-secondary text-base px-4 py-2 rounded-full hover:bg-gray-300"
                    >
                      Login
                    </button>
                  </Link>
                  <Link href="/signup">
                    <button
                      type="button"
                      className="font-semibold bg-base text-text px-4 py-2 rounded-full"
                    >
                      Create Account
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
