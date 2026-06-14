const BASE_URL = "http://127.0.0.1:5000";

document.getElementById(
    "role"
).addEventListener(
    "change",
    updateLoginTitle
);

function updateLoginTitle(){

    const role =
    document.getElementById(
        "role"
    ).value;

    document.getElementById(
        "loginTitle"
    ).innerText =
    role === "faculty"
    ? "Faculty Login"
    : "Student Login";
}

updateLoginTitle();

function loginUser(){

    const role = document.getElementById("role").value;
    if(!role){
        alert("Please select a role");
        return;
    }

    const loginData = {

        email:
        document.getElementById(
            "email"
        ).value,

        password:
        document.getElementById(
            "password"
        ).value
    };

    let endpoint = "";

    if(role === "faculty"){

        endpoint =
        "/faculty/login";

    }
    else{

        endpoint =
        "/student/login";

    }

    fetch(
        `${BASE_URL}${endpoint}`,
        {
            method:'POST',

            headers:{
                'Content-Type':
                'application/json'
            },

            body:JSON.stringify(
                loginData
            )
        }
    )
    .then(res => res.json())
    .then(data => {

        if(
            data.faculty_id ||
            data.student_id
        ){

            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );

            if(role === "faculty"){

                window.location.href =
                "faculty-dashboard.html";

            }
            else{

                window.location.href =
                "student-dashboard.html";

            }

        }
        else{

            alert(
                data.message
            );

        }

    })
    .catch(error => {

        console.error(error);

        alert(
            "Login Failed"
        );

    });

}