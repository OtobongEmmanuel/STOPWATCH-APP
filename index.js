// Variables to track stopwatch time
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = !true;    // sets the stopwatch as not active by default

// Get the HTML elements
const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const laps = document.getElementById("laps");

// Function to format time > hours:minutes:seconds.milliseconds
function formatTime(ms) {    
    let hours = Math.floor(ms / 3600000);
    let minutes =  Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = ms % 1000;
    console.log(seconds)

    // Add leading zeros to time (e.g "07" instead of "7")
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(3, "0");

    // return innerHTML so it's possible to style the milliseconds
    return document.getElementById("display").innerHTML =
    `${hours}:${minutes}:${seconds}:<span class="ms">${milliseconds}</span>`;
}

// Function to start stopwatch
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.innerHTML = formatTime(elapsedTime);
    }, 10);     // update time every 10ms
    running = true; // marks the stopwatch as active
    startStopButton.textContent = "Stop";   // change button text to "Stop"
}

// Function to reset stopwatch
function stopTimer() {
    clearInterval(timerInterval);   // stops the repeating function
    running = !true; // marks the stopwatch as not active
    startStopButton.textContent = "Start"   // change button text back to "Start"
}

// Function to reset stopwatch
function resetTimer() {
    clearInterval(timerInterval);   // stops the timer if running
    running = !true;    // marks the stopwatch as not active
    elapsedTime = 0;
    display.innerHTML = "00:00:00:<span style='font-size: 0.7em; color: rgb(232, 214, 214)'>000</span>";    // updates the display to default "00:00:00:00"
    startStopButton.textContent = "Start";  // ensures that the stop button changes to "Start"
    laps.innerHTML = "";    // clear lap records
}

// Save a lap time
function recordLap() {
  if (running) {    // only records if stopwatch is running
    const li = document.createElement("li"); // create a new list item
    const lapNumber = laps.children.length + 1; // gets the existing lap number and increases it by 1 for each new lap and stores it in a const variable
    li.innerHTML = `<b>#${lapNumber}</b> ${formatTime(elapsedTime)}`; // <b></b> to bolden the #lapNumber
    laps.prepend(li) // adds new lap to the top
  }
}

// Button Event Listeners
startStopButton.addEventListener("click", () => {
    if (!running) {
        startTimer();
    } else {
        stopTimer();
    }
});

resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap)