
//畫面跑完後隱藏spinner & 顯示frame
window.onload = function(){
    let spinner = document.getElementById("spinner");
    let frame = document.getElementById("Frame");
    spinner.style.display = "none";
    frame.style.visibility = "visible";
}

//按鈕
const editBtn = document.getElementById("editBtn");
const commitBtn = document.getElementById("commitBtn");
const backBtn = document.getElementById("backBtn");
const cancelBtn = document.getElementById("cancelBtn");

//Elements
let employeeId;
const employee = document.getElementById("employee");
const logout = document.getElementById("logout");
const changePwdFrame = document.getElementById("changePwdFrame");
let inputFrame = document.getElementById("inputFrame");
let btnFrame = document.getElementById("btnFrame");
const newPwdElement = document.getElementById("newPwd");
let newPwd;
const repeatNewPwdElement = document.getElementById("repeatNewPwd");
let repeatNewPwd;
let resData;
let loadResData;
let employeeIdElement = document.getElementById("employeeId");
let nameElement = document.getElementById("name");
let acquiredCreditElement = document.getElementById("credit");
let selectedCourse = document.getElementById("selectedCourse");

backBtn.addEventListener("click" , ()=>{
    window.location.href = "../../school_page/school_page.html";
});

editBtn.addEventListener("click" , ()=>{
    changePwdFrame.style.top = "0";
    changePwdFrame.style.transform = "rotate(0deg)";
});

cancelBtn.addEventListener("click" , ()=>{
    changePwdFrame.style.top = "-150vh";
    changePwdFrame.style.transform = "rotate(-90deg)";
});

logout.addEventListener("click" , ()=>{
    sessionStorage.removeItem("accountSession");
    localStorage.removeItem("accountLocal");
    window.location.href = "../../home_page/home_page.html";
});

employee.addEventListener("click" , ()=>{
    window.location.href = "../edit_page/edit_page.html";
});

//檢查帳號資料
document.addEventListener("DOMContentLoaded" , ()=>{
    let accountSessionJson = sessionStorage.getItem("accountSession");
    let accountLocalJson = localStorage.getItem("accountLocal");
    let accountSession = JSON.parse(accountSessionJson);
    let accountLocal = JSON.parse(accountLocalJson);
    if(accountSession === null){
        if(accountLocal === null){
            window.location.href = "../../login_page/login.html";
        }else{
            employeeId = accountLocal.studentId;
            employee.innerHTML = accountLocal.name;
        }
    }else{
        employeeId = accountSession.studentId;
        employee.innerHTML = accountSession.name;
    }
})

//抓到資料後的functions
function result() {
    let allInput = inputFrame.querySelectorAll("input");
    let allLabel = inputFrame.querySelectorAll("label");
    let icon = inputFrame.querySelector("i");

    commitBtn.remove();

    btnFrame.style.justifyContent = "center";

    allInput.forEach((element)=>{
        element.remove();
    });
    allLabel.forEach((element)=>{
        element.remove();
    });
    
    icon.remove();

    inputFrame.innerHTML = `<h3 style="margin:auto;">${resData.message}</h3>`;

    cancelBtn.addEventListener("click" , ()=>{
        changePwdFrame.style.top = "0";
        changePwdFrame.style.transform = "rotate(0deg)";
        location.reload();
    });
}

function loadEmployeeInfo() {
    employeeIdElement.innerHTML = loadResData.studentId;
    nameElement.innerHTML = loadResData.name;
}

//reqBody
function reqBodyObj(studentId , password){
    this.studentId = studentId;
    this.password = password;
}

//開啟視窗fetch學生資料
document.addEventListener("DOMContentLoaded" , ()=>{

    //建立reqBody
    let reqBody = new reqBodyObj(employeeId , "none");

    fetch("http://localhost:3000/api/getStudentInfoByStudentId", {
        method: "post",
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(res => res.json())
    .then((data)=>{
        loadResData = data;
        console.log(loadResData);
        loadEmployeeInfo();
    })
    .catch(err => console.log(err))
        
});

//提交密碼變更
commitBtn.addEventListener("click" , ()=>{
    newPwd = newPwdElement.value;
    repeatNewPwd = repeatNewPwdElement.value;
    console.log(newPwd);
    console.log(repeatNewPwd);
    if(newPwd === "" || repeatNewPwd === ""){
        window.alert("請輸入密碼表格!");
    }else if(newPwd !== repeatNewPwd){
            window.alert("密碼與重複輸入的密碼不相符");
    }else{
        //建立reqBody
        let reqBody = new reqBodyObj(employeeId , newPwd);

        //fetch
        fetch("http://localhost:3000/api/editPassword" , {
            method: "post",
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(res => res.json())
        .then((data)=>{
            resData = data;
            console.log(data);
            console.log(resData);
            if(resData.success === true){
                result();
            }else{
                window.alert(resData.message);
            }
        })
        .catch(function(err) {
            console.log(err);
        })   
    }
});