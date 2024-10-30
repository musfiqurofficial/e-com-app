"use client";

import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();

  return (
    <div>
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-2">
        {user ? (
          <span className="text-[14px] font-mono">Welcome, {user.name}</span>
        ) : (
          ""
        )}
      </div>
      <nav className={`bg-white ${user ? "shadow" : ""}`}>
        <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-2">
          <div className="lg:flex lg:items-center">
            <div className="flex items-center justify-between">
              <Link href="/">
                <h3 className="text-[28px] font-medium text-[#333]">
                  <span className="text-purple-700 text-[34px] font-bold">
                    e
                  </span>
                  -com
                </h3>
              </Link>
              <div className="flex lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  aria-label="toggle menu"
                >
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div
              className={`${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-full"
              } absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between`}
            >
              <div className="flex flex-col text-gray-600 capitalize lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
                <Link
                  href="/about"
                  className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900"
                >
                  About Us
                </Link>
                {user ? (
                  <>
                    <Link
                      href="/products"
                      className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900"
                    >
                      All Products
                    </Link>
                    <Link
                      href="/addproduct"
                      className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900"
                    >
                      Add Product
                    </Link>
                    <button
                      onClick={logout}
                      className="mt-2 lg:mt-0 text-red-500 lg:mx-4"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
