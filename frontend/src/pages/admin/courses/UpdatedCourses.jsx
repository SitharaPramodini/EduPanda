import React from "react";
import { useState, useEffect } from "react";
import AdNavBar from "../../../components/admin/AdNavBar";
import AdSidebar from "../../../components/admin/AdSideBar";
import Swal from "sweetalert2";
import CoursesTRDetails from "../../../components/admin/courses/CoursesTRDetails";
import CourseTR from "../../../components/admin/courses/CourseTR";
import ApproveSwal from "../../../components/admin/courses/ApproveSwal";
import RejectSwal from "../../../components/admin/courses/RejectSwal";

export default function UpdatedCourses() {
  const [courses, setCourses] = useState([]);
  const [dropdownCourseId, setDropdownCourseId] = useState(null);

  const toggleDropdown = (courseId) => {
    setDropdownCourseId((prevId) => (prevId === courseId ? null : courseId));
  };

  const onAccept = async (courseId, courseName, instructorEmail) => {
    ApproveSwal(courseId, courseName, instructorEmail);
  };

  const onReject = async (courseId, courseName, instructorEmail) => {
    RejectSwal(courseId, courseName, instructorEmail);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/courses/updated");
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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-xl font-bold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                  New courses
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
                      Added Date
                    </th>
                    <th
                      colSpan="2"
                      scope="col"
                      className="px-6 py-3 text-center"
                    >
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <React.Fragment key={course._id}>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-opacity-45">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {course.title}
                        </th>
                        <td className="px-6 py-4">${course.price} </td>
                        <td className="px-6 py-4">
                          {course.instructor ? course.instructor.name : "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(course.updated_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() =>
                              onAccept(course._id, course.title, course.instructor.email)
                            }
                            type="button"
                            className="inline-flex justify-center items-center text-base font-normal py-2 pr-3 text-center
                        focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          >
                            <svg
                              className="w-6 h-6 mx-2 text-gray-800 dark:text-white"
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
                                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            Accept
                          </button>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => onReject(course._id,course.title, course.instructor.email)}
                            type="button"
                            className="inline-flex justify-center items-center text-base font-normal py-2 pr-3 text-center
                        focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          >
                            <svg
                              className="w-6 h-6 mx-2 text-gray-800 dark:text-white"
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
                                d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            Reject
                          </button>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button
                            onClick={() => toggleDropdown(course._id)}
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
                        <CourseTR course={course} />
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
