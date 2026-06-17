const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const DATA_FILE = path.join(__dirname, "complaints.json");

// create file if not exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]");
}

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Submit Complaint
app.post("/complaints", (req, res) => {
  try {
    const complaints = JSON.parse(fs.readFileSync(DATA_FILE));

    const newComplaint = {
      ...req.body,
      id: Date.now()
    };

    complaints.push(newComplaint);

    fs.writeFileSync(DATA_FILE, JSON.stringify(complaints, null, 2));

    res.json({
      success: true,
      message: "Complaint Submitted Successfully!"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error saving complaint"
    });
  }
});

// Get Complaints
app.get("/complaints", (req, res) => {
  const complaints = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(complaints);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});