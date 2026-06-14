const user = JSON.parse(
localStorage.getItem("user")
);
document.getElementById(
    "dropdownStudentName"
).innerText =
user.name || "Student";

document.getElementById(
    "dropdownStudentEmail"
).innerText =
user.email || "No Email";
if(!user){

alert("Please login again");

window.location.href =
"student-login.html";

}

// Welcome Text

document.getElementById(
"welcomeText"
).innerText =
`Welcome ${user.name} 👋`;

// Sidebar Basic Info

document.getElementById(
"studentName"
).innerText =
user.name || "-";

document.getElementById(
"studentEmail"
).innerText =
user.email || "-";

document.getElementById(
"studentId"
).innerText =
user.student_id ||
user.id ||
"-";

const studentId =
user.student_id ||
user.id;

// ======================
// Load Full Profile
// ======================

fetch(
`http://127.0.0.1:5000/student/profile/${studentId}`
)
.then(response => response.json())
.then(student => {
document.getElementById(
    "studentClass"
).innerText =
student.class_name || "-";

document.getElementById(
    "studentSection"
).innerText =
student.section || "-";

})
.catch(error => {
    console.error(
    "Profile Error:",
    error
);

});

// ======================
// Attendance
// ======================

fetch(
`http://127.0.0.1:5000/student/attendance/${studentId}`
)
.then(response => response.json())
.then(data => {

document.getElementById(
    "attendancePercent"
).innerText =
data.percentage + "%";

})
.catch(error => {


console.error(error);

});

// ======================
// Marks
// ======================

fetch(
`http://127.0.0.1:5000/student/marks/${studentId}`
)
.then(response => response.json())
.then(data => {


document.getElementById(
    "averageMarks"
).innerText =
data.average_marks;

const marks =
Number(data.average_marks);

let status;

if(marks >= 90){

    status =
    "Outstanding";

}
else if(marks >= 75){

    status =
    "Good";

}
else if(marks >= 60){

    status =
    "Average";

}
else{

    status =
    "Needs Improvement";

}

const statusElement = document.getElementById(
    "performanceStatus"
);

statusElement.innerText =
status;

if(status === "Outstanding"){

    statusElement.style.color =
    "green";

}
else if(status === "Good"){

    statusElement.style.color =
    "#1976d2";

}
else if(status === "Average"){

    statusElement.style.color =
    "orange";

}
else{

    statusElement.style.color =
    "red";

}


})
.catch(error => {


console.error(error);

});
function toggleProfileMenu(){

    const menu =
    document.getElementById(
        "studentProfileDropdown"
    );

    if(menu.style.display === "block"){

        menu.style.display =
        "none";

    }
    else{

        menu.style.display =
        "block";

    }

}
function openAccountSettings(){

    localStorage.setItem(
        "settingsTab",
        "profile"
    );

    window.location.href =
    "account-settings.html";

}

function openPasswordSettings(){

    localStorage.setItem(
        "settingsTab",
        "password"
    );

    window.location.href =
    "account-settings.html";

}


fetch(
`http://127.0.0.1:5000/student/prediction/${studentId}`
)
.then(response => response.json())
.then(data => {

document.getElementById(
    "prediction"
).innerText =
data.prediction;

let insight = "";

if(data.prediction === "Excellent"){

    insight =
    "Your attendance and academic performance are excellent. Continue your current study strategy.";

}
else if(data.prediction === "Good"){

    insight =
    "Your performance is stable. Small improvements in marks can boost your academic outcome.";

}
else{

    insight =
    "Your performance requires attention. Focus on attendance and consistent study habits.";

}
document.getElementById(
    "aiInsight"
).innerText =
insight;

})
.catch(error => {
console.error(error);

document.getElementById(
    "prediction"
).innerText =
"Not Available";

document.getElementById(
    "aiInsight"
).innerText =
"AI insight is currently unavailable.";

});
