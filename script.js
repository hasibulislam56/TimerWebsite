let countdown;
let running = false;
let remainingTime = 0;

const timerElement = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const alarmSound = document.getElementById('alarmSound');

function formatTime(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

function updateDisplay(hours, minutes, seconds) {
    timerElement.textContent = 
        `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function parseInput() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    return (hours * 3600) + (minutes * 60) + seconds;
}

function updateInputFields(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    hoursInput.value = hours;
    minutesInput.value = minutes;
    secondsInput.value = seconds;
}

function countdownTimer() {
    if (!running) {
        remainingTime = remainingTime || parseInput();
        function tick() {
            if (remainingTime <= 0) {
                clearInterval(countdown);
                running = false;
                alarmSound.play();
                alert('Time is up!');
                return;
            }
            remainingTime--;
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;
            updateDisplay(hours, minutes, seconds);
        }
        tick();
        countdown = setInterval(tick, 1000);
        running = true;
    }
}

function stopTimer() {
    clearInterval(countdown);
    running = false;
}

function resetTimer() {
    clearInterval(countdown);
    running = false;
    remainingTime = 0;
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
    updateDisplay(0, 0, 0);
}

startButton.addEventListener('click', countdownTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

