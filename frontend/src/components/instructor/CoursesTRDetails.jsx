import React from "react";

export default function CoursesTRDetails({ course }) {
  return (
    <>
      {course.contents.map((content, index) => (
        <div key={index} className="rounded border-b mx-5 mb-5 dark:bg-gray-900">
          <tr className="text-sm ">
          <th
              scope="row"
              className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Title
            </th>
            <td className="px-2 py-2">{content.title}</td>
          </tr>
          <tr >
            <th
              scope="row"
              className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Type
            </th>
            <td className="px-2 py-2">{content.type}</td>
          </tr>
          {content.type === "Lecture" && (
            <tr >
              <th
                scope="row"
                className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Lecture Notes
              </th>
              <td className="px-2 py-2">{content.lectureNotes}</td>
            </tr>
          )}
          {content.type === "Video" && (
            <tr >
              <th
                scope="row"
                className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Video URL
              </th>
              <td className="px-2 py-2">{content.videoURL}</td>
            </tr>
          )}
          {/* {content.type === "Quiz" && ( */}
            <tr>
              <th
                scope="row"
                className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Quiz Questions
              </th>
              <td className="px-2 py-2">
                <ul className="px-4 list-decimal">
                  {content.quizQuestions.map((question, i) => (
                    <li key={i}>{question}</li>
                  ))}
                </ul>
              </td>
            </tr>
          {/* )} */}
        </div>
      ))}
    </>
  );
}
