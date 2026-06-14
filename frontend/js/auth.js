function checkLogin(){

    const user =
    localStorage.getItem(
        "user"
    );

    if(!user){

        window.location.href =
        "login.html";

    }

}

function logout(){

    const confirmLogout =
    confirm(
        "Are you sure you want to logout?"
    );

    if(confirmLogout){

        localStorage.clear();

        window.location.href =
        "login.html";

    }

}

function getCurrentUser(){

    return JSON.parse(
        localStorage.getItem(
            "user"
        )
    );

}

function showUserName(){

    const user =
    getCurrentUser();

    if(user){

        const element =
        document.getElementById(
            "facultyName"
        );

        if(element){

            element.innerText =
            `Welcome, ${user.name} 👋`;

        }

    }

}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        checkLogin();

        showUserName();

    }
);
function requireStudent(){

    const user =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    );

    if(
        !user ||
        user.role !== "student"
    ){

        window.location.href =
        "login.html";

    }

}

function requireFaculty(){

    const user =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    );

    if(
        !user ||
        user.role !== "faculty"
    ){

        window.location.href =
        "login.html";

    }

}