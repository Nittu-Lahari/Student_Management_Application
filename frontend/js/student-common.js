function toggleProfileMenu(){

    const menu =
    document.getElementById(
        "studentProfileDropdown"
    );

    if(menu.style.display === "block"){

        menu.style.display =
        "none";

    }
    else{

        menu.style.display =
        "block";

    }

}
function openAccountSettings(){

    localStorage.setItem(
        "settingsTab",
        "profile"
    );

    window.location.href =
    "account-settings.html";

}

function openPasswordSettings(){

    localStorage.setItem(
        "settingsTab",
        "password"
    );

    window.location.href =
    "account-settings.html";

}


function loadStudentDropdown(){

    const user =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    );

    if(!user){
        return;
    }

    const nameElement =
    document.getElementById(
        "dropdownStudentName"
    );

    const emailElement =
    document.getElementById(
        "dropdownStudentEmail"
    );

    if(nameElement){

        nameElement.innerText =
        user.name || "Student";

    }

    if(emailElement){

        emailElement.innerText =
        user.email || "No Email";

    }

}

document.addEventListener(
    "DOMContentLoaded",
    loadStudentDropdown
);