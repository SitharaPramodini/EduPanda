import React, { useState, useEffect } from "react";
import NavBar from "../../components/learner/NavBar";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/learner/CourseCard";

function Home() {
    const [courseIds, setCourseIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/courses/', {
                    method: 'GET'
                });
                const jsonData = await response.json();
                const cids = jsonData.map(item => item._id);
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
            <h2 className="text-2xl font-bold mb-4">All Courses</h2>
            <div className="flex-grow flex justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {courseIds.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
