import React from "react";
import { Button } from "flowbite-react";

export default function NavigatePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen mx-auto bg-[#242424]">
      <img src="/edupanda.png" className="h-60 w-auto " />

      <div className="flex flex-row gap-10 mt-5">
        <Button
          gradientDuoTone="purpleToBlue"
          className="p-2"
          href="/AdminHome"
        >
          Admin
        </Button>

        <Button
          gradientDuoTone="purpleToBlue"
          className="p-2"
          href="/instructor_home"
        >
          Instructor
        </Button>
      </div>
    </div>
  );
}
