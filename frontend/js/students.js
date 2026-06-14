const BASE_URL =
"https://student-management-backend-qwkd.onrender.com";

loadStudents();

// load students
function loadStudents(){

    fetch(`${BASE_URL}/students`)
    .then(res => res.json())
    .then(data => {

        let rows = "";

        data.forEach(student => {

            rows += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.class_name}</td>
                <td>${student.section}</td>
                <td>${student.phone}</td>

                <td>

                    <button
                    onclick="editStudent(
                    ${student.id},
                    '${student.name}',
                    '${student.email}',
                    '${student.class_name}',
                    '${student.section}',
                    '${student.phone}'
                    )">
                    Edit
                    </button>

                    <button
                    onclick="deleteStudent(
                    ${student.id}
                    )">
                    Delete
                    </button>

                </td>

            </tr>
            `;
        });

        document.getElementById(
            "studentTable"
        ).innerHTML = rows;

    });

}
// add/update students
function saveStudent(){

    const id =
    document.getElementById("studentId").value;

    const student = {

        name:
        document.getElementById("name").value,

        email:
        document.getElementById("email").value,

        class_name:
        document.getElementById("class_name").value,

        section:
        document.getElementById("section").value,

        phone:
        document.getElementById("phone").value
    };

    if(id){

        fetch(
        `${BASE_URL}/students/${id}`,
        {
            method:'PUT',
            headers:{
                'Content-Type':
                'application/json'
            },
            body:JSON.stringify(student)
        })
        .then(()=>{

            clearForm();
            loadStudents();

        });

    }
    else{

        fetch(
        `${BASE_URL}/students`,
        {
            method:'POST',
            headers:{
                'Content-Type':
                'application/json'
            },
            body:JSON.stringify(student)
        })
        .then(()=>{

            clearForm();
            loadStudents();

        });

    }

}
// edit students
function editStudent(
id,name,email,class_name,
section,phone
){
    document.getElementById(
        "studentFormContainer"
    ).style.display = "block";

    document.getElementById(
        "formTitle"
    ).innerText = "Edit Student";
    document.getElementById(
        "studentId"
    ).value=id;

    document.getElementById(
        "name"
    ).value=name;

    document.getElementById(
        "email"
    ).value=email;

    document.getElementById(
        "class_name"
    ).value=class_name;

    document.getElementById(
        "section"
    ).value=section;

    document.getElementById(
        "phone"
    ).value=phone;

}
// delete students
function deleteStudent(id){

    if(!confirm(
        "Delete this student?"
    )) return;

    fetch(
        `${BASE_URL}/students/${id}`,
        {
            method:'DELETE'
        }
    )
    .then(()=>{
        loadStudents();
    });

}
// clear form
function clearForm(){

    document.getElementById(
        "studentId"
    ).value="";

    document.getElementById(
        "name"
    ).value="";

    document.getElementById(
        "email"
    ).value="";

    document.getElementById(
        "class_name"
    ).value="";

    document.getElementById(
        "section"
    ).value="";

    document.getElementById(
        "phone"
    ).value="";
    document.getElementById(
        "formTitle"
    ).innerText = "Add Student";
}

function toggleForm(){

    const form =
    document.getElementById(
        "studentFormContainer"
    );

    if(form.style.display === "none"){

        form.style.display = "block";

    }
    else{

        form.style.display = "none";

        clearForm();

    }

}