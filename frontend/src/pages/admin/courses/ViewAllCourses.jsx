import React, { useState, useEffect } from "react";
import AdNavBar from "../../../components/admin/AdNavBar";
import AdSidebar from "../../../components/admin/AdSideBar";
import CoursesTRDetails from "../../../components/admin/courses/CoursesTRDetails";
import CourseTR from "../../../components/admin/courses/CourseTR";

export default function ViewAllCourses() {
  const [courses, setCourses] = useState([]);
  const [dropdownCourseId, setDropdownCourseId] = useState(null);

  const toggleDropdown = (courseId) => {
    setDropdownCourseId((prevId) => (prevId === courseId ? null : courseId));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/courses/");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

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

          <div className="flex-1 justify-center items-center mt-10 p-8">
            <form className="max-w-md mx-auto mb-3">
              <label
                htmlFor="default-search"
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
                  All courses
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Instructor
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Updated Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <React.Fragment key={course._id}>
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-opacity-45"
                        onClick={() => toggleDropdown(course._id)}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {course.title}
                        </th>
                        <td className="px-6 py-4">${course.price}</td>
                        <td className="px-6 py-4">
                          {course.instructor ? course.instructor.name : "N/A"}
                        </td>
                        <td className="px-6 py-4">{course.category}</td>
                        <td className="px-6 py-4">{course.status}</td>
                        <td className="px-6 py-4">{new Date(course.updated_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <svg
                              className="w-6 h-6 text-gray-800 dark:text-white dark:hover:text-blue-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 9-7 7-7-7"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      {dropdownCourseId === course._id && (
                        < CourseTR course={course}/>
                      
                      )}
                      {dropdownCourseId === course._id && (
                        <tr className="bg-white border-b dark:bg-gray-700 dark:border-gray-700 text-sm ">
                        <td colSpan="7">
                          <div className="w-full dark:bg-gray-700">
                            <CoursesTRDetails course={course} />
                          </div>
                        </td>
                      </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
