//button
const backBtn = document.getElementById("backBtn");
const commitSelect = document.getElementById("commitSelect");
const removeAllSelect = document.getElementById("removeAllSelect");
const removeBtn = document.getElementById("removeBtn");   //選課列表中的移除按鈕
const addBtn = document.getElementById("addBtn");   //課程訊息內的加入列表按鈕
let addBtnList = [];
const selectBtn = document.getElementById("selectBtn");     //課程訊息內的選課按鈕
let selectBtnList = [];
let disabledAddBtn = "<button disabled class=\"addBtn\" id=\"addBtn\">加入選課列表</button>";
let disabledSelectBtn = "<button disabled class=\"selectBtn\" id=\"selectBtn\">選課</button>";
let addBtnElementList = [];
let selectBtnElementList = [];
let removeBtnList = [];
let removeBtnElementList = [];

backBtn.addEventListener("click" , ()=>{
    window.location.href = "../../student_page/student_page.html";
});

removeAllSelect.addEventListener("click" , ()=> {
    indexList = [];
    cardFrame.innerHTML = "";
})

commitSelect.addEventListener("click" , ()=> {
    //建構reqBody
    let selectCourseList = []
    indexList.forEach((element) => {
        selectCourseList.push(courseData.courseInfoList[element].courseId);
    })
    let selectCourseListReq = new selectCourseListReqObj(accountId , selectCourseList);
    console.log(selectCourseListReq);
            
    fetch("http://localhost:3000/api/selectCourse", {
        method: 'post',
        body: JSON.stringify(selectCourseListReq),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(res => res.json())
    .then((data)=>{
        selectCourseResData = data;
        console.log(selectCourseResData);
        if(selectCourseResData.success === true){
            window.alert(selectCourseResData.message);
            if(selectCourseResData.nameConflictMessage !== undefined){
                window.alert(selectCourseResData.nameConflictMessage);
            }
            if(selectCourseResData.scheduleConflictMessage !== undefined){
                window.alert(selectCourseResData.scheduleConflictMessage);
            }
            location.reload();
        }else{
            window.alert(selectCourseResData.message);
            if(selectCourseResData.nameConflictMessage !== undefined){
                window.alert(selectCourseResData.nameConflictMessage);
            }
            if(selectCourseResData.scheduleConflictMessage !== undefined){
                window.alert(selectCourseResData.scheduleConflictMessage);
            }
        }
    })
    .catch(err => console.log(err))
})

//elements
let courseData = [];
let accordionFlush = document.getElementById("accordionFlush");
let indexList = [];
let valueList = [];
let cardList = [];
let allCardElement = [];
let cardFrame = document.getElementById("cardFrame");
let student = document.getElementById("student");
let logout = document.getElementById("logout");
let accountId;
let selectCourseResData = [];

logout.addEventListener("click" , ()=>{
    sessionStorage.removeItem("accountSession");
    localStorage.removeItem("accountLocal");
    window.location.href = "../../home_page/home_page.html";
});

student.addEventListener("click" , ()=>{
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
            accountId = accountLocal.studentId;
            if(accountLocal.administrator === true){
                window.alert("此為學生選課系統,教職員不可訪問")
                window.location.href = "../../home_page/home_page.html";
            }
            student.innerHTML = accountLocal.name;
        }
    }else{
        accountId = accountSession.studentId;
        if(accountSession.administrator === true){
            window.alert("此為學生選課系統,教職員不可訪問")
            window.location.href = "../../home_page/home_page.html";
        }
        student.innerHTML = accountSession.name;
    }
})

//functions

