import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="/instructor_home"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/edupanda.png" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              EduPanda
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm  text-gray-500 dark:text-white">
    
             Welcome Learner!
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="md:flex hidden items-center justify-between">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <a
                  href="/Home"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/MyCourses"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  My Courses
                </a>
              </li>
              <li>
                <a
                  href="/MyCourses"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Monitor Progress
                </a>
              </li>
              
              <li>
                <a
                  href="/learner_profile"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Profile
                </a>
              </li>
            </ul>
            <div
              onClick={() => {
                navigate("/");
              }}
              className="flex items-center space-x-6 rtl:space-x-reverse"
            >
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
               
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

export default NavBar;
