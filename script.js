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
const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNoteButton');
const notesContainer = document.getElementById('notes');
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const tasksContainer = document.getElementById('tasks');
const themeButton = document.getElementById('themeButton');

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

function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText === '') return;

    const note = document.createElement('div');
    note.classList.add('note');
    note.textContent = noteText;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => {
        notesContainer.removeChild(note);
    });

    note.appendChild(deleteButton);
    notesContainer.appendChild(note);

    noteInput.value = '';
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = document.createElement('li');
    task.classList.add('task');
    task.textContent = taskText;

    task.addEventListener('click', () => {
        task.classList.toggle('task-complete');
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', (e) => {
        tasksContainer.removeChild(task);
        e.stopPropagation();
    });

    task.appendChild(deleteButton);
    tasksContainer.appendChild(task);

    taskInput.value = '';
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        themeButton.textContent = '🌜';
    } else {
        themeButton.textContent = '🌞';
    }
}

startButton.addEventListener('click', countdownTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
addNoteButton.addEventListener('click', addNote);
addTaskButton.addEventListener('click', addTask);
themeButton.addEventListener('click', toggleTheme);

