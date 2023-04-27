//按鈕
const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click" , ()=>{
    window.location.href = "../school_page.html";
});

//Element
const accordionFlush = document.getElementById("accordionFlush");
const search = document.getElementById("search");
const inputFrame =  document.getElementById("inputFrame");
let selectElement = inputFrame.querySelector("select");
let allInputElement = inputFrame.querySelectorAll("input");
let allInlebelElement = inputFrame.querySelectorAll("lebel");
let selectedEditStudent =  document.getElementById("selectedEditStudent");
let days = ["monday" , "tuesday" , "wednesday" , "thursday" , "friday" , "saturday" , "sunday"];
let daysCN = ["星期一" , "星期二" , "星期三" , "星期四" , "星期五" , "星期六" , "星期日"];
let courseData = [];
let deleteData = [];
let editData = [];
let addBtnList = [];
let addBtnElementList;
let deleteStudentReq;
let editStudentReq;
let oldId;

//functions

//列出課程列表
function loadCourseInfo() {

    if(courseData.success === false){
        accordionFlush.innerHTML = "<h3 style=\"position:absolute; top:45%; left:50%; margin-left:-92px;\">無任何學生資訊</h3>";
    }else{
        //生成準備放到列表中的Button
        courseData.courseInfoList.forEach((element , index)=>{
            addBtnList.push("<button class=\"addBtn addBtn" + (index+1) + "\" id=\"addBtn addBtn" + (index+1) + "\">編輯</button>")
        })
        //生成列表
        accordionFlush.innerHTML = "";
        courseData.courseInfoList.forEach((element , index) => {
            let itemNo = index + 1;
            accordionFlush.innerHTML += 
            `<div class=\"accordion-item\"><h2 class=\"accordion-header\"><button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse${itemNo}\" aria-expanded=\"false\" aria-controls=\"flush-collapse${itemNo}\">${element.courseId}&nbsp${element.courseName}</button></h2><div id=\"flush-collapse${itemNo}\" class=\"accordion-collapse collapse\" data-bs-parent=\"#accordionFlush\"><div class=\"accordion-body\"><h6>課程代碼:${element.courseId}</h6><h6>課程名稱:${element.courseName}</h6><h6>學分:${element.credit}</h6><h6>上課日:${element.lessonDay}</h6><h6>開始時間:${element.startTime}</h6><h6>下課時間:${element.endTime}</h6><h6>選修人數上限:${element.selectLimit}</h6><h6>選修學生名單:${element.selectedPerson}</h6>${addBtnList[index]}</div></div></div>`;
        });    
    }
}

//生成列表按鈕的監聽
function addBtnEvenListener() {
    //取得生成的ButtonElement
    addBtnElementList = document.querySelectorAll(".addBtn");
    console.log(allInputElement);
    console.log(courseData.courseInfoList);

    //設定addBtn
    addBtnElementList.forEach((element , index1) => {
        element.addEventListener("click" , () => {
            oldId = courseData.courseInfoList[index1].courseId;
            console.log(oldId);
            selectElement.disabled = false;
            allInputElement.forEach((element , index2) => {
                element.disabled = false;
                selectedEditCourse.innerText = courseData.courseInfoList[index1].courseId + " " + courseData.courseInfoList[index1].courseName;
                let startTimeArray = courseData.courseInfoList[index1].startTime.split(":");
                let endTimeArray = courseData.courseInfoList[index1].endTime.split(":");
                switch(index2){
                    case 0:
                        element.value = courseData.courseInfoList[index1].courseId;
                        break;
                    case 1:
                        element.value = courseData.courseInfoList[index1].courseName;
                        break;
                    case 2:
                        element.value = startTimeArray[0];
                        break;
                    case 3:
                        element.value = startTimeArray[1];
                        break;
                    case 4:
                        element.value = endTimeArray[0];
                        break;
                    case 5:
                        element.value = endTimeArray[1];
                        break; 
                    case 6:
                        element.value = courseData.courseInfoList[index1].credit;
                        break;
                    case 7:
                        element.value = courseData.courseInfoList[index1].selectLimit;
                        break;
                }
                daysCN.forEach((element , index3) => {
                    if(courseData.courseInfoList[index1].lessonDay === element){
                        selectElement.value = days[index3];
                    }
                });
            })
            
            //設定reqBody
            // console.log(allInputElement[0].value);
            // deleteCourseReq = new deleteStudentReqBody(allInputElement[0].value);
            // console.log(deleteStudentReq);
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
// deleteStudent.addEventListener("click" , ()=>{
//     if(window.confirm("警告 : 此操作會將學生資料完全刪除!")){
//         if(window.confirm("確定要刪除此學生資料嗎?")){
//             console.log(deleteStudentReq);
//             fetch("http://localhost:3000/api/deleteStudentInfo", {
//                 method: 'post',
//                 body: JSON.stringify(deleteStudentReq),
//                 headers: {
//                     'Content-Type': 'application/json; charset=utf-8'
//                 }
//             })
//             .then(res => res.json())
//             .then((data)=>{
//                 deleteData = data;
//                 console.log(deleteData);
//                 if(deleteData.success === true){
//                     deleteResult();
//                 }else{
//                     window.alert(deleteData.message);
//                 }
//             })
//             .catch(err => console.log(err))
//         }else{
//         }
//     }else{
//     }

// });

//編輯課程資訊
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

//以課程代碼或課程名搜尋
search.addEventListener("input" , ()=>{
    if(courseData.success === false){
        accordionFlush.innerHTML = "<h3 style=\"position:absolute; top:45%; left:50%; margin-left:-92px;\">無任何課程資訊</h3>";
    }else{
        let target = search.value;
        console.log(target);
        accordionFlush.innerHTML = "";
        courseData.courseInfoList.forEach((element , index) => {
            let itemNo = index + 1;
            if(element.courseName === target || element.courseId === target){
                accordionFlush.innerHTML += 
                `<div class=\"accordion-item\"><h2 class=\"accordion-header\"><button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse${itemNo}\" aria-expanded=\"false\" aria-controls=\"flush-collapse${itemNo}\">${element.courseId}&nbsp${element.courseName}</button></h2><div id=\"flush-collapse${itemNo}\" class=\"accordion-collapse collapse\" data-bs-parent=\"#accordionFlush\"><div class=\"accordion-body\"><h6>課程代碼:${element.courseId}</h6><h6>課程名稱:${element.courseName}</h6><h6>學分:${element.credit}</h6><h6>上課日:${element.lessonDay}</h6><h6>開始時間:${element.startTime}</h6><h6>下課時間:${element.endTime}</h6><h6>選修人數上限:${element.selectLimit}</h6><h6>選修學生名單:${element.selectedPerson}</h6>${addBtnList[index]}</div></div></div>`;
            }
            if(target.length === 0){
                loadCourseInfo();
            }
        });
    }
})

//fetch
document.addEventListener("DOMContentLoaded" , ()=>{

    fetch("http://localhost:3000/api/getAllCourseInfo", {method: 'post'})
    .then(res => res.json())
    .then((data)=>{
        courseData = data;
        console.log(courseData);
        loadCourseInfo();
        addBtnEvenListener();
    })
    .catch(err => console.log(err))
    
});