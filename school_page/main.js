const employeeInfo = document.getElementById("employeeInfo");
const studentInfo = document.getElementById("studentInfo");
const courseEdit = document.getElementById("courseEdit");
const backBtn = document.getElementById("backBtn");
const employee = document.getElementById("employee");
const logout = document.getElementById("logout");
const employeeName = document.getElementById("employeeName");

employeeInfo.addEventListener("click" , ()=>{
    window.location.href = "edit_page/edit_page.html";
});

studentInfo.addEventListener("click" , ()=>{
    window.location.href = "student_edit_page/student_edit_page.html";
});

courseEdit.addEventListener("click" , ()=>{
    window.location.href = "course_edit_page/course_edit_page.html";
});

backBtn.addEventListener("click" , ()=>{
    window.location.href = "../home_page/home_page.html";
});

logout.addEventListener("click" , ()=>{
    sessionStorage.removeItem("accountSession");
    localStorage.removeItem("accountLocal");
    window.location.href = "../home_page/home_page.html";
});

employee.addEventListener("click" , ()=>{
    window.location.href = "edit_page/edit_page.html";
});

//開啟畫面時檢查storage有無account資訊
document.addEventListener("DOMContentLoaded" , ()=>{
    let accountSessionJson = sessionStorage.getItem("accountSession");
    let accountLocalJson = localStorage.getItem("accountLocal");
    let accountSession = JSON.parse(accountSessionJson);
    let accountLocal = JSON.parse(accountLocalJson);
    if(accountSession === null){
        if(accountLocal === null){
            window.location.href = "../../login_page/login.html";
        }else{
            if(accountLocal.administrator === false){
                window.alert("您非教職員,沒有權限訪問")
                window.location.href = "../../home_page/home_page.html";
            }
            employee.innerHTML = accountLocal.name;
            employeeName.innerHTML = accountLocal.name;
        }
    }else{
        if(accountSession.administrator === false){
            window.alert("您非教職員,沒有權限訪問")
            window.location.href = "../../home_page/home_page.html";
        }
        employee.innerHTML = accountSession.name;
        employeeName.innerHTML = accountSession.name;
    }
})