//Declaring the Dom Variables
const inputContainer = document.querySelector("#input-container")
const datePicker = document.querySelector("#date-picker")
const errorText = document.querySelector("#error-text")
const countdownBtn2 = document.querySelector("#countdown-btn2")
const countdownForm = document.querySelector("#countdown-form")
const countDownT = document.querySelector("#countdown-title")
const countDownEl = document.querySelector("#countdown")
const span = document.querySelectorAll("span")
const complete = document.querySelector("#complete")
const completeTitle = document.querySelector(".complete-tile")
const completeInfo = document.querySelector("#complete-info")
const completeBtn = document.querySelector("#complete-btn")

//Setting initial Variables
let countDownTitle = ""
let countDownDate = ""
let countDate = Date
let activeCount
let saveCountDown
const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

//Updatimg the minimum date that can be set
const todayDate = new Date().toISOString().split("T")[0]
datePicker.setAttribute("min", todayDate)

//updating the DOM with the values gotten
function updateDom(){
    //Using setInterval to make sure the code runs every second
    activeCount = setInterval(() => {
        const currentTime = new Date().getTime()
        const distance = countDate - currentTime
        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)
        inputContainer.hidden = true
        console.log(distance)
        if(distance <= 0){
            countDownEl.hidden = true
            clearInterval(activeCount)
            completeInfo.textContent = `${countDownTitle} was finished on ${countDownDate}`
            complete.hidden = false
        }else{
            countDownT.textContent = countDownTitle
            span[0].textContent = days
            span[1].textContent = hours
            span[2].textContent = minutes
            span[3].textContent = seconds
            countDownEl.hidden = false
            complete.hidden = true
        }
    }, second);
}

//getting the value of the forms
function updateCountDown(e){
    e.preventDefault()
    countDownTitle = e.srcElement[0].value
    countDownDate = e.srcElement[1].value
    saveCountDown = {
        title: countDownTitle,
        date: countDownDate
    }
    localStorage.setItem("countDown", JSON.stringify(saveCountDown))
    //get value of current date in ms
    if(countDownDate === ""){
        errorText.textContent = `Pleasee fill in all fields`
    }else{
        countDate = new Date(countDownDate).getTime()
        updateDom()
    }    
}
//Reset function
function reset(){
    inputContainer.hidden = false
    countDownEl.hidden = true
    complete.hidden = true
    clearInterval(activeCount)
    countDownTitle = ""
    countDownDate = ""
    localStorage.removeItem("countDown")
}
//Checking for previous countdown
function previousCheck(){
    if(localStorage.getItem("countDown")){
        inputContainer.hidden = true
        saveCountDown = JSON.parse(localStorage.getItem("countDown"))
        countDownTitle = saveCountDown.title
        countDownDate = saveCountDown.date
        countDate = new Date(countDownDate).getTime()
        updateDom()

    }
}
//Setting up an event listener for the form
countdownForm.addEventListener("submit", updateCountDown)
countdownBtn2.addEventListener("click", reset)
completeBtn.addEventListener("click", reset)
previousCheck()

