const BASE_URL =
"https://student-management-backend-qwkd.onrender.com";

function predictPerformance(){

    const data = {

        attendance:
        Number(
            document.getElementById(
                "attendance"
            ).value
        ),

        assignment:
        Number(
            document.getElementById(
                "assignment"
            ).value
        ),

        marks:
        Number(
            document.getElementById(
                "marks"
            ).value
        )
    };

    fetch(
        `${BASE_URL}/predict`,
        {
            method:'POST',
            headers:{
                'Content-Type':
                'application/json'
            },
            body:JSON.stringify(data)
        }
    )
    .then(res => res.json())
    .then(result => {

        document.getElementById(
            "predictionResult"
        ).innerText =
        result.prediction;

    });

}