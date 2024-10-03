import React from "react";
import NavBar from "../../components/learner/NavBar";
import { useNavigate } from "react-router-dom";

function Cancel() {

  const navigate = useNavigate();

  return (
    
      
      <div className="flex flex-col gap-10 grow justify-center items-center w-screen h-full">
        
        <button onClick={()=> navigate("/create_new_course")} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Failure</button>
      </div>
        
    
  );
}

export default Cancel;
