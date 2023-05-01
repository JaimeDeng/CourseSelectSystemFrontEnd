//按鈕
const cancelBtn = document.getElementById("cancelBtn");
const commitBtn = document.getElementById("commitBtn");

cancelBtn.addEventListener("click" , ()=>{
    window.location.href = "../student_edit_page.html";
});

//Element
const inputFrame = document.getElementById("inputFrame");
let allInput = inputFrame.querySelectorAll("input");
let allLabel = inputFrame.querySelectorAll("label");
let allIcon = inputFrame.querySelectorAll("i");
let btnFrame = document.getElementById("btnFrame");
let employee = document.getElementById("employee");

logout.addEventListener("click" , ()=>{
    sessionStorage.removeItem("accountSession");
    localStorage.removeItem("accountLocal");
    window.location.href = "../../../home_page/home_page.html";
});

employee.addEventListener("click" , ()=>{
    window.location.href = "../../edit_page/edit_page.html";
});

//開啟畫面時檢查storage有無account資訊
document.addEventListener("DOMContentLoaded" , ()=>{
    let accountSessionJson = sessionStorage.getItem("accountSession");
    let accountLocalJson = localStorage.getItem("accountLocal");
    let accountSession = JSON.parse(accountSessionJson);
    let accountLocal = JSON.parse(accountLocalJson);
    if(accountSession === null){
        if(accountLocal === null){
            window.location.href = "../../../login_page/login.html";
        }else{
            if(accountLocal.administrator === false){
                window.alert("您沒有權限訪問!")
                window.location.href = "../../../home_page/home_page.html";
            }
            employee.innerHTML = accountLocal.name;
        }
    }else{
        if(accountSession.administrator === false){
            window.alert("您沒有權限訪問!")
            window.location.href = "../../../home_page/home_page.html";
        }
        employee.innerHTML = accountSession.name;
    }
})

console.log(btnFrame);

//reqBody
function reqBodyObj(studentId , name , pwd , administrator){
    this.studentId = studentId;
    this.name = name;
    this.password = pwd;
    this.acquiredCredit = 0;
    this.administrator = administrator;
}

commitBtn.addEventListener("click" , ()=>{

    //input
    const studentIdValue = document.getElementById("studentId").value;
    const nameValue = document.getElementById("name").value;
    const pwdValue = document.getElementById("password").value;
    const administratorValue = document.getElementById("administrator").value === "true";
    console.log(administratorValue);
    console.log(studentIdValue);
    console.log(nameValue);
    console.log(pwdValue);

    let reqBody = new reqBodyObj(studentIdValue , nameValue , pwdValue , administratorValue);
    console.log(reqBody);

    //抓到資料後的functions
    function result() {
        commitBtn.remove();
        btnFrame.style.justifyContent = "center";
        allInput.forEach((element)=>{
            element.style.display = "none";
        });
        allLabel.forEach((element)=>{
            element.style.display = "none";
        });
        allIcon.forEach((element)=>{
            element.style.display = "none";
        });
        inputFrame.innerHTML = `<h3>新增成功</h3>`;

        cancelBtn.addEventListener("click" , ()=>{
            location.reload();
        });
    }

    //fetch
    let resData;
    fetch("http://localhost:3000/api/setStudentInfo" , {
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
        if(resData.success === true){
            result();
        }else{
            window.alert(resData.message);
        }
    })
    .catch(function(err) {
        // Error :(
    })

});
