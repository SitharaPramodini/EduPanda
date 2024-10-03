import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const [courseDetails, setCourseDetails] = useState(null);
    const [bought, setBought] = useState(false);

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


    useEffect(() => {
        const fetchBought = async () => {
            try {
                const response = await fetch(`http://localhost:5003/api/enrollments/663b397718ded1c9b2515d1c/${course}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    const json = await response.json();
                    setBought(true);
                } else {
                    console.log('Error fetching course details');
                }
            } catch (error) {
                console.log('Error fetching course ', error);
            }
        };

        fetchBought();
    }, [course]);


    const handleBuyClick = async () => {
        const stripe = await loadStripe("pk_test_51PEW6X087utRYQow5L8XVGunjUzQUeNYFwL4wZge2q8xMLxntDzD9E5lPS5zRlwjiMAuDJuNOxCX39Cm3QYPDsSv00G9BRoe4B");

        const body = {
            amount: courseDetails.price,
            currency: "usd",
            title: courseDetails.title,
            cid: courseDetails._id,
            uid: "663b397718ded1c9b2515d1c"
        }
        console.log("body", body);


        const headers = {
            "Content-Type": "application/json",
        }

        const response = await fetch("http://localhost:5003/api/enrollments/create-checkout-session", {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error);

        }
    }

    // if (courseDetails) {
    //     navigate(`/purchase/${courseDetails._id}`);
    // }


    return (
        <div className="max-w-md min-w-full mx-auto bg-gray-200 shadow-lg rounded-lg overflow-hidden my-8">
            {courseDetails && (
                <div className="p-4 flex flex-col h-full">
                    <div>
                        <h2 className="text-xl text-gray-700 mb-3 font-semibold">{courseDetails.title}</h2>
                        <p className="text-gray-700"><strong>Description: </strong>{courseDetails.description}</p>
                        <p className="text-gray-700"><strong>Price: </strong>${courseDetails.price}</p>
                        <p className="text-gray-700"><strong>Level: </strong>{courseDetails.level}</p>
                        <p className="text-gray-700"><strong>Duration: </strong>{courseDetails.duration} hours</p>
                        <p className="text-gray-700"><strong>Tags: </strong>{courseDetails.tags.join(', ')}</p>
                    </div>
                    <div className="mt-auto">
                        {!bought && <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4" onClick={handleBuyClick}>Buy Now</button>}</div>
                </div>
            )}
        </div>
    );
};

export default CourseCard;
