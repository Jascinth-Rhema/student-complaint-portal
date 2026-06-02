const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const complaintsFile = path.join(__dirname, "complaints.json");

if (!fs.existsSync(complaintsFile)) {
    fs.writeFileSync(complaintsFile, "[]");
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/complaints", (req, res) => {

    try {

        const complaint = req.body;

        const data = fs.readFileSync(
            complaintsFile,
            "utf8"
        );

        const complaints = JSON.parse(data);

        complaints.push(complaint);

        fs.writeFileSync(
            complaintsFile,
            JSON.stringify(
                complaints,
                null,
                2
            )
        );

        res.json({
            success: true,
            message: "Complaint Submitted Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error Submitting Complaint"
        });

    }

});

app.get("/complaints", (req, res) => {

    const data = fs.readFileSync(
        complaintsFile,
        "utf8"
    );

    res.json(
        JSON.parse(data)
    );

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});