//渲染課程列表
function loadCourseInfo() {

    if(courseData.success === false){
        accordionFlush.innerHTML = "<h3 style=\"position:absolute; top:45%; left:50%; margin-left:-92px;\">無任何學生資訊</h3>";
    }else{
        //生成index與課程資料list一致的按鈕陣列
        courseData.courseInfoList.forEach((element , index)=>{
            //生成準備放到列表中的addBtn
            addBtnList.push("<button value=\"" + index + "\" class=\"addBtn addBtn" + (index+1) + "\" id=\"addBtn addBtn" + (index+1) + "\">加入選課列表</button>")
            //生成準備放到列表中的selectBtn
            selectBtnList.push("<button value=\"" + index + "\" class=\"selectBtn selectBtn" + (index+1) + "\" id=\"selectBtn selectBtn" + (index+1) + "\">選課</button>")
        })

        //生成列表 & 把按鈕添加進資訊欄中
        accordionFlush.innerHTML = "";
        courseData.courseInfoList.forEach((element , index) => {
            let itemNo = index + 1;
            let selectedPersonList = element.selectedPerson.split(",");
            if(selectedPersonList.length !== element.selectLimit){
                accordionFlush.innerHTML +=
                `<div class=\"accordion-item\"><h2 class=\"accordion-header\"><button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse${itemNo}\" aria-expanded=\"false\" aria-controls=\"flush-collapse${itemNo}\">${element.courseId}&nbsp${element.courseName}<h6 class="m-auto me-5 position-absolute end-0 fw-bolder text-success selectable">可以加選</h6></button></h2><div id=\"flush-collapse${itemNo}\" class=\"accordion-collapse collapse\" data-bs-parent=\"#accordionFlush\"><div class=\"accordion-body\"><h6>課程代碼:${element.courseId}</h6><h6>課程名稱:${element.courseName}</h6><h6>學分:${element.credit}</h6><h6>上課日:${element.lessonDay}</h6><h6>開始時間:${element.startTime}</h6><h6>下課時間:${element.endTime}</h6><h6>選修人數上限:${element.selectLimit}</h6><h6>選修學生名單:${element.selectedPerson}</h6>${addBtnList[index]}${selectBtnList[index]}</div></div></div>`;
            }else if(selectedPersonList.length === element.selectLimit){
                accordionFlush.innerHTML +=
                `<div class=\"accordion-item\"><h2 class=\"accordion-header\"><button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse${itemNo}\" aria-expanded=\"false\" aria-controls=\"flush-collapse${itemNo}\">${element.courseId}&nbsp${element.courseName}<h6 class="m-auto me-5 position-absolute end-0 fw-bolder text-danger notSelectable">不可加選</h6></button></h2><div id=\"flush-collapse${itemNo}\" class=\"accordion-collapse collapse\" data-bs-parent=\"#accordionFlush\"><div class=\"accordion-body\"><h6>課程代碼:${element.courseId}</h6><h6>課程名稱:${element.courseName}</h6><h6>學分:${element.credit}</h6><h6>上課日:${element.lessonDay}</h6><h6>開始時間:${element.startTime}</h6><h6>下課時間:${element.endTime}</h6><h6>選修人數上限:${element.selectLimit}</h6><h6>選修學生名單:${element.selectedPerson}</h6>${disabledAddBtn}${disabledSelectBtn}</div></div></div>`;   
            }
        })
        selectBtnElementList = document.querySelectorAll(".selectBtn");
    }
}

//生成列表按鈕的監聽
function addBtnEventListener() {
    //取得生成的ButtonElement
    addBtnElementList = document.querySelectorAll(".addBtn");
    console.log(courseData.courseInfoList);

    //設定addBtn
    courseData.courseInfoList.forEach((element , index) => {
        addBtnElementList[index].addEventListener("click" , () => {
            cardFrame.innerHTML = "";
            if(indexList.includes(index)){
                window.alert("選課列表中已有該課程!")
            }else{
                indexList.push(index);        
            }
            indexList.forEach((indexListElement , indexListIndex)=>{
                let courseId = courseData.courseInfoList[indexListElement].courseId;
                let courseName = courseData.courseInfoList[indexListElement].courseName;
                let removeBtn = `<button value="${indexListElement}" class="ps-1 pe-1 remove remove${indexListIndex+1}" id="remove remove${indexListIndex+1}">移除</button>`;
                if(!removeBtnList.includes(removeBtn)){
                    removeBtnList.push(removeBtn);
                }
                cardFrame.innerHTML += `<div data-value="${index}" class="card mb-2 ms-auto me-auto p-2  pe-5 rounded-3 text-center selectCourse${index}">${courseId}&nbsp${courseName}${removeBtnList[indexListIndex]}</div>`;
                allCardElement = cardFrame.querySelectorAll(".card");
                removeBtnElementList = cardFrame.querySelectorAll(".remove");
                cardList.push(indexListElement);
            })
        })
    })
}

cardList = new Proxy(cardList , {
    set(target, property, value) {
        Reflect.set(target, property, value);
        console.log(`Array element ${property} was set to ${value}`);
        removeBtnEventListener();
        return true;
    }
})


