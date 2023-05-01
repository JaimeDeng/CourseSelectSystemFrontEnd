
//button
const backBtn = document.getElementById("backBtn");
let allDropBtn = [];
let allCard = [];

backBtn.addEventListener("click" , ()=>{
    window.location.href = "../edit_page.html";
});

//element
let accountId;
let selectedCourseList = [];
let student = document.getElementById("student");
let logout = document.getElementById("logout");
let courseData = [];
let studentData = [];
let cardCoursIdList = [];
const allDayFrame = document.querySelectorAll(".dayFrame");
console.log(allDayFrame)

logout.addEventListener("click" , ()=>{
    sessionStorage.removeItem("accountSession");
    localStorage.removeItem("accountLocal");
    window.location.href = "../../../home_page/home_page.html";
});

student.addEventListener("click" , ()=>{
    window.location.href = "../edit_page.html";
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
            accountId = accountLocal.studentId;
            if(accountLocal.administrator === true){
                window.alert("此為學生選課系統,教職員不可訪問")
                window.location.href = "../../../home_page/home_page.html";
            }
            student.innerHTML = accountLocal.name;
        }
    }else{
        accountId = accountSession.studentId;
        if(accountSession.administrator === true){
            window.alert("此為學生選課系統,教職員不可訪問")
            window.location.href = "../../../home_page/home_page.html";
        }
        student.innerHTML = accountSession.name;
    }
})

//渲染已選課程card
function loadSelectedCourseInfo() {

    selectedCourseStr = studentData.selectedCourse;
    console.log(selectedCourseStr);
    selectedCourseList = selectedCourseStr.split(",");
    selectedCourseList.forEach((element , index)=>{

        //已選課程的ID去比對抓到的資料的課程Id , 以及資訊
        courseData.courseInfoList.forEach((courseDataElement) => {
            if(courseDataElement.courseId === element){
                let lessonDay = courseDataElement.lessonDay;
                let courseName = courseDataElement.courseName;
                let startTime = courseDataElement.startTime;
                let endTime = courseDataElement.endTime;
                let credit = courseDataElement.credit;

                const cardElement = document.createElement("div");
                let cardClass = "card";
                let cardClassAdd = `card${element}`;
                let cardId = `card card${element}`;
                cardElement.classList.add(cardClass);
                cardElement.classList.add(cardClassAdd);    //class名稱要空白的話需要add兩次 , 不可以直接打空白會跳DOMException
                cardElement.id = cardId;    //id則可以以含有空白字符的方式輸入
                cardElement.setAttribute("data-value", element); // 設定 data-value 的值為 "789"
                cardElement.innerHTML = `<h5 class="fw-bold mt-1">${element}&nbsp${courseName}</h5>上課時間<br>${startTime}~${endTime}<br>學分:${credit}`;
                
                //把card按到上課日放進個別的frame裡面
                switch(lessonDay){
                    case "星期一":
                        allDayFrame[1].appendChild(cardElement);
                        cardCoursIdList.push(element);
                        break;
                    case "星期二":
                        allDayFrame[2].appendChild(cardElement);
                        cardCoursIdList.push(element);
                        break;
                    case "星期三":
                        allDayFrame[3].appendChild(cardElement);
                        cardCoursIdList.push(element);
                        break;
                    case "星期四":
                        allDayFrame[4].appendChild(cardElement);
                        cardCoursIdList.push(element);
                        break;
                    case "星期五":
                        allDayFrame[5].appendChild(cardElement);
                        cardCoursIdList.push(element);
                        break;
                    case "星期六":
                        allDayFrame[6].appendChild(cardElement);
                        cardCoursIdList.push(element);
                        break;
                    case "星期日":
                        allDayFrame[0].appendChild(cardElement);
                        cardCoursIdList.push(element);
                        break;
                }
            }
        })

    })
}

function setDropBtn() {
    allCard = document.querySelectorAll(".card");
    console.log(allCard);
    allCard.forEach((element , index) => {
        const dropBtn = document.createElement("button");
        let btnClass = "dropBtn";
        let btnClassAdd = `dropBtn${index}`;
        let btnId = `dropBtn dropBtn${index}`;
        dropBtn.innerText = "退選";
        dropBtn.classList.add(btnClass);
        dropBtn.classList.add(btnClassAdd);    //class名稱要空白的話需要add兩次 , 不可以直接打空白會跳DOMException
        dropBtn.id = btnId;    //id則可以以含有空白字符的方式輸入
        element.appendChild(dropBtn);
    })

    //把父元素card做addEventListener
    allCard.forEach((element , index) => {
        //當card被點擊時獲取 自定義為"event" 的操作
        element.addEventListener("click" , (event) => {
            //如果event 的target(執行對象) 的tagName(HTML標籤名稱) 是BUTTON(按鈕)
            if (event.target.tagName === 'BUTTON') {
                //就獲取這顆按鈕的.parentNode(父元素DOM).dataset.value(Data-value)
                const cardValue = event.target.parentNode.dataset.value;
                console.log(cardValue)
                let courseId = cardValue;

                if(window.confirm("提醒: 您將退選您的課程")){
                    if(window.confirm("確定要將該課程退選嗎?")){
                        //reqBody
                        function dropCourseReqBody(studentId , courseId){
                            this.studentId = studentId;
                            this.courseId = courseId;
                        }

                        let reqBody = new dropCourseReqBody(accountId , courseId);

                        fetch("http://localhost:3000/api/dropCourse", {
                            method: "post",
                            body: JSON.stringify(reqBody),
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            }
                        })
                        .then(res => res.json())
                        .then((data)=>{
                            console.log(data);
                            if(data.success === true){
                                window.alert(data.message);
                                location.reload();
                            }else{
                                window.alert(data.message);
                            }
                        })
                        .catch(err => console.log(err))                
                    }
                }
            }
        })
    })
}



//fetch課程資訊清單
function fetchCourseInfo() {

    fetch("http://localhost:3000/api/getAllCourseInfo", {method: 'post'})
    .then(res => res.json())
    .then((data)=>{
        courseData = data;
        console.log(courseData);
        loadSelectedCourseInfo();   //fetchCourseInfo的then裡面才會以同步執行
        setDropBtn();
    })
    .catch(err => console.log(err))
    
}

//fetch學生資訊清單

//reqBody
function studentInfoReqBody(studentId) {
    this.studentId = studentId;
}

document.addEventListener("DOMContentLoaded" , ()=>{

    let reqBody = new studentInfoReqBody(accountId);

    fetch("http://localhost:3000/api/getStudentInfoByStudentId", {
        method: "post",
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(res => res.json())
    .then((data)=>{
        studentData = data;
        console.log(studentData);
        fetchCourseInfo();
    })
    .catch(err => console.log(err))
    
});