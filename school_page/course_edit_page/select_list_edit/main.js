//reqBody
function reqBodyObj(studentId , courseId) {
    this.studentId = studentId;
    this.courseId = courseId;
}

//按鈕
const backBtn = document.getElementById("backBtn");
const addPersonBtn = document.getElementById("addPersonBtn");
const deletePersonBtn = document.getElementById("deletePersonBtn");

backBtn.addEventListener("click" , ()=>{
    window.location.href = "../course_edit_page.html";
});

//Element
let courseData;
let addBtnList = [];
let addBtnElementList = [];
let addPerson = document.getElementById("addPerson");
let deletePerson = document.getElementById("deletePerson");
let personSelect = document.getElementById("personSelect");
let selectedEditCourse = document.getElementById("selectedEditCourse");
let selectElement = document.getElementById("personSelect");
let inputFrame = document.getElementById("inputFrame");
let allInlebelElement = inputFrame.querySelectorAll("label");
let selectedPerson = [];
let selectedCourseId;
let editData = [];
let logout = document.getElementById("logout");
let employee = document.getElementById("employee");

logout.addEventListener("click" , ()=>{
    sessionStorage.removeItem("accountSession");
    localStorage.removeItem("accountLocal");
    window.location.href = "../../home_page/home_page.html";
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
        accordionFlush.innerHTML = "<h3 style=\"position:absolute; top:45%; left:50%; margin-left:-92px;\">無任何課程資訊</h3>";
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
    console.log(courseData.courseInfoList);

    //設定addBtn
    addBtnElementList.forEach((element , index) => {
        element.addEventListener("click" , () => {
            selectedCourseId = courseData.courseInfoList[index].courseId;
            selectedEditCourse.innerText = courseData.courseInfoList[index].courseId + " " + courseData.courseInfoList[index].courseName;
            addPerson.disabled = false;
            personSelect.disabled = false;

            //清空選單
            while (personSelect.firstChild) {   //firstChild檢查第一個DOM子元素,DOM被JS視為真值,或引用到判斷式中就會是true,沒有則回傳null
                personSelect.removeChild(personSelect.firstChild);
            }

            if(courseData.courseInfoList[index].selectedPerson.length === 0){
                var option = document.createElement("option");
                option.text = "無";
                personSelect.add(option);
            }else{
                selectedPerson = courseData.courseInfoList[index].selectedPerson.split(",");
                selectedPerson.forEach((selectedPersonElemnt) => {
                    var option = document.createElement("option");
                    option.text = selectedPersonElemnt;
                    personSelect.add(option);
                })   
            }
        })
    })
}

//成功修改後的顯示更動
function editResult() {

    selectedEditCourse.style.display = "none";

    selectElement.style.display = "none";

    allInlebelElement.forEach((element) => {
        element.style.display = "none";
    });

    inputFrame.style.width = "80%";
    inputFrame.innerHTML = `<h4 style="margin:auto; margin-top:50%;">${editData.message}</h4>`;
    inputFrame.innerHTML += `<button class="resultBackBtn" id="resultBackBtn">返回</button>`

    let resultBackBtn = document.getElementById("resultBackBtn");

    resultBackBtn.addEventListener("click" , ()=>{
        location.reload();
    })
    
}

//退選學生
deletePersonBtn.addEventListener("click" , ()=>{
    if(personSelect.value === "無"){
        window.alert("沒有選擇的學生!")
    }else{
        if(window.confirm("警告 : 此操作會將該學生退選!")){
            if(window.confirm("確定要退選此學生嗎?")){
    
                //建構reqBody
                let DeleteReqBody = new reqBodyObj(personSelect.value , selectedCourseId);
                console.log(DeleteReqBody);
                fetch("http://localhost:3000/api/dropCourse", {
                    method: 'post',
                    body: JSON.stringify(DeleteReqBody),
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
            }else{
            }
        }else{
        } 
    }
});

//加選學生
addPersonBtn.addEventListener("click" , ()=>{
    if(addPerson.value.length === 0){
        window.alert("請輸入學生學號!")
    }else{
        if(window.confirm("提醒 : 此操作會將該學生加選!")){
            if(window.confirm("確定要加選此學生嗎?")){
    
                //建構reqBody
                let addReqBody = new reqBodyObj(addPerson.value , selectedCourseId);
                console.log(addReqBody);
                fetch("http://localhost:3000/api/selectCourse", {
                    method: 'post',
                    body: JSON.stringify(addReqBody),
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
            }else{
            }
        }else{
        }
    }

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