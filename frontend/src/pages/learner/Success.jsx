import React, { useEffect } from "react";
import NavBar from "../../components/learner/NavBar";
import { useNavigate } from "react-router-dom";

function Success() {

  useEffect(() => {
    const sendEmail = async () => {
      const emailData = {
        to: `ashensavindagunasekara@gmail.com`,
        subject: "Course Approved",
        text: `The course has been purchased.`
      };
      
      console.log(JSON.stringify(emailData));
      const emailResponse = await fetch(
        "http://localhost:3000/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(emailData)
        }
      );
  
  
      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        throw new Error(`Failed to send email: ${errorText}`);
      }
    };

    const sendSMS = async () => {
      const smsData = {
        to: '+94720706833',
        text: 'The course has been purchased.'
      };
  
      console.log(JSON.stringify(smsData));
      const smsResponse = await fetch(
        "http://localhost:3001/send-sms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(smsData)
        }
      );
  
  
      if (!smsResponse.ok) {
        const errorText = await smsResponse.text();
        throw new Error(`Failed to send sms: ${errorText}`);
      }
    };
  
    sendEmail();
    // sendSMS();
  }, []);



  const navigate = useNavigate();



  return (
    
      
      <div className="flex flex-col gap-10 grow justify-center items-center w-screen h-full">
        
        <button onClick={()=> navigate("/mycourses")} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Success</button>
      </div>
        
    
  );
}

export default Success;
