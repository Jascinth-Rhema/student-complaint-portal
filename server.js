const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const Complaint = require("./models/complaints");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// AI Complaint Categorization Function
function getCategory(text) {
if (!text) return "General";

text = text.toLowerCase();

if (
text.includes("lab") ||
text.includes("projector") ||
text.includes("computer")
) {
return "Lab Issues";
}

if (
text.includes("library") ||
text.includes("book")
) {
return "Library Issues";
}

if (
text.includes("bus") ||
text.includes("transport")
) {
return "Transport Issues";
}

if (
text.includes("hostel") ||
text.includes("room")
) {
return "Hostel Issues";
}

if (
text.includes("fan") ||
text.includes("light") ||
text.includes("classroom") ||
text.includes("bench")
) {
return "Infrastructure Issues";
}

if (
text.includes("exam") ||
text.includes("faculty") ||
text.includes("teacher") ||
text.includes("class")
) {
return "Academic Issues";
}

return "Administration Issues";
}

// Home Page
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Submit Complaint
app.post("/complaints", async (req, res) => {
try {
const complaint = req.body;

```
complaint.aiCategory = getCategory(
  complaint.description || complaint.problem || ""
);

await Complaint.create(complaint);

res.json({
  success: true,
  category: complaint.aiCategory,
  message: "Complaint Submitted Successfully!"
});
```

} catch (error) {
console.error(error);
res.status(500).json({
success: false,
message: "Error Submitting Complaint"
});
}
});

// Get All Complaints
app.get("/complaints", async (req, res) => {
try {
const complaints = await Complaint.find()
.sort({ createdAt: -1 });

```
res.json(complaints);
```

} catch (error) {
console.error(error);
res.status(500).json([]);
}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
