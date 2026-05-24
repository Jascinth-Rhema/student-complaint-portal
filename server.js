const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Public folder serve panna
app.use(express.static(path.join(__dirname, "public")));

// Homepage route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Complaints file
const complaintsFile = path.join(__dirname, "complaints.json");

// Get all complaints
app.get("/complaints", (req, res) => {
  if (fs.existsSync(complaintsFile)) {
    const data = fs.readFileSync(complaintsFile);
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

// Add complaint
app.post("/complaints", (req, res) => {
  let complaints = [];

  if (fs.existsSync(complaintsFile)) {
    complaints = JSON.parse(fs.readFileSync(complaintsFile));
  }

  complaints.push(req.body);

  fs.writeFileSync(
    complaintsFile,
    JSON.stringify(complaints, null, 2)
  );

  res.json({
    message: "Complaint submitted successfully"
  });
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});