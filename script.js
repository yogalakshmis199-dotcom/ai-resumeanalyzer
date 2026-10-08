const skillsList = [
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
    "AWS",
    "Docker",
    "Figma"
];

function analyzeResume() {

    const resumeText =
        document.getElementById("resumeText").value.toLowerCase();

    if (resumeText.trim() === "") {
        alert("Please paste your resume text first.");
        return;
    }

    // Detect skills
    const detectedSkills = skillsList.filter(skill =>
        resumeText.includes(skill.toLowerCase())
    );

    // Calculate score
    let score = 30;

    score += detectedSkills.length * 5;

    if (resumeText.includes("experience")) {
        score += 10;
    }

    if (resumeText.includes("education")) {
        score += 10;
    }

    if (resumeText.includes("project")) {
        score += 10;
    }

    if (resumeText.includes("certification")) {
        score += 5;
    }

    if (score > 100) {
        score = 100;
    }

    // Display score
    document.getElementById("score").textContent = score;


    // Score message
    let message = "";

    if (score >= 80) {
        message = "Excellent resume! Your profile looks strong.";
    }
    else if (score >= 60) {
        message = "Good resume, but there is room for improvement.";
    }
    else {
        message = "Your resume needs some improvements.";
    }

    document.getElementById("scoreMessage").textContent = message;


    // Display skills
    const skillsContainer =
        document.getElementById("skills");

    skillsContainer.innerHTML = "";

    if (detectedSkills.length === 0) {

        skillsContainer.innerHTML =
            "<span>No matching skills detected.</span>";

    } else {

        detectedSkills.forEach(skill => {

            const span = document.createElement("span");

            span.className = "skill";
            span.textContent = skill;

            skillsContainer.appendChild(span);
        });
    }


    // Job roles
    const jobRoles =
        document.getElementById("jobRoles");

    jobRoles.innerHTML = "";

    if (
        detectedSkills.includes("HTML") ||
        detectedSkills.includes("CSS") ||
        detectedSkills.includes("JavaScript")
    ) {
        addJobRole(jobRoles, "Frontend Developer");
    }

    if (
        detectedSkills.includes("Node.js") ||
        detectedSkills.includes("MongoDB")
    ) {
        addJobRole(jobRoles, "Backend Developer");
    }

    if (
        detectedSkills.includes("React") &&
        detectedSkills.includes("Node.js")
    ) {
        addJobRole(jobRoles, "Full Stack Developer");
    }

    if (detectedSkills.includes("Python")) {
        addJobRole(jobRoles, "Python Developer");
    }

    if (detectedSkills.includes("AWS")) {
        addJobRole(jobRoles, "Cloud / AWS Developer");
    }

    if (jobRoles.children.length === 0) {
        addJobRole(jobRoles, "Software Developer");
    }


    // Suggestions
    const suggestions =
        document.getElementById("suggestions");

    suggestions.innerHTML = "";

    if (!resumeText.includes("experience")) {
        addSuggestion(
            suggestions,
            "Add your work or internship experience."
        );
    }

    if (!resumeText.includes("project")) {
        addSuggestion(
            suggestions,
            "Add your important projects."
        );
    }

    if (!resumeText.includes("education")) {
        addSuggestion(
            suggestions,
            "Include your education details."
        );
    }

    if (!resumeText.includes("certification")) {
        addSuggestion(
            suggestions,
            "Add relevant certifications."
        );
    }

    if (detectedSkills.length < 3) {
        addSuggestion(
            suggestions,
            "Add more relevant technical skills."
        );
    }

    if (suggestions.children.length === 0) {
        addSuggestion(
            suggestions,
            "Your resume has a good structure. Keep it updated."
        );
    }
}


// Add job role
function addJobRole(list, role) {

    const li = document.createElement("li");

    li.textContent = role;

    list.appendChild(li);
}


// Add suggestion
function addSuggestion(list, text) {

    const li = document.createElement("li");

    li.textContent = text;

    list.appendChild(li);
}