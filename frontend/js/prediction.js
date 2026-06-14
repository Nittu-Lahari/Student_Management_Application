const BASE_URL = "http://127.0.0.1:5000";

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