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

console.log(btnFrame);

//reqBody
function reqBodyObj(studentId , name , pwd){
    this.studentId = studentId;
    this.name = name;
    this.password = pwd;
    this.acquiredCredit = 0;
}

commitBtn.addEventListener("click" , ()=>{

    //input
    const studentIdValue = document.getElementById("studentId").value;
    const nameValue = document.getElementById("name").value;
    const pwdValue = document.getElementById("password").value;

    console.log(studentIdValue);
    console.log(nameValue);
    console.log(pwdValue);

    let reqBody = new reqBodyObj(studentIdValue , nameValue , pwdValue);
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
        inputFrame.innerHTML = `<h3>${resData.message}</h3>`;

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
