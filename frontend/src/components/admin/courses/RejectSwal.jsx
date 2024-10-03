import Swal from "sweetalert2";

export default async function RejectSwal(courseId, courseName, instructorEmail) {
  const { value: reason } = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    background: "#1F2937",
    color: "#E5E7EB",
    confirmButtonText: "Yes, reject it!",
    iconColor: "#d33",
    input: 'textarea',
    inputLabel: 'Reason for rejection',
    inputPlaceholder: 'Enter your reason here...',
    inputAttributes: {
      'rows': 4
    }
  });

  if (reason) {
    try {
      const response = await fetch(`http://localhost:5001/api/courses/reject/${courseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason })
      });

      if (!response.ok) {
        throw new Error("Failed to reject the course");
      }

      // Send email with rejection reason
      const emailData = {
        to: `${instructorEmail}`, 
        subject: "Course Rejected",
        text: `The course " ${courseName} " has been rejected for the following reason: ${reason}`
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

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        throw new Error(`Failed to send email: ${errorText}`);
      }

      Swal.fire({
        title: "Rejected!",
        text: `Course Rejected Reason: ${reason}`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        iconColor: "#d33",
        background: "#1F2937",
        color: "#E5E7EB"
      });

      // Here you can update the UI as needed, e.g., remove the rejected course from the list
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to reject the course",
        icon: "error",
        confirmButtonColor: "#3085d6",
        background: "#1F2937",
        color: "#E5E7EB"
      });
    }
  }
}
