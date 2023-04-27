const studentInfo = document.getElementById("studentInfo");
const courseEdit = document.getElementById("courseEdit");
const selectCourse = document.getElementById("selectCourse");
const backBtn = document.getElementById("backBtn");

studentInfo.addEventListener("click" , ()=>{
    window.location.href = "student_edit_page/student_edit_page.html";
});

courseEdit.addEventListener("click" , ()=>{
    window.location.href = "course_edit_page/course_edit_page.html";
});

selectCourse.addEventListener("click" , ()=>{
    window.location.href = "school_select_course_page/school_select_course_page.html";
});

backBtn.addEventListener("click" , ()=>{
    window.location.href = "../home_page/home_page.html";
});