//按鈕
const backBtn = document.getElementById("backBtn");
const addStudent = document.getElementById("addStudent");
const editStudent = document.getElementById("editStudent");

backBtn.addEventListener("click" , ()=>{
    window.location.href = "../school_page.html";
});

addStudent.addEventListener("click" , ()=>{
    window.location.href = "add_student/add_student.html";
});

editStudent.addEventListener("click" , ()=>{
    window.location.href = "edit_student/edit_student.html";
});

//Element
const accordionFlush = document.getElementById("accordionFlush");
const search = document.getElementById("search");
let studentData = [];


//functions

//列出學生列表
function loadStudentInfo() {
    if(studentData.success === false){
        accordionFlush.innerHTML = "<h3 style=\"position:absolute; top:45%; left:50%; margin-left:-92px;\">無任何學生資訊</h3>";
    }else{
        accordionFlush.innerHTML = "";
        studentData.studentInfoList.forEach((element , index) => {
            let itemNo = index + 1;
            accordionFlush.innerHTML += 
            `<div class=\"accordion-item\"><h2 class=\"accordion-header\"><button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse${itemNo}\" aria-expanded=\"false\" aria-controls=\"flush-collapse${itemNo}\">${element.studentId}&nbsp${element.name}</button></h2><div id=\"flush-collapse${itemNo}\" class=\"accordion-collapse collapse\" data-bs-parent=\"#accordionFlush\"><div class=\"accordion-body\"><h6>學號:${element.studentId}</h6><h6>姓名:${element.name}</h6><h6>學分:${element.acquiredCredit}</h6><h6>已選課程:${element.selectedCourse}</h6></div></div></div>`;
        });
    }
}

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
})
.catch(err => console.log(err))
    
});
