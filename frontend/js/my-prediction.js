const BASE_URL =
"http://127.0.0.1:5000";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadPrediction();

    }
);

function loadPrediction(){

    const user =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    );

    fetch(
        `${BASE_URL}/student/prediction/${user.student_id}`
    )
    .then(res => res.json())
    .then(data => {

        document.getElementById(
            "attendancePercentage"
        ).innerText =
        data.attendance_percentage + "%";

        document.getElementById(
            "averageMarks"
        ).innerText =
        data.average_marks;

        document.getElementById(
            "predictionResult"
        ).innerText =
        data.prediction;

        // Performance Score

        const score =
        (
            data.attendance_percentage * 0.4 +
            data.average_marks * 0.6
        ).toFixed(0);

        document.getElementById(
            "performanceScore"
        ).innerText =
        score + "/100";

        // Academic Trend

        let trend;

        if(score >= 85){

            trend =
            "Strong Academic Progress";

        }
        else if(score >= 70){

            trend =
            "Stable Performance";

        }
        else{

            trend =
            "Needs Improvement";

        }

        document.getElementById(
            "academicTrend"
        ).innerText =
        trend;

    })
    .catch(error => {
        console.error(error);
    });
//         document.getElementById(
//             "attendancePercentage"
//         ).innerText =
//         `${data.attendance_percentage}%`;

//         document.getElementById(
//             "averageMarks"
//         ).innerText =
//         data.average_marks;

//         document.getElementById(
//             "predictionResult"
//         ).innerText =
//         data.prediction;

//     });

}