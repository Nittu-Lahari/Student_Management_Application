document.addEventListener(
    "DOMContentLoaded",
    loadProfile
);

function loadProfile(){

    const faculty =
    JSON.parse(
        localStorage.getItem("user")
    );

    if(!faculty){

        window.location.href =
        "login.html";

        return;
    }

    // Header

    document.getElementById(
        "profileHeaderName"
    ).innerText =
    faculty.name || "Faculty";

    document.getElementById(
        "facultyShortInfo"
    ).innerText =
    "Faculty Member";

    // View Mode

    document.getElementById(
        "viewFacultyId"
    ).innerText =
    faculty.id ||
    faculty.faculty_id ||
    "-";

    document.getElementById(
        "viewFacultyName"
    ).innerText =
    faculty.name || "-";

    document.getElementById(
        "viewFacultyEmail"
    ).innerText =
    faculty.email || "-";

    document.getElementById(
        "viewFacultyPhone"
    ).innerText =
    faculty.phone || "-";

    // Edit Mode

    document.getElementById(
        "editFacultyName"
    ).value =
    faculty.name || "";

    document.getElementById(
        "facultyEmail"
    ).value =
    faculty.email || "";

    document.getElementById(
        "facultyPhone"
    ).value =
    faculty.phone || "";

}

function showEditForm(){

    document.getElementById(
        "profileView"
    ).style.display =
    "none";

    document.getElementById(
        "profileEditForm"
    ).style.display =
    "block";

}

function cancelEdit(){

    document.getElementById(
        "profileView"
    ).style.display =
    "block";

    document.getElementById(
        "profileEditForm"
    ).style.display =
    "none";

}

function showPasswordForm(){

    const form =
    document.getElementById(
        "passwordForm"
    );

    if(
        form.style.display ===
        "none"
    ){

        form.style.display =
        "block";

    }
    else{

        form.style.display =
        "none";

    }

}

function updateProfile(){

    const faculty =
    JSON.parse(
        localStorage.getItem("user")
    );

    faculty.name =
    document.getElementById(
        "editFacultyName"
    ).value;

    faculty.phone =
    document.getElementById(
        "facultyPhone"
    ).value;

    localStorage.setItem(
        "user",
        JSON.stringify(faculty)
    );

    alert(
        "Profile Updated Successfully"
    );

    loadProfile();

    cancelEdit();

}

function changePassword(){

    const currentPassword =
    document.getElementById(
        "currentPassword"
    ).value;

    const newPassword =
    document.getElementById(
        "newPassword"
    ).value;

    const confirmPassword =
    document.getElementById(
        "confirmPassword"
    ).value;

    if(
        newPassword !==
        confirmPassword
    ){

        alert(
            "Passwords do not match"
        );

        return;
    }

    alert(
        "Password Changed Successfully"
    );

    document.getElementById(
        "currentPassword"
    ).value = "";

    document.getElementById(
        "newPassword"
    ).value = "";

    document.getElementById(
        "confirmPassword"
    ).value = "";

}