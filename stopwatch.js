// Create Template Variables
const INTERVAL_MS = 1000 / 60; //16.67 milliseconds
let timerID;
let lastTimerStartTime = 0;
let millisElapsedBeforeLastStart = 0;//تخزين عدد الثواني الفاصلة قبل آخر مرة تم فيها بدء المؤقت.

// Get Our Data From The DOM
const timer = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");

// USE EVENTS
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimers);

// ---- CREATING A FUNCTIONS ----

// 1. startTimer
function startTimer() {

  startButton.disabled = true;//قم بتعطيل هذا الزر
  stopButton.disabled = false;
  resetButton.disabled = true;

  lastTimerStartTime = Date.now();//Record the current time
  timerID = setInterval(updateTimer, INTERVAL_MS);
}

// 2. stopTimer*
function stopTimer() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;

  millisElapsedBeforeLastStart += Date.now() - lastTimerStartTime;
  clearInterval(timerID);//tells the browser to stop executing the function that was set to run repeatedly using setInterval
}

// 3. resetTimer
function resetTimers() {
  resetButton.disabled = true;
  timer.textContent = "00:00:00";       
  millisElapsedBeforeLastStart = 0;
}

// 4. updateTimer
function updateTimer() {
  const milllisElapsed =
    Date.now() - lastTimerStartTime + millisElapsedBeforeLastStart;
  const secondsElapsed = milllisElapsed / 1000;
  const minutesElapsed = secondsElapsed / 60;

  const millisText = formateNumber(milllisElapsed % 1000, 3);
  const secondsText = formateNumber(Math.floor(secondsElapsed) % 60, 2);
  const minutesText = formateNumber(Math.floor(minutesElapsed), 2);
  timer.textContent = `${minutesText}:${secondsText}:${millisText}`;
}


// 5. formatNumber
function formateNumber(number, desiredLength) {
  const stringNumber = String(number);
  if (stringNumber.length > desiredLength) {
    return stringNumber.slice(0, desiredLength);
  }

  return stringNumber.padStart(desiredLength, "0");
}