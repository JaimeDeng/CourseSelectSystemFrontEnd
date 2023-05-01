const student = document.getElementById("student");
const school = document.getElementById("school");
const loginOrLogout = document.getElementById("loginOrLogout")

student.addEventListener("click" , ()=>{
    window.location.href = "../student_page/student_page.html";
});

school.addEventListener("click" , ()=>{
    window.location.href = "../school_page/school_page.html";
});

//開啟畫面時檢查storage有無account資訊
document.addEventListener("DOMContentLoaded" , ()=>{
    let accountSessionJson = sessionStorage.getItem("accountSession");
    let accountLocalJson = localStorage.getItem("accountLocal");
    let accountSession = JSON.parse(accountSessionJson);
    let accountLocal = JSON.parse(accountLocalJson);
    if(accountSession === null){
        loginOrLogout.innerHTML = "登入";
        loginOrLogout.addEventListener("click" , ()=> {
            window.location.href = "../login_page/login_page.html"
        })
        
        if(accountLocal === null){
            loginOrLogout.innerHTML = "登入";
            loginOrLogout.addEventListener("click" , ()=> {
                window.location.href = "../login_page/login.html"
            })

        }else{
            loginOrLogout.innerHTML = "登出";
            loginOrLogout.addEventListener("click" , ()=> {
                sessionStorage.removeItem("accountSession");
                localStorage.removeItem("accountLocal");
                location.reload();
            })
        }

    }else{
        loginOrLogout.innerHTML = "登出";
        loginOrLogout.addEventListener("click" , ()=> {
            sessionStorage.removeItem("accountSession");
            localStorage.removeItem("accountLocal");
            location.reload();
        })
    }

})