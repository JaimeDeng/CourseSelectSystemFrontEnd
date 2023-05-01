//按鈕
const cancelBtn = document.getElementById("cancelBtn");
const commitBtn = document.getElementById("commitBtn");

cancelBtn.addEventListener("click" , ()=>{
    window.location.href = "../course_edit_page.html";
});

//Element
let resData;
const inputFrame = document.getElementById("inputFrame");
let allInput = inputFrame.querySelectorAll("input");
let allLabel = inputFrame.querySelectorAll("label");
let btnFrame = document.getElementById("btnFrame");
let days = ["monday" , "tuesday" , "wednesday" , "thursday" , "friday" , "saturday" , "sunday"];
let daysCN = ["星期一" , "星期二" , "星期三" , "星期四" , "星期五" , "星期六" , "星期日"];
let accountId;
let employee = document.getElementById("employee");
let logout = document.getElementById("logout");

logout.addEventListener("click" , ()=>{
    sessionStorage.removeItem("accountSession");
    localStorage.removeItem("accountLocal");
    window.location.href = "../../../home_page/home_page.html";
});

employee.addEventListener("click" , ()=>{
    window.location.href = "../../edit_page/edit_page.html";
});

//input
const courseIdElement = document.getElementById("courseIdInput");
const courseNameElement = document.getElementById("courseNameInput");
const lessonDayElement = document.getElementById("lessonDaySelect");
const startTimeHourElement = document.getElementById("startTimeHourInput");
const startTimeMinuteElement = document.getElementById("startTimeMinuteInput");
const endTimeHourElement = document.getElementById("endTimeHourInput");
const endTimeMinuteElement = document.getElementById("endTimeMinuteInput");
const creditElement = document.getElementById("creditInput");
const selectLimitElement = document.getElementById("selectLimitInput");

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

//reqBody
function reqBodyObj(courseId , courseName , lessonDay , startTime , endTime , credit , selectLimit){
    this.courseId = courseId;
    this.courseName = courseName;
    this.lessonDay = lessonDay;
    this.startTime = startTime;
    this.endTime = endTime;
    this.credit = credit;
    this.selectLimit = selectLimit;
}

//時間框自動換行
startTimeHourElement.addEventListener("input" , ()=>{
    if(startTimeHourElement.value.length >= startTimeHourElement.maxLength){
        startTimeMinuteElement.focus();
    }
})
startTimeMinuteElement.addEventListener("input" , ()=>{
    if(startTimeMinuteElement.value.length >= startTimeMinuteElement.maxLength){
        endTimeHourElement.focus();
    }
    if(startTimeMinuteElement.value.length === 0){
        startTimeHourElement.focus();
    }
})
endTimeHourElement.addEventListener("input" , ()=>{
    if(endTimeHourElement.value.length >= endTimeHourElement.maxLength){
        endTimeMinuteElement.focus();
    }
    if(endTimeHourElement.value.length === 0){
        startTimeMinuteElement.focus();
    }
})
endTimeMinuteElement.addEventListener("input" , ()=>{
    if(endTimeMinuteElement.value.length === 0){
        endTimeHourElement.focus();
    }
})

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
    inputFrame.innerHTML = `<h3 style="margin:auto;">${resData.message}</h3>`;

    cancelBtn.addEventListener("click" , ()=>{
        location.reload();
    });
}


console.log(btnFrame);

commitBtn.addEventListener("click" , ()=>{

    //轉換時間格式
    startTimeArray = [startTimeHourElement.value , startTimeMinuteElement.value]
    let startTime = startTimeArray.join(":");
    endTimeArray = [endTimeHourElement.value , endTimeMinuteElement.value]
    let endTime =endTimeArray.join(":");

    //轉換上課日格式
    let lessonDay
    days.forEach((element , index)=>{
        if(lessonDayElement.value === element){
            lessonDay = daysCN[index];
        }
    })

    //建立reqBody
    let reqBody = new reqBodyObj(courseIdElement.value , courseNameElement.value , lessonDay , startTime , endTime , creditElement.value , selectLimitElement.value);
    console.log(reqBody);

    //fetch
    fetch("http://localhost:3000/api/setCourseInfo" , {
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
            console.log(resData);
            result();
        }else{
            window.alert(resData.message);
        }
    })
    .catch(function(err) {
        console.log(err);
    })

});
