import React, { useState, useEffect } from "react";
import NavBar from "../../components/learner/NavBar";
import { useNavigate } from "react-router-dom";
import CourseDetails from "../../components/learner/CourseDetails";

function MyCourses() {
  const [courseIds, setCourseIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5003/api/enrollments/663b397718ded1c9b2515d1c', {
          method: 'GET'
        });
        const jsonData = await response.json();
        const cids = jsonData.map(item => item.cid);
        setCourseIds(cids);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-screen h-full top-0">
      <NavBar />
      <div className="flex-grow flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courseIds.map((course, index) => (
            <CourseDetails key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
