import React from "react";

export default function CourseTR({ course }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-700 dark:border-gray-700 text-sm ">
      <td colSpan="5" className="pl-10">
        <ul className="py-2 space-y-2 pl-4 text-gray-500 list-disc list-inside dark:text-gray-200">
          <h3 className="text-xl font-bold text-">{course.title}</h3>
          <p className="font-semibold text-base">
            {course.instructor ? course.instructor.name : "N/A"}
          </p>
          <dl>
            <dt className="mb-2 mt-4 font-semibold leading-none text-gray-900 dark:text-white">
              Details :
            </dt>
            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-300">
              {course.description}
            </dd>
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Category :
            </dt>
            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-300">
              {course.category}
            </dd>
            <dt className="font-semibold leading-none text-gray-900 dark:text-white">
              Course Content :
            </dt>
          </dl>
        </ul>
      </td>

      <td colSpan="2" className="w-1/5 pl-12">
        <div className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          Enrolled count : {course.enrolledStudents.length}
        </div>
        <div className="text-gray-400 mt-6 rounded-lg text-sm p-2 inline-flex  dark:bg-gray-800 dark:text-white">
          {course.level}
        </div>
        <div className="flex items-center py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
              clipRule="evenodd"
            />
          </svg>
          {course.duration} hrs
        </div>
      </td>
    </tr>
  );
}
