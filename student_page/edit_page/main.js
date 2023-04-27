const editBtn = document.getElementById("editBtn");
const backBtn = document.getElementById("backBtn");
const cancelBtn = document.getElementById("cancelBtn");
const changePwdFrame = document.getElementById("changePwdFrame");

backBtn.addEventListener("click" , ()=>{
    window.location.href = "../../student_page/student_page.html";
});

editBtn.addEventListener("click" , ()=>{
    changePwdFrame.style.top = "0";
    changePwdFrame.style.transform = "rotate(0deg)";
});

cancelBtn.addEventListener("click" , ()=>{
    changePwdFrame.style.top = "-150vh";
    changePwdFrame.style.transform = "rotate(-90deg)";
});