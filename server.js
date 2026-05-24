const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const FILE_PATH = path.join(__dirname, "complaints.json");

// Create complaints.json if not exists
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, "[]");
}

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get complaints
app.get("/complaints", (req, res) => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Failed to read complaints" });
  }
});

// Add complaint
app.post("/complaints", (req, res) => {
  try {
    const newComplaint = req.body;

    const data = fs.readFileSync(FILE_PATH, "utf8");
    const complaints = JSON.parse(data);

    complaints.push(newComplaint);

    fs.writeFileSync(FILE_PATH, JSON.stringify(complaints, null, 2));

    res.json({
      success: true,
      message: "Complaint submitted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save complaint" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});