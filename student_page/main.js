const studentInfo = document.getElementById("studentInfo");
const selectCourse = document.getElementById("selectCourse");
const backBtn = document.getElementById("backBtn");

studentInfo.addEventListener("click" , ()=>{
    window.location.href = "edit_page/edit_page.html";
});

selectCourse.addEventListener("click" , ()=>{
    window.location.href = "select_course_page/select_course_page.html";
});

backBtn.addEventListener("click" , ()=>{
    window.location.href = "../home_page/home_page.html";
});