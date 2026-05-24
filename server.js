const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/submit", (req, res) => {
  const complaint = req.body;

  let complaints = [];

  if (fs.existsSync("complaints.json")) {
    const data = fs.readFileSync("complaints.json");
    complaints = JSON.parse(data);
  }

  complaints.push(complaint);

  fs.writeFileSync(
    "complaints.json",
    JSON.stringify(complaints, null, 2)
  );

  res.json({
    message: "Complaint submitted successfully"
  });
});

app.get("/complaints", (req, res) => {
  if (fs.existsSync("complaints.json")) {
    const data = fs.readFileSync("complaints.json");
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});