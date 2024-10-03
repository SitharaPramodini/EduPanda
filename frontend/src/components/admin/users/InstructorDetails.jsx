import React, { useState, useEffect } from "react";

export default function InstructorDetails() {
  const [instructors, setInstructors] = useState([]);
  const [instructorCourses, setInstructorCourses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/users/instructors");
        if (!response.ok) {
          throw new Error("Failed to fetch instructors");
        }
        const data = await response.json();
        setInstructors(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAllCourses = async () => {
      const courses = {};
      for (const instructor of instructors) {
        try {
          const response = await fetch(`http://localhost:5001/api/courses/instructor/${instructor._id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch courses for instructor");
          }
          const data = await response.json();
          courses[instructor._id] = data;
        } catch (error) {
          console.error(error.message);
          courses[instructor._id] = [];
        }
      }
      setInstructorCourses(courses);
    };

    fetchAllCourses();
  }, [instructors]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
  }

  if (instructors.length === 0) {
    return <div>No instructors found.</div>; // You can replace this with a message indicating no instructors are available
  }

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2 dark:border-gray-600 ">
      <tbody className="">
        {instructors.map((instructor, index) => (
          <tr key={index} className="bg-white border-b dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-opacity-45">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {index + 1}
            </th>
            <td className="px-6 py-4">
              <div className="flex items-center gap-5">
                <img
                  className="w-10 h-10 rounded-full"
                  src={instructor.photo} // Assuming the API returns a photo URL
                  alt=""
                />
                <div className="font-medium dark:text-white">
                  <div>{instructor.name}</div>
                  <div className="text-sm pl-3 text-gray-500 dark:text-gray-400">
                    {instructor.email}
                  </div>
                  <div className="text-sm pl-3 text-gray-500 dark:text-gray-400">
                    {instructor.phone}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 font-light max-w-72">
              {instructor.bio}
            </td>

            <td className="px-6 py-4">
              <h1 className="pb-2 dark:text-white"> Courses: </h1>
              <ol className="max-w-md space-y-1 list-decimal list-inside ">
                {(instructorCourses[instructor._id] || []).map((course, index) => (
                  <li key={index}>{course.title}</li>
                ))}
              </ol>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
