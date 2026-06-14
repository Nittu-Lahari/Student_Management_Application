const BASE_URL =
"https://student-management-backend-qwkd.onrender.com";

document.addEventListener(
"DOMContentLoaded",
() => {

    const tab =
    localStorage.getItem(
        "settingsTab"
    );

    if(tab === "password"){

        document.getElementById(
            "profileSection"
        ).style.display =
        "none";

        document.getElementById(
            "passwordSection"
        ).style.display =
        "block";

    }

    loadProfile();

}


);

function loadProfile(){

const user =
JSON.parse(
    localStorage.getItem(
        "user"
    )
);

fetch(
    `${BASE_URL}/student/profile/${user.student_id}`
)
.then(res => res.json())
.then(student => {

    document.getElementById(
        "studentName"
    ).value =
    student.name || "";

    document.getElementById(
        "studentPhone"
    ).value =
    student.phone || "";

    document.getElementById(
        "studentClass"
    ).value =
    student.class_name || "";

    document.getElementById(
        "studentSection"
    ).value =
    student.section || "";

})
.catch(error => {

    console.error(
        "Profile Load Error:",
        error
    );

});


}

function updateProfile(){

const user =
JSON.parse(
    localStorage.getItem(
        "user"
    )
);

const profileData = {

    name:
    document.getElementById(
        "studentName"
    ).value,

    phone:
    document.getElementById(
        "studentPhone"
    ).value,

    class_name:
    document.getElementById(
        "studentClass"
    ).value,

    section:
    document.getElementById(
        "studentSection"
    ).value

};

fetch(
    `${BASE_URL}/student/profile/${user.student_id}`,
    {

        method:"PUT",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:JSON.stringify(
            profileData
        )

    }
)
.then(res => res.json())
.then(data => {

    alert(
        data.message
    );

})
.catch(error => {

    console.error(error);

    alert(
        "Failed to update profile"
    );

});


}

function changePassword(){

const user =
JSON.parse(
    localStorage.getItem(
        "user"
    )
);

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

fetch(
    `${BASE_URL}/student/change-password/${user.student_id}`,
    {

        method:"PUT",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

            current_password:
            currentPassword,

            new_password:
            newPassword

        })

    }
)
.then(res => res.json())
.then(data => {

    alert(
        data.message
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

})
.catch(error => {

    console.error(error);

    alert(
        "Failed to change password"
    );

});

}

