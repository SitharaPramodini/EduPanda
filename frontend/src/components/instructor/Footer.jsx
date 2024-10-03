import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-white rounded-lg shadow-sm shadow-blue-950 m-2 dark:bg-gray-900">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 dark:hover:text-gray-100">
            © 2023{" "}
            <a href="/" className="hover:underline">
              EduPanda™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline  dark:hover:text-gray-100 me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline  dark:hover:text-gray-100 me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline  dark:hover:text-gray-100 me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline  dark:hover:text-gray-100">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
