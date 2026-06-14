const BASE_URL = "http://127.0.0.1:5000";

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