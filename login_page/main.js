
//button
const loginBtn = document.getElementById("loginBtn");

//Element
let resData;
let account;
let keepLogin = document.getElementById("keepLogin");

//reqBody
function reqBodyObj(studentId , password){
    this.studentId = studentId;
    this.password = password;
}

//functions
function accountInfo(studentId , name , administrator){
    this.studentId = studentId;
    this.name = name;
    this.administrator = administrator;
}

//輸入的各種檢查
function check() {
    if(resData.success === false){
        window.alert(resData.message);
    }else{
        if(password.value !== resData.password){
            window.alert("密碼錯誤!");
        }else{
            account = new accountInfo(studentId.value , resData.name , resData.administrator);
            success();
        }
    }
}

//登入成功的動作
function success() {
    if(keepLogin.checked){
        localStorage.setItem("accountLocal" , JSON.stringify(account));
    }else{
        sessionStorage.setItem("accountSession" , JSON.stringify(account));
    }
    if(resData.administrator === false){
        window.location.href = "../student_page/student_page.html";
    }else{
        window.location.href = "../school_page/school_page.html";
    }
}

loginBtn.addEventListener("click" , () => {
    let studentId = document.getElementById("studentId");
    let password = document.getElementById("password");
    console.log(password.value);
    if(studentId.value === ''){
        window.alert("請輸入帳號!");
    }else if(password.value === ''){
        window.alert("請輸入密碼!");
    }else{
        //建立reqBody
        let reqBody = new reqBodyObj(studentId.value , password.value);

        //fetch學生資料
        fetch("http://localhost:3000/api/getStudentInfoByStudentId", {
            method: "post",
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(res => res.json())
        .then((data)=>{
            resData = data;
            console.log(resData);
            check();
        })
        .catch(err => console.log(err))       
    }
})