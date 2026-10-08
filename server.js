const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


// Home route
app.get("/", (req, res) => {

    res.json({
        message: "AI Resume Analyzer Backend is running!"
    });

});


// Analyze resume
app.post("/analyze", (req, res) => {

    const { resumeText } = req.body;

    if (!resumeText) {

        return res.status(400).json({
            message: "Resume text is required."
        });

    }

    const text = resumeText.toLowerCase();

    const skills = [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "Java",
        "SQL",
        "MongoDB",
        "Git",
        "GitHub",
        "AWS"
    ];

    const detectedSkills = skills.filter(skill =>
        text.includes(skill.toLowerCase())
    );

    let score = 30 + detectedSkills.length * 5;

    if (text.includes("experience")) score += 10;
    if (text.includes("education")) score += 10;
    if (text.includes("project")) score += 10;

    if (score > 100) {
        score = 100;
    }

    res.json({
        score: score,
        skills: detectedSkills,
        message: "Resume analyzed successfully."
    });

});


app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});