const BASE_URL = "http://127.0.0.1:5000";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const today =
        new Date()
        .toISOString()
        .split('T')[0];

        document.getElementById(
            "selectedDate"
        ).value = today;

        loadAttendanceByDate();

    }
);

function loadAttendanceByDate(){

    const date =
    document.getElementById(
        "selectedDate"
    ).value;

    if(!date){

        alert(
            "Please select a date"
        );

        return;
    }

    fetch(
        `${BASE_URL}/attendance/${date}`
    )
    .then(res => res.json())
    .then(data => {

        let rows = "";

        data.forEach(student => {

            rows += `
            <tr>
                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${student.class_name}</td>

                <td>${student.section}</td>
                
                <td>

                    <select
                    id="status-${student.id}">

                        <option value="Not Marked"
                        ${student.status === 'Not Marked'
                        ? 'selected' : ''}>
                        Not Marked
                        </option>

                        <option
                        value="Present"
                        ${student.status === 'Present'
                        ? 'selected' : ''}>
                        Present
                        </option>

                        <option
                        value="Absent"
                        ${student.status === 'Absent'
                        ? 'selected' : ''}>
                        Absent
                        </option>

                    </select>

                </td>

                <td>

                    <button
                    onclick="
                    updateAttendance(
                    ${student.id}
                    )">

                    Update

                    </button>

                </td>

            </tr>
            `;
        });

        document.getElementById(
            "attendanceTable"
        ).innerHTML = rows;

    });

}
function updateAttendance(studentId){

    const date =
    document.getElementById(
        "selectedDate"
    ).value;

    const status =
    document.getElementById(
        `status-${studentId}`
    ).value;
    if(status === "Not Marked"){

        alert(
          "Please select Present or Absent"
        );

        return;
    }
    fetch(
        `${BASE_URL}/attendance`,
        {
            method:'POST',

            headers:{
                'Content-Type':
                'application/json'
            },

            body:JSON.stringify({

                student_id: studentId,

                attendance_date: date,

                status: status

            })
        }
    )
    .then(res => res.json())
    .then(data => {

        alert(data.message);

    });

}