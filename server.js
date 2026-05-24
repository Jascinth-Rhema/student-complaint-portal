<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Student Complaint Portal</title>

  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      display: flex;
      background: #f4f4f4;
    }

    .sidebar {
      width: 250px;
      background: #5a0033;
      color: white;
      min-height: 100vh;
      padding: 20px;
    }

    .sidebar h2 {
      margin-bottom: 20px;
    }

    .sidebar ul {
      list-style: none;
      padding: 0;
    }

    .sidebar ul li {
      padding: 12px 0;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }

    .main {
      flex: 1;
      padding: 40px;
    }

    .form-container {
      background: white;
      padding: 30px;
      border-radius: 10px;
      max-width: 600px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    input,
    select,
    textarea,
    button {
      width: 100%;
      margin-top: 15px;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }

    button {
      background: #5a0033;
      color: white;
      border: none;
      cursor: pointer;
    }

    button:hover {
      background: #7a0045;
    }

    h1 {
      color: #5a0033;
    }
  </style>
</head>

<body>

  <div class="sidebar">
    <h2>Categories</h2>

    <ul>
      <li>Academic Issues</li>
      <li>Infrastructure Issues</li>
      <li>Lab Issues</li>
      <li>Library Issues</li>
      <li>Administration Issues</li>
      <li>Transport Issues</li>
      <li>Safety & Security</li>
      <li>Technical Support</li>
    </ul>
  </div>

  <div class="main">

    <h1>E - Edu Govern</h1>

    <div class="form-container">

      <h2>Student Complaint Form</h2>

      <form id="complaintForm">

        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          required
        />

        <input
          type="text"
          id="department"
          placeholder="Enter department"
          required
        />

        <select id="category" required>
          <option value="">Select Category</option>
          <option>Academic Issues</option>
          <option>Infrastructure Issues</option>
          <option>Lab Issues</option>
          <option>Library Issues</option>
          <option>Administration Issues</option>
          <option>Transport Issues</option>
          <option>Safety & Security</option>
          <option>Technical Support</option>
        </select>

        <input
          type="text"
          id="problem"
          placeholder="Enter problem"
          required
        />

        <textarea
          id="description"
          placeholder="Describe your complaint"
          rows="5"
          required
        ></textarea>

        <button type="submit">
          Submit Complaint
        </button>

      </form>

    </div>

  </div>

  <script>

    document
      .getElementById("complaintForm")
      .addEventListener("submit", async function (e) {

        e.preventDefault();

        const data = {
          name: document.getElementById("name").value,
          department: document.getElementById("department").value,
          category: document.getElementById("category").value,
          problem: document.getElementById("problem").value,
          description: document.getElementById("description").value,
        };

        try {

          const response = await fetch("/complaints", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();

          alert(result.message);

          document.getElementById("complaintForm").reset();

        } catch (error) {

          console.log(error);

          alert("Error submitting complaint");

        }

      });

  </script>

</body>
</html>