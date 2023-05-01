//按鈕
const backBtn = document.getElementById("backBtn");
const addCourse = document.getElementById("addCourse");
const editCourse = document.getElementById("editCourse");
const selectListEdit = document.getElementById("selectListEdit");

backBtn.addEventListener("click" , ()=>{
    window.location.href = "../school_page.html";
});

addCourse.addEventListener("click" , ()=>{
    window.location.href = "add_course/add_course.html";
});

editCourse.addEventListener("click" , ()=>{
    window.location.href = "edit_course/edit_course.html";
});

selectListEdit.addEventListener("click" , ()=>{
    window.location.href = "select_list_edit/select_list_edit.html";
});

//Element
let accordionFlush = document.getElementById("accordionFlush");
const search = document.getElementById("search");
let courseData = [];
let employee = document.getElementById("employee");

logout.addEventListener("click" , ()=>{
    sessionStorage.removeItem("accountSession");
    localStorage.removeItem("accountLocal");
    window.location.href = "../../home_page/home_page.html";
});

employee.addEventListener("click" , ()=>{
    window.location.href = "../edit_page/edit_page.html";
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
                window.alert("您沒有權限訪問!")
                window.location.href = "../../home_page/home_page.html";
            }
            employee.innerHTML = accountLocal.name;
        }
    }else{
        if(accountSession.administrator === false){
            window.alert("您沒有權限訪問!")
            window.location.href = "../../home_page/home_page.html";
        }
        employee.innerHTML = accountSession.name;
    }
})

//functions

//列出課程列表
function loadCourseInfo() {

    if(courseData.success === false){
        accordionFlush.innerHTML = "<h3 style=\"position:absolute; top:45%; left:50%; margin-left:-92px;\">無任何學生資訊</h3>";
    }else{
        //生成列表
        accordionFlush.innerHTML = "";
        courseData.courseInfoList.forEach((element , index) => {
            let itemNo = index + 1;
            accordionFlush.innerHTML += 
            `<div class=\"accordion-item\"><h2 class=\"accordion-header\"><button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse${itemNo}\" aria-expanded=\"false\" aria-controls=\"flush-collapse${itemNo}\">${element.courseId}&nbsp${element.courseName}</button></h2><div id=\"flush-collapse${itemNo}\" class=\"accordion-collapse collapse\" data-bs-parent=\"#accordionFlush\"><div class=\"accordion-body\"><h6>課程代碼:${element.courseId}</h6><h6>課程名稱:${element.courseName}</h6><h6>學分:${element.credit}</h6><h6>上課日:${element.lessonDay}</h6><h6>開始時間:${element.startTime}</h6><h6>下課時間:${element.endTime}</h6><h6>選修人數上限:${element.selectLimit}</h6><h6>選修學生名單:${element.selectedPerson}</h6></div></div></div>`;
        });    
    }
}

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
                `<div class=\"accordion-item\"><h2 class=\"accordion-header\"><button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse${itemNo}\" aria-expanded=\"false\" aria-controls=\"flush-collapse${itemNo}\">${element.courseId}&nbsp${element.courseName}</button></h2><div id=\"flush-collapse${itemNo}\" class=\"accordion-collapse collapse\" data-bs-parent=\"#accordionFlush\"><div class=\"accordion-body\"><h6>課程代碼:${element.courseId}</h6><h6>課程名稱:${element.courseName}</h6><h6>學分:${element.credit}</h6><h6>上課日:${element.lessonDay}</h6><h6>開始時間:${element.startTime}</h6><h6>下課時間:${element.endTime}</h6><h6>選修人數上限:${element.selectLimit}</h6><h6>選修學生名單:${element.selectedPerson}</h6></div></div></div>`;
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
})
.catch(err => console.log(err))
    
});
