const BASE_URL =
"http://127.0.0.1:5000";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadReport();

    }
);

function loadReport(){

    const user =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    );

    fetch(
        `${BASE_URL}/student/report/${user.student_id}`
    )
    .then(res => res.json())
    .then(data => {

        let strengths = "";

        data.strengths.forEach(item => {

            strengths +=
            `<li>${item}</li>`;

        });

        let improvements = "";

        data.improvements.forEach(item => {

            improvements +=
            `<li>${item}</li>`;

        });

        document.getElementById(
            "reportContainer"
        ).innerHTML = `

        <h2>
        ${data.student_name}
        </h2>

        <p>
        Attendance:
        ${data.attendance}%
        </p>

        <p>
        Average Marks:
        ${data.average_marks}
        </p>

        <p>
        Prediction:
        ${data.prediction}
        </p>

        <h3>
        Strengths
        </h3>

        <ul>
        ${strengths}
        </ul>

        <h3>
        Areas For Improvement
        </h3>

        <ul>
        ${improvements}
        </ul>
        `;
    });

}