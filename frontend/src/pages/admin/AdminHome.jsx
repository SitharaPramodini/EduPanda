import React from "react";
import AdNavBar from "../../components/admin/AdNavBar";
import AdSidebar from "../../components/admin/AdSideBar";

export default function AdminHome() {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full">
        <AdNavBar />
      </div>

      <div className="sm:flex sm:flex-1">
        <div className="w-64 mt-16">
          <AdSidebar />
        </div>

        <div className="flex-1 justify-center items-center mt-16">
          <h1>Admin Home</h1>
          <p>
            body of the page fcnsdv pfjcsv odspfo ipdksfk dkAFMc opoadjnl
            podjPAOJD?kf pJAdnLAHIF edjpAL Lorem Ipsum is simply dummy text of
            the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
}
