//reqBody
function deleteStudentReqBody(studenId) {
    this.studentId = studenId;
}

function editStudentReqBody(studenId , newStudentId , name , password , acquiredCredit) {
    this.studentId = studenId;
    this.newStudentId = newStudentId;
    this.name = name;
    this.password = password;
    this.acquiredCredit = acquiredCredit;
}

//按鈕
const backBtn = document.getElementById("backBtn");
const deleteStudent = document.getElementById("deleteStudent");
const commitEdit = document.getElementById("commitEdit");

backBtn.addEventListener("click" , ()=>{
    window.location.href = "../student_edit_page.html";
});

//Element
const accordionFlush = document.getElementById("accordionFlush");
const search = document.getElementById("search");
const inputFrame =  document.getElementById("inputFrame");
let allInputElement = inputFrame.querySelectorAll("input");
let allInlebelElement = inputFrame.querySelectorAll("lebel");
let selectedEditStudent =  document.getElementById("selectedEditStudent");
let studentData = [];
let deleteData = [];
let editData = [];
let addBtnList = [];
let addBtnElementList;
let deleteStudentReq;
let editStudentReq;
let oldId;

//functions

//列出學生列表
function loadStudentInfo() {

    if(studentData.success === false){
        accordionFlush.innerHTML = "<h3 style=\"position:absolute; top:45%; left:50%; margin-left:-92px;\">無任何學生資訊</h3>";
    }else{
        //生成準備放到列表中的Button
        studentData.studentInfoList.forEach((element , index)=>{
            addBtnList.push("<button class=\"addBtn addBtn" + (index+1) + "\" id=\"addBtn addBtn" + (index+1) + "\">編輯</button>")
        })
        //生成列表
        accordionFlush.innerHTML = "";
        studentData.studentInfoList.forEach((element , index) => {
            let itemNo = index + 1;
            accordionFlush.innerHTML += 
            `<div class=\"accordion-item\"><h2 class=\"accordion-header\"><button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse${itemNo}\" aria-expanded=\"false\" aria-controls=\"flush-collapse${itemNo}\">${element.studentId}&nbsp${element.name}</button></h2><div id=\"flush-collapse${itemNo}\" class=\"accordion-collapse collapse\" data-bs-parent=\"#accordionFlush\"><div class=\"accordion-body\"><h6>學號:${element.studentId}</h6><h6>姓名:${element.name}</h6><h6>學分:${element.acquiredCredit}</h6><h6>已選課程:${element.selectedCourse}</h6>${addBtnList[index]}</div></div></div>`;
        });    
    }
}

//生成列表按鈕的監聽
function addBtnEvenListener() {
    //取得生成的ButtonElement
    addBtnElementList = document.querySelectorAll(".addBtn");
    console.log(addBtnElementList);
    console.log(studentData.studentInfoList);
    addBtnElementList.forEach((element , index1) => {
        element.addEventListener("click" , () => {
            oldId = studentData.studentInfoList[index1].studentId;
            console.log(oldId);
            allInputElement.forEach((element , index2) => {
                element.disabled = false;
                selectedEditStudent.innerText = studentData.studentInfoList[index1].studentId + " " + studentData.studentInfoList[index1].name;
                switch(index2){
                    case 0:
                        element.value = studentData.studentInfoList[index1].studentId;
                        break;
                    case 1:
                        element.value = studentData.studentInfoList[index1].name;
                        break;
                    case 2:
                        element.value = studentData.studentInfoList[index1].password;
                        break;
                    case 3:
                        element.value = studentData.studentInfoList[index1].acquiredCredit;
                        break;
                }
            })
            
            //設定reqBody
            console.log(allInputElement[0].value);
            deleteStudentReq = new deleteStudentReqBody(allInputElement[0].value);
            console.log(deleteStudentReq);
        })
    })
}

