const BASE_URL =
"http://127.0.0.1:5000";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadAttendance();

    }
);

function loadAttendance(){

    const user =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    );

    fetch(
        `${BASE_URL}/student/attendance/${user.student_id}`
    )
    .then(res => res.json())
    .then(data => {

        document.getElementById(
            "attendancePercentage"
        ).innerText =
        `${data.percentage}%`;

        let rows = "";

        data.attendance.forEach(
            record => {

                rows += `
                <tr>

                    <td>
                        ${record.attendance_date}
                    </td>

                    <td>
                        ${record.status}
                    </td>

                </tr>
                `;
            }
        );

        document.getElementById(
            "attendanceTable"
        ).innerHTML =
        rows;

    });

}