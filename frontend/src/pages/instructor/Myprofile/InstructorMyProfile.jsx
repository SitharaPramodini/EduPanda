import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "../../../components/instructor/NavBar";
import './instructorProfile.css'



const InstructorMyProfile = () => {
  const [passwordformData, setpasswordFormData] = useState({
    oldPassword: '',
    password: '',
  });
  


  const handlePwdInputChange = (e) => {
    setpasswordFormData({
      ...passwordformData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(
      'http://localhost:5002/api/users/changepassword',
      passwordformData,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    .then(response => {
      console.log(response.data);
      toast.success('password changed successfully');
    })
    .catch(error => {
      console.error('Error changing password:', error);
      toast.error('check the details');
    });
  };

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [imageURL, setImageURL] = useState(""); // Added state to hold image URL

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    phone: '',
    photo: ''
  });

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5002/api/users/getuser', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data);
        setFormData({
          name: response.data.name,
          bio: response.data.bio,
          phone: response.data.phone,
          photo: profileImage ? imageURL : response.data.photo,
        });
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
    }
  }, [token]);

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Handle Image upload
    if (
      profileImage &&
      (profileImage.type === "image/jpeg" ||
        profileImage.type === "image/jpg" ||
        profileImage.type === "image/png")
    ) {
      const image = new FormData();
      image.append("file", profileImage);
      image.append("cloud_name", "dqwgbpf2d");
      image.append("upload_preset", "cqwykn6c");

      try {
        // First save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dqwgbpf2d/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        setImageURL(imgData.url.toString());

        // Update user data
        const updatedData = { ...formData, photo: imgData.url.toString() };
        const responseUpdate = await axios.put('http://localhost:5002/api/users/updateuser', updatedData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
       
        setUser(responseUpdate.data);
        setShowUpdateForm(false);
        toast.success('User details updated successfully');
      } catch (error) {
        console.error('Error updating user details:', error);
        toast.error('Failed to update user details');
      }
    }
  };


  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Define a function to fetch instructor courses
    const fetchInstructorCourses = async () => {
      try {
        // Make a GET request to your backend API to fetch instructor courses
        const response = await axios.get('http://localhost:5002/api/users/AsignedCourses', {
          headers: {
            Authorization: `Bearer ${token}` // Include your JWT token here
          }
        });
        // Extract the titles from the response data
        const { titles } = response.data;
        // Update the state with the fetched titles
        setCourses(titles);
      } catch (error) {
        console.error('Error fetching instructor courses:', error);
      }
    };

    // Call the fetchInstructorCourses function when the component mounts
    fetchInstructorCourses();
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts


  return (
    <div className="flex flex-col w-screen h-full top-0">
     <div className="flex flex-col grow-0">
        <NavBar />
      </div>

    
      {user ? (
      <div className="profilebg-gray-100">
        <div className="container mx-auto profilepy-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-5">
              <div className="bg-white profileshadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={user.photo} // Update src attribute to use formData
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    alt="User Profile"
                  />

                  <h1 className="text-xl font-bold">{formData.name}</h1>
                  <p className="profiletext-gray-700">{user.role}</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <button onClick={handleUpdateClick} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                      Update
                    </button>
                    
                  </div>
                </div>
                <hr className="my-6 border-t border-gray-300"></hr>
                <div className="flex flex-col">
                  <span className="profiletext-gray-700 font-bold tracking-wider mb-2">{user.email}</span>
                  <span className="profiletext-gray-700 font-bold tracking-wider mb-2">{formData.phone}</span>
                </div>





    <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700" style={{ marginTop: '20px' }}>
    <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Assigned Courses</h5>
        <a href="/MyCourses" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View
        </a>
   </div>
   <div class="flow-root">
   {courses.length === 0 ? (
        <p>No courses assigned yet.</p>
      ) : (
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          {courses.map((course, index) => (
            <li key={index}>
                <div class="flex items-center">
                    
                    <div class="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white" style={{ margin: '10px' }}>
                    {course}
                        </p>
                        
                    </div>
                    
                </div>
            </li>


))}
        </ul>
       )}
</div>
</div>


              </div>
            </div>
            <div className="col-span-4 sm:col-span-7">
              <div className="bg-white profileshadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">About Me</h2>
                <p className="profiletext-gray-700">{formData.bio}</p>

                <div className={`fixed inset-0 flex items-center justify-center z-50 ${showUpdateForm ? 'block' : 'hidden'}`}>
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  <div className="profile">
                    <h2 className="updateprofile">Update Profile</h2>
                    <form method='post'>
                      <div className="mb-4">
                        <label className="block profiletext-gray-700 text-sm font-bold mb-2" htmlFor="name">
                          Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 profiletext-gray-700 leading-tight focus:outline-none focus:profileshadow-outline"
                          id="name"
                          type="text"
                          placeholder="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block profiletext-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                          Bio
                        </label>
                        <textarea
                          className="appearance-none border rounded w-full py-2 px-3 profiletext-gray-700 leading-tight focus:outline-none focus:profileshadow-outline"
                          id="bio"
                          placeholder="Bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block profiletext-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                          Phone
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 profiletext-gray-700 leading-tight focus:outline-none focus:profileshadow-outline"
                          id="phone"
                          type="text"
                          placeholder="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-4">
                      <label className="block profiletext-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                          Photo
                        </label>
                          <input type="file" accept="image/*" onChange={handleImageChange} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:profileshadow-outline"
                          onClick={handleFormSubmit}
                        >
                          Update Profile
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowUpdateForm(false)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:profileshadow-outline"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>



                <h3 class="font-semibold text-center mt-3 -mb-2">
                        Find me on
                    </h3>
                    <div class="flex justify-center items-center gap-6 my-6">
                        <a class="profiletext-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds LinkedIn" href=""
                            target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-6">
                                <path fill="currentColor"
                                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z">
                                </path>
                            </svg>
                        </a>
                        <a class="profiletext-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds YouTube" href=""
                            target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="h-6">
                                <path fill="currentColor"
                                    d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z">
                                </path>
                            </svg>
                        </a>
                        <a class="profiletext-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds Facebook" href=""
                            target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="h-6">
                                <path fill="currentColor"
                                    d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
                                </path>
                            </svg>
                        </a>
                        <a class="profiletext-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds Instagram" href=""
                            target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-6">
                                <path fill="currentColor"
                                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
                                </path>
                            </svg>
                        </a>
                        <a class="profiletext-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds Twitter" href=""
                            target="_blank">
                            <svg class="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor"
                                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z">
                                </path>
                            </svg>
                        </a>
                    </div>


  <div class="w-full p-6 bg-white rounded-lg profileshadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
          </h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
      </div>
      <div>
        <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
        <input type="password" name="oldPassword" id="oldPassword" value={passwordformData.oldPassword} onChange={handlePwdInputChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
        <input type="password" name="password" id="password" value={passwordformData.password} onChange={handlePwdInputChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
      </div>
      {/* <div>
        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" value={passwordformData.confirmPassword} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
      </div> */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input id="newsletter" name="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Terms and Conditions</a></label>
        </div>
      </div>
      <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset Password</button>
    </form>
      </div>
              </div>
            </div>
            
          </div>
          
        </div>
        
      </div>
      ) : (
              <p>Loading...</p>
            )}
    </div>
  );
}

export default InstructorMyProfile;
