import Swal from "sweetalert2";

export default async function ApproveSwal(courseId, courseName, instructorEmail) {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#057A55",
      cancelButtonColor: "#d33",
      background: "#1F2937",
      confirmButtonText: "Yes, accept it!",
      color: "#E5E7EB",
      iconColor: "#3F83F8"
    });

    if (result.isConfirmed) {
      const response = await fetch(
        `http://localhost:5001/api/courses/approve/${courseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve the course");
      }

      // Assuming the server returns JSON with approved course data
      const approvedCourse = await response.json();

      // Send email
      const emailData = {
        to: `${instructorEmail}`, // Change to appropriate email address
        subject: "Course Approved",
        text: `The course "${courseName}" has been approved.`
      };

      const emailResponse = await fetch(
        "http://localhost:9123/send-email", // Change the URL to your backend endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(emailData)
        }
       
      );

      console.log(JSON.stringify(emailData));
      
      // Check if email sending was successful
      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        throw new Error(`Failed to send email: ${errorText}`);
      }

      // No need to parse JSON, as we expect a plain text response

      Swal.fire({
        title: "Approved",
        text: `Course has been successfully approved`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        iconColor: "#057A55",
        background: "#1F2937",
        color: "#E5E7EB"
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: error.message || "Failed to approve the course",
      icon: "error",
      confirmButtonColor: "#1A56DB",
      background: "#1F2937",
      color: "#E5E7EB"
    });
  }
}
