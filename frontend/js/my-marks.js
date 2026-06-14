const BASE_URL =
"http://127.0.0.1:5000";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadMarks();

    }
);

function loadMarks(){

    const user =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    );

    fetch(
        `${BASE_URL}/student/marks/${user.student_id}`
    )
    .then(res => res.json())
    .then(data => {

        document.getElementById(
            "averageMarks"
        ).innerText =
        data.average_marks;

        let rows = "";

        data.marks.forEach(
            mark => {

                rows += `
                <tr>

                    <td>
                        ${mark.subject}
                    </td>

                    <td>
                        ${mark.marks}
                    </td>

                </tr>
                `;
            }
        );

        document.getElementById(
            "marksTable"
        ).innerHTML =
        rows;

    });

}