//設定removeBtn
function removeBtnEventListener() {

    //將removeBtnElementList依序添加按鈕功能
    console.log(removeBtnElementList);
    console.log(allCardElement);
    removeBtnElementList.forEach((removeBtnElement , removeBtnIndex) => {
        removeBtnElement.addEventListener("click" , () => {

            allCardElement[removeBtnIndex].remove();
            allCardElement = cardFrame.querySelectorAll(".card");

            // let newCardList = cardList;
            // cardList.forEach((cardListElement , cardListIndex) => {
            //     if(removeBtnElement.value === cardListElement){
            //         newCardList.splice(cardListIndex , 1); //splice(從指定位置開始刪除元素 , 要刪除的元素數量)
            //         allCardElement[cardListIndex].remove();
            //     }
            // })
            // cardList = newCardList;
            
            // console.log("cardList:" + cardList);

            // console.log("這個value是" + allCardElement[removeBtnIndex].dataset.value);
            
        })
    })
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
                let selectedPersonList = courseData.courseInfoList[index].selectedPerson.split(",");
                if(selectedPersonList.length !== courseData.courseInfoList[index].selectLimit){
                    accordionFlush.innerHTML +=
                    `<div class=\"accordion-item\"><h2 class=\"accordion-header\"><button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse${itemNo}\" aria-expanded=\"false\" aria-controls=\"flush-collapse${itemNo}\">${element.courseId}&nbsp${element.courseName}<h6 class="m-auto me-5 position-absolute end-0 fw-bolder text-success selectable">可以加選</h6></button></h2><div id=\"flush-collapse${itemNo}\" class=\"accordion-collapse collapse\" data-bs-parent=\"#accordionFlush\"><div class=\"accordion-body\"><h6>課程代碼:${element.courseId}</h6><h6>課程名稱:${element.courseName}</h6><h6>學分:${element.credit}</h6><h6>上課日:${element.lessonDay}</h6><h6>開始時間:${element.startTime}</h6><h6>下課時間:${element.endTime}</h6><h6>選修人數上限:${element.selectLimit}</h6><h6>選修學生名單:${element.selectedPerson}</h6>${addBtnList[index]}${selectBtnList[index]}</div></div></div>`;
                }else if(selectedPersonList.length === courseData.courseInfoList[index].selectLimit){
                    accordionFlush.innerHTML +=
                    `<div class=\"accordion-item\"><h2 class=\"accordion-header\"><button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapse${itemNo}\" aria-expanded=\"false\" aria-controls=\"flush-collapse${itemNo}\">${element.courseId}&nbsp${element.courseName}<h6 class="m-auto me-5 position-absolute end-0 fw-bolder text-danger notSelectable">不可加選</h6></button></h2><div id=\"flush-collapse${itemNo}\" class=\"accordion-collapse collapse\" data-bs-parent=\"#accordionFlush\"><div class=\"accordion-body\"><h6>課程代碼:${element.courseId}</h6><h6>課程名稱:${element.courseName}</h6><h6>學分:${element.credit}</h6><h6>上課日:${element.lessonDay}</h6><h6>開始時間:${element.startTime}</h6><h6>下課時間:${element.endTime}</h6><h6>選修人數上限:${element.selectLimit}</h6><h6>選修學生名單:${element.selectedPerson}</h6>${disabledAddBtn}${disabledSelectBtn}</div></div></div>`;   
                }
            }
            if(target.length === 0){
                loadCourseInfo();
            }
        });
    }
})

//reqBody
function selectCourseReqObj(studentId , courseId){
    this.studentId = studentId;
    this.courseId = courseId;
}

function selectCourseListReqObj(studentId , selectCourseList){
    this.studentId = studentId;
    this.selectCourseList = selectCourseList;
}

//設定selectBtn
function setSelectBtn() {   //必須設為function放在fetch內執行,否則會因非同步問題selectBtnElementList沒有值
    console.log(selectBtnElementList)
    selectBtnElementList.forEach((element , index) => {
        element.addEventListener("click" , () => {
            //建構reqBody
            let selectCourseReq = new selectCourseReqObj(accountId , courseData.courseInfoList[index].courseId);
            
            fetch("http://localhost:3000/api/selectCourse", {
                method: 'post',
                body: JSON.stringify(selectCourseReq),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .then(res => res.json())
            .then((data)=>{
                selectCourseResData = data;
                console.log(selectCourseResData);
                if(selectCourseResData.success === true){
                    window.alert(selectCourseResData.message);
                    location.reload();
                }else{
                    window.alert(selectCourseResData.message);
                }
            })
            .catch(err => console.log(err))
            })
    })
}

//fetch課程資訊清單
document.addEventListener("DOMContentLoaded" , ()=>{

    fetch("http://localhost:3000/api/getAllCourseInfo", {method: 'post'})
    .then(res => res.json())
    .then((data)=>{
        courseData = data;
        console.log(courseData);
        loadCourseInfo();
        setSelectBtn();
        addBtnEventListener();
    })
    .catch(err => console.log(err))
    
});