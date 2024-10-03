import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CourseDetails = ({ course }) => {
    const navigate = useNavigate();
    const [courseDetails, setCourseDetails] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/courses/${course}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    const json = await response.json();
                    setCourseDetails(json);
                } else {
                    console.log('Error fetching course details');
                }
            } catch (error) {
                console.log('Error fetching course ', error);
            }
        };

        fetchCourseDetails();
    }, [course]);

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
            {courseDetails && (
                <div className="p-4">
                    <h2 className="text-xl text-gray-700 mb-3 font-semibold">{courseDetails.title}</h2>
                    <p className="text-gray-700"><strong>Description: </strong>{courseDetails.description}</p>
                    <p className="text-gray-700"><strong>Price: </strong>${courseDetails.price}</p>
                    <p className="text-gray-700"><strong>Level: </strong>{courseDetails.level}</p>
                    <p className="text-gray-700"><strong>Duration: </strong>{courseDetails.duration} hours</p>
                    <p className="text-gray-700"><strong>Tags: </strong>{courseDetails.tags.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
