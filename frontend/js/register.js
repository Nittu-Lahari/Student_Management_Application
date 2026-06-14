const BASE_URL =
"https://student-management-backend-qwkd.onrender.com";

document.getElementById(
    "role"
).addEventListener(
    "change",
    updateRegisterTitle
);

function updateRegisterTitle(){

    const role =
    document.getElementById(
        "role"
    ).value;

    document.getElementById(
        "registerTitle"
    ).innerText =
    role === "faculty"
    ? "Faculty Registration"
    : "Student Registration";
}

updateRegisterTitle();

function registerUser(){

    const role = document.getElementById("role").value;
    if(!role){
        alert("Please select a role");
        return;
    }

    const password =
    document.getElementById(
        "password"
    ).value;

    const confirmPassword =
    document.getElementById(
        "confirmPassword"
    ).value;

    if(password !== confirmPassword){

        alert(
            "Passwords do not match"
        );

        return;
    }

    const user = {

        name:
        document.getElementById(
            "name"
        ).value,

        email:
        document.getElementById(
            "email"
        ).value,

        phone:
        document.getElementById(
            "phone"
        ).value,

        password: password
    };

    let endpoint = "";

    if(role === "faculty"){

        endpoint =
        "/faculty/register";

    }
    else{

        endpoint =
        "/student/register";

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
                user
            )
        }
    )
    .then(res => res.json())
    .then(data => {

        alert(
            data.message
        );

        if(
            data.message
            .toLowerCase()
            .includes("success")
        ){

            window.location.href =
            "login.html";
        }

    })
    .catch(error => {

        console.error(error);

        alert(
            "Registration Failed"
        );

    });

}