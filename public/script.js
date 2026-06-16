document.getElementById("complaintForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = {
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    document.getElementById("message").textContent = result.message;
    this.reset();
  } catch (error) {
    document.getElementById("message").textContent = "Error submitting complaint.";
    console.error(error);
  }
});
