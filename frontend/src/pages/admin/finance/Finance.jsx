import React from "react";
import AdNavBar from "../../../components/admin/AdNavBar";
import AdSidebar from "../../../components/admin/AdSideBar";
import RevenueChart from "../../../components/admin/Finance/RevenueChart";

export default function Finance(){
return(
<div className="flex flex-col h-screen">
      <div className="w-full">
        <AdNavBar />
      </div>

      <div className="sm:flex sm:flex-1">
        <div className="w-64 mt-16">
          <AdSidebar />
        </div>

        <div className="flex-1 justify-center items-center mt-16">
          <RevenueChart/>
          <form className="max-w-md mx-auto my-3">
              <label
                for="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Courses . . ."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-xl font-bold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                  All transactions
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Learner 
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Instructor
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-opacity-45"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
1                    </th>
                    <td className="px-6 py-4">Vihangi</td>
                    <td className="px-6 py-4">Web Development</td>
                    <td className="px-6 py-4">Amali Perera</td>
                    <td className="px-6 py-4">$99</td>
                    <td className="px-6 py-4">$99</td>
                    <td className="px-6 py-4">23-12-20234</td>
                  </tr>

            
                </tbody>
              </table>
            </div>
            </div>
      </div>
    </div>
)
}