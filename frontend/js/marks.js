const BASE_URL = "http://127.0.0.1:5000";

document.addEventListener(
    "DOMContentLoaded",
    () => {
        loadMarks();
        loadStudentsForFilters();
        loadSubjects();
        loadMarksSummary();
    }
);

function loadMarks(){

    const studentId =
    document.getElementById(
        "studentFilter"
    ).value;
    
    const subject =
    document.getElementById(
        "subjectFilter"
    ).value;
    
    let url = `${BASE_URL}/marks?`;
    
    if(studentId){
        url += `student_id=${studentId}&`;
    }
    
    if(subject){
        url += `subject=${subject}`;
    }
    
    fetch(url)
    .then(res => res.json())
    .then(data => {

        let rows = "";

        data.forEach(mark => {

            rows += `
            <tr>

                <td>${mark.id}</td>
                <td>${mark.name}</td>
                <td>${mark.subject}</td>
                <td>${mark.marks}</td>
                <td>

                <button
                onclick="editMarks(
                ${mark.id},
                ${mark.student_id},
                '${mark.subject}',
                ${mark.marks}
                )">
                Edit
                </button>

                <button
                onclick="deleteMarks(${mark.id})">
                Delete
                </button>

                </td>

            </tr>
            `;
        });

        document.getElementById(
            "marksTable"
        ).innerHTML = rows;

    });

}
function editMarks(
id,
studentId,
subject,
marks
){

    document.getElementById(
        "marksId"
    ).value = id;

    document.getElementById(
        "student_id"
    ).value = studentId;

    document.getElementById(
        "subject"
    ).value = subject;

    document.getElementById(
        "marks"
    ).value = marks;

    document.getElementById(
        "marksFormTitle"
    ).innerText =
    "Edit Marks";

    document.getElementById(
        "marksFormContainer"
    ).style.display =
    "block";

}
// add marks
function saveMarks(){

    const marksId =
    document.getElementById(
        "marksId"
    ).value;

    const marksData = {

        student_id:
        document.getElementById(
            "student_id"
        ).value,

        subject:
        document.getElementById(
            "subject"
        ).value,

        marks:
        document.getElementById(
            "marks"
        ).value

    };

    let url = `${BASE_URL}/marks`;
    let method = 'POST';

    if(marksId){

        url =
        `${BASE_URL}/marks/${marksId}`;

        method = 'PUT';
    }

    fetch(
        url,
        {
            method: method,

            headers:{
                'Content-Type':
                'application/json'
            },

            body:JSON.stringify(
                marksData
            )
        }
    )
    .then(res => res.json())
    .then(data => {

        loadMarks();

        loadMarksSummary();

        document.getElementById(
            "marksId"
        ).value = "";

        document.getElementById(
            "student_id"
        ).value = "";

        document.getElementById(
            "subject"
        ).value = "";

        document.getElementById(
            "marks"
        ).value = "";

        document.getElementById(
            "marksFormTitle"
        ).innerText =
        "Add Marks";

        toggleMarksForm();

        alert(data.message);

    });
}
function deleteMarks(id){

    const confirmDelete =
    confirm(
        "Are you sure you want to delete this record?"
    );

    if(!confirmDelete){
        return;
    }

    fetch(
        `${BASE_URL}/marks/${id}`,
        {
            method:'DELETE'
        }
    )
    .then(res => res.json())
    .then(data => {

        loadMarks();

        loadMarksSummary();

        alert(data.message);

    });

}
function toggleMarksForm(){

    const form =
    document.getElementById(
        "marksFormContainer"
    );

    if(form.style.display === "none"){

        form.style.display = "block";

    }
    else{

        form.style.display = "none";

    }

}
function loadStudentsForFilters(){

    fetch(`${BASE_URL}/students`)
    .then(res => res.json())
    .then(data => {

        let studentOptions =
        `<option value="">
            All Students
        </option>`;

        let addOptions =
        `<option value="">
            Select Student
        </option>`;

        data.forEach(student => {

            studentOptions += `
                <option value="${student.id}">
                    ${student.name}
                </option>
            `;

            addOptions += `
                <option value="${student.id}">
                    ${student.name}
                </option>
            `;
        });

        document.getElementById(
            "studentFilter"
        ).innerHTML = studentOptions;

        document.getElementById(
            "student_id"
        ).innerHTML = addOptions;

    });

}
function clearFilters(){

    document.getElementById(
        "studentFilter"
    ).value = "";

    document.getElementById(
        "subjectFilter"
    ).value = "";

    loadMarks();

}
function loadSubjects(){

    fetch(`${BASE_URL}/subjects`)
    .then(res => res.json())
    .then(data => {

        let options = `
        <option value="">
            All Subjects
        </option>`;

        data.forEach(subject => {

            options += `
            <option value="${subject.subject}">
                ${subject.subject}
            </option>`;
        });

        document.getElementById(
            "subjectFilter"
        ).innerHTML = options;

    });

}
function loadMarksSummary(){

    fetch(
        `${BASE_URL}/marks-summary`
    )
    .then(res => res.json())
    .then(data => {

        document.getElementById(
            "totalRecords"
        ).innerText =
        data.total_records;

        document.getElementById(
            "highestMarks"
        ).innerText =
        data.highest_marks;

        document.getElementById(
            "averageMarks"
        ).innerText =
        data.average_marks;

    });

}