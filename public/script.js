document.getElementById("complaintForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const complaintData = {
    name: document.getElementById("name").value,
    registerNumber: document.getElementById("registerNumber").value,
    department: document.getElementById("department").value,
    category: document.getElementById("category").value,
    problem: document.getElementById("problem").value,
    description: document.getElementById("description").value
  };

  try {
    const response = await fetch("/complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(complaintData)
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById("message").innerHTML =
        "Complaint Submitted Successfully!";

      document.getElementById("complaintForm").reset();
    } else {
      document.getElementById("message").innerHTML =
        "Error Submitting Complaint";
    }

  } catch (error) {
    console.log(error);

    document.getElementById("message").innerHTML =
      "Error Submitting Complaint";
  }
});