const BASE_URL =
"https://student-management-backend-qwkd.onrender.com";

// load total students
fetch(`${BASE_URL}/dashboard/total-students`)
.then(res => res.json())
.then(data => {
    document.getElementById("totalStudents")
    .innerText = data.total_students;
});

// load average marks
fetch(`${BASE_URL}/dashboard/average-marks`)
.then(res => res.json())
.then(data => {
    document.getElementById("averageMarks")
    .innerText = data.average_marks;
});

// load attendance rate
fetch(`${BASE_URL}/dashboard/attendance-rate`)
.then(res => res.json())
.then(data => {
    document.getElementById("attendanceRate")
    .innerText =
    data.attendance_rate + "%";
});
fetch(`${BASE_URL}/dashboard/attendance-summary`)
.then(res => res.json())
.then(data => {

    let labels = [];
    let values = [];

    data.forEach(item => {

        labels.push(item.status);
        values.push(item.total);

    });

    new Chart(
        document.getElementById(
            'attendanceChart'
        ),
        {
            type:'pie',

            data:{
                labels:labels,

                datasets:[{
                    data:values
                }]
            },
            options:{
                responsive:true,
                maintainAspectRatio:false,

                plugins:{
                    legend:{
                        position:'top'
                    }
                }
            }
        }
    );

});

fetch(`${BASE_URL}/dashboard/top-performers`)
.then(res => res.json())
.then(data => {

    let names = [];
    let marks = [];

    data.forEach(student => {

        names.push(student.name);
        marks.push(student.average_marks);

    });

    new Chart(
        document.getElementById(
            'topPerformersChart'
        ),
        {
            type:'bar',

            data:{
                labels:names,

                datasets:[{
                    label:'Average Marks',
                    data:marks
                }]
            }
        }
    );

});