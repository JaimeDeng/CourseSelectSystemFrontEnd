const student = document.getElementById("student");
const school = document.getElementById("school");

student.addEventListener("click" , ()=>{
    window.location.href = "../student_page/student_page.html";
});

school.addEventListener("click" , ()=>{
    window.location.href = "../school_page/school_page.html";
});