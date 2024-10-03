import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import React from "react";

//pages
import NavigatePage from "./pages/NavigatePage"
import LandingPage from "./pages/LandingPage"

//admin
import AdminHome from './pages/admin/AdminHome';
import ViewAllCourses from './pages/admin/courses/ViewAllCourses';
import NewCourses from './pages/admin/courses/NewCourses';
import UpdatedCourses from './pages/admin/courses/UpdatedCourses';
import Users from './pages/admin/users/users';
import Finance from './pages/admin/finance/Finance';

//Instructor
import InstructorHome from './pages/instructor/InstructorHome';
import CourseManagement from './pages/instructor/CourseManagement';
import ProgressMonitoring from './pages/instructor/ProgressMonitoring';
import FeedbackAndReviews from './pages/instructor/FeedbackAndReviews';
import Profile from './pages/instructor/Profile';
import CreateNewCourse from './pages/instructor/CreateNewCourse';


//Learner
import LearnerDashboard from './pages/learner/LearnerDashboard'
import MyCourses from './pages/learner/MyCourses'

import Login from './pages/Auth/LoginPage';
import Register from './pages/Auth/RegisterPage';

import MyProfile from './pages/admin/Myprofile/MyProfile';
import ResetPassword from './pages/Auth/ResetPassword';
import ForgotPassword from './pages/Auth/ForgotPassword';
import InstructorMyProfile from './pages/instructor/Myprofile/InstructorMyProfile';
import InstructorReg from './pages/Auth/InstructorReg';

// import MyProfile from './pages/Myprofile/MyProfile';

import LearnerHome from './pages/learner/Home'
import Success from './pages/learner/Success'
import Cancel from './pages/learner/Cancel'
import LearnerMyProfile from './pages/learner/Myprofile/LearnerMyProfile';


function App() {

  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          {/* Test - Remove later */}
          {/* <Route path="/" element={<NavigatePage />} /> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/instructor/register" element={<InstructorReg />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/instructor_profile" element={<InstructorMyProfile />} />
          <Route path="/learner_profile" element={<LearnerMyProfile />} />
          <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />


          {/* admin */}
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/ViewAllCourses" element={<ViewAllCourses />} />
          <Route path="/NewCourses" element={<NewCourses />} />
          <Route path="/UpdatedCourses" element={<UpdatedCourses />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Finance" element={<Finance />} />
        

          {/* Instructor */}
          <Route path="/instructor_home" element={<InstructorHome />} />
          <Route path="/course_management" element={<CourseManagement />} />
          <Route path="/progress_monitoring" element={<ProgressMonitoring />} />
          <Route path="/feedback_and_reviews" element={<FeedbackAndReviews />} />
          <Route path="/instructor_profile" element={<Profile />} />
          <Route path="/create_new_course" element={<CreateNewCourse />} />


          {/* learner */}
          <Route path="/LearnerDashboard" element={<LearnerDashboard />} />
          <Route path="/MyCourses" element={<MyCourses />} />
          <Route path="/Home" element={<LearnerHome />} />
          <Route path="/Success" element={<Success />} />
          <Route path="/Cancel" element={<Cancel />} />

        </Routes>
      </BrowserRouter>
    
  
    </>
  )
}

export default App