//成功刪除後的顯示更動
function deleteResult() {
    
    deleteStudent.style.display = "none";

    selectedEditStudent.style.display = "none";

    allInputElement.forEach((element) => {
        element.style.display = "none";
    });

    allInlebelElement.forEach((element) => {
        element.style.display = "none";
    });

    inputFrame.innerHTML = `<h3>${deleteData.message}</h3>`;

    commitEdit.innerText = "返回"

    commitEdit.addEventListener("click" , ()=>{
        location.reload();
    })
    
}

//成功修改後的顯示更動
function editResult() {
    
    deleteStudent.style.display = "none";

    selectedEditStudent.style.display = "none";

    allInputElement.forEach((element) => {
        element.style.display = "none";
    });

    allInlebelElement.forEach((element) => {
        element.style.display = "none";
    });

    inputFrame.innerHTML = `<h3 style="margin:auto; margin-top:50%;">${editData.message}</h3>`;

    commitEdit.innerText = "返回"

    commitEdit.addEventListener("click" , ()=>{
        location.reload();
    })
    
}

//刪除學生資訊
deleteStudent.addEventListener("click" , ()=>{
    if(window.confirm("警告 : 此操作會將學生資料完全刪除!")){
        if(window.confirm("確定要刪除此學生資料嗎?")){
            console.log(deleteStudentReq);
            fetch("http://localhost:3000/api/deleteStudentInfo", {
                method: 'post',
                body: JSON.stringify(deleteStudentReq),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .then(res => res.json())
            .then((data)=>{
                deleteData = data;
                console.log(deleteData);
                if(deleteData.success === true){
                    deleteResult();
                }else{
                    window.alert(deleteData.message);
                }
            })
            .catch(err => console.log(err))
        }else{
        }
    }else{
    }

});

//編輯學生資訊
commitEdit.addEventListener("click" , ()=>{
    editStudentReq = new editStudentReqBody(oldId , allInputElement[0].value , allInputElement[1].value , allInputElement[2].value , allInputElement[3].value);
    console.log(editStudentReq);
    fetch("http://localhost:3000/api/editStudentInfo", {
            method: 'post',
            body: JSON.stringify(editStudentReq),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(res => res.json())
        .then((data)=>{
        editData = data;
        console.log(editData);
        if(editData.success === true){
            editResult();
        }else{
            window.alert(editData.message);
        }
    })
.catch(err => console.log(err))

});

//以學號或姓名搜尋
search.addEventListener("input" , ()=>{
    if(studentData.success === false){
        accordionFlush.innerHTML = "<h3 style=\"position:absolute; top:45%; left:50%; margin-left:-92px;\">無任何學生資訊</h3>";
    }else{
        let target = search.value;
        console.log(target);
        accordionFlush.innerHTML = "";
        studentData.studentInfoList.forEach((element , index) => {
            let itemNo = index + 1;
            if(element.name === target || element.studentId === target){
                accordionFlush.innerHTML += 
                `<div class=\"accordion-item\"><h2 class=\"accordion-header\"><button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse${itemNo}\" aria-expanded=\"false\" aria-controls=\"flush-collapse${itemNo}\">${element.studentId}&nbsp${element.name}</button></h2><div id=\"flush-collapse${itemNo}\" class=\"accordion-collapse collapse\" data-bs-parent=\"#accordionFlush\"><div class=\"accordion-body\"><h6>學號:${element.studentId}</h6><h6>姓名:${element.name}</h6><h6>學分:${element.acquiredCredit}</h6><h6>已選課程:${element.selectedCourse}</h6></div></div></div>`;
            }
            if(target.length === 0){
                loadStudentInfo();
            }
        });
    }
})

//fetch
document.addEventListener("DOMContentLoaded" , ()=>{

    fetch("http://localhost:3000/api/getAllStudentInfo", {method: 'post'})
    .then(res => res.json())
    .then((data)=>{
        studentData = data;
        console.log(studentData);
        loadStudentInfo();
        addBtnEvenListener();
    })
    .catch(err => console.log(err))
    
});