const studentInfo = document.getElementById("studentInfo");
const selectCourse = document.getElementById("selectCourse");
const backBtn = document.getElementById("backBtn");
const student = document.getElementById("student");
const logout = document.getElementById("logout");
const studentName = document.getElementById("studentName");

studentInfo.addEventListener("click" , ()=>{
    window.location.href = "edit_page/edit_page.html";
});

selectCourse.addEventListener("click" , ()=>{
    window.location.href = "select_course_page/select_course_page.html";
});

backBtn.addEventListener("click" , ()=>{
    window.location.href = "../home_page/home_page.html";
});

logout.addEventListener("click" , ()=>{
    sessionStorage.removeItem("accountSession");
    localStorage.removeItem("accountLocal");
    window.location.href = "../home_page/home_page.html";
});

student.addEventListener("click" , ()=>{
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
            if(accountLocal.administrator === true){
                window.alert("此為學生首頁,教職員請登入教職員首頁")
                window.location.href = "../../home_page/home_page.html";
            }
            student.innerHTML = accountLocal.name;
            studentName.innerHTML = accountLocal.name;
        }
    }else{
        if(accountSession.administrator === true){
            window.alert("此為學生首頁,教職員請登入教職員首頁")
            window.location.href = "../../home_page/home_page.html";
        }
        student.innerHTML = accountSession.name;
        studentName.innerHTML = accountSession.name;  
    }
})