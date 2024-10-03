import React from "react";
import AdNavBar from "../../../components/admin/AdNavBar";
import AdSidebar from "../../../components/admin/AdSideBar";
import { useState } from "react";

import InstructorDetails from "../../../components/admin/users/InstructorDetails";
import LearnerDetails from "../../../components/admin/users/LernerDetails";

export default function Users() {
  const [isInstructorDropdownOpen, setIsInstructorDropdownOpen] =
    useState(false);

  const toggleInstructorDropdown = () => {
    setIsInstructorDropdownOpen((prevState) => !prevState);
  };

  const [isLearnerDropdownOpen, setIsLearnerDropdownOpen] = useState(false);

  const toggleLearnerDropdown = () => {
    setIsLearnerDropdownOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="w-full">
          <AdNavBar />
        </div>

        <div className="sm:flex sm:flex-1">
          <div className="w-64 mt-16">
            <AdSidebar />
          </div>

          <div className="flex-1 justify-center w-[1055px] items-center mt-10 p-8">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-2xl font-bold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                  User Details
                </caption>

                <div className="flex items-center justify-center dark:bg-gray-800 p-5 px-32 border-t-2 dark:border-gray-700 ">
                  <div className="flex md:order-2 space-x-72 rtl:space-x-reverse">
                    <div className="block mr-40 text-xl font-bold text-gray-900 md:p-0 dark:text-white ">
                      Instructors
                    </div>
                    <button
                      type="button"
                      onClick={toggleLearnerDropdown}
                      className="text-white  bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      View Deatails
                    </button>
                  </div>
                </div>
                {isInstructorDropdownOpen && <InstructorDetails />}

                <div className="flex items-center justify-center dark:bg-gray-800 p-5 px-32 border-t-2 dark:border-gray-700 ">
                  <div className="flex md:order-2 space-x-80 rtl:space-x-reverse">
                    <div className="block mr-40 text-xl font-bold text-gray-900 md:p-0 dark:text-white ">
                      Learners
                    </div>
                    <button
                      type="button"
                      onClick={toggleLearnerDropdown}
                      className="text-white  bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      View Deatails
                    </button>
                  </div>
                </div>
                {isLearnerDropdownOpen && <LearnerDetails />}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
