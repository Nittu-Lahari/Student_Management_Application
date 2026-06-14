const BASE_URL =
"https://student-management-backend-qwkd.onrender.com";

function generateReport(){

    const id =
    document.getElementById(
        "studentId"
    ).value;

    fetch(
        `${BASE_URL}/report/${id}`
    )
    .then(res => res.json())
    .then(data => {

        document.getElementById(
            "reportContent"
        ).innerText =
        data.report;

    });

}