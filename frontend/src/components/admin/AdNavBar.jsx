import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';


export default function AdNavbar() {

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5002/api/users/logout');
      // Clear token from localStorage
      localStorage.removeItem('token');
      // Redirect the user to the home page or any other desired destination
      window.location.href = '/'; // Redirect to the home page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-2.5 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="#" className="flex ms-2 md:me-24">
                <img src="/edupanda.png" className="h-9 me-5" alt="Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  EduPanda
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <div className="block mx-14 my-auto text-xl font-bold text-gray-900 md:p-0 dark:text-white ">
                  Hello Admin !
                </div>
                <Link
                  className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleLogout}
                >
                  Log Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

    </div>
  );
}
