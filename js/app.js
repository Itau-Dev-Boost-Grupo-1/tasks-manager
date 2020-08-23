let tasksList = [];

/**
 * Add new Task
 */

function addNewTask(text) {
  const newTask = {
    text,
    id: Date.now(),
    seconds: 0,
  };

  tasksList.push(newTask);
  renderTasks(newTask);
}

/**
 * Handle form submit
 */

const form = document.querySelector(".add-task__form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formInput = document.querySelector(".add-task__form-input");

  const text = formInput.value.trim();

  addNewTask(text);
  formInput.value = "";
});

/**
 * Render tasks
 */

function renderTasks(task) {
  const tasksList = document.querySelector(".tasks__list");

  const taskItem = document.createElement("li");

  taskItem.setAttribute("class", "tasks__list-item");

  taskItem.setAttribute("data-key", `${task.id}`);

  taskItem.innerHTML = `
    <p class="tasks__list-item-title">${task.text}</p>

    <ul class="timer">
      <li><span class="timer__hours">00</span>:</li>
      <li><span class="timer__minutes">00</span>:</li>
      <li><span class="timer__seconds">00</span></li>
    </ul>

    <div class="tasks__list-item-controls">
      <button class="tasks__list-item-button tasks__list-item-pause"  onclick="pause(${task.id})">
        <img src="./img/icon__pause.svg" alt="Pause icon">
      </button>

      <button class="tasks__list-item-button tasks__list-item-play" onclick="start(${task.id})">
        <img src="./img/icon__play.svg" alt="Play icon">
      </button>
    </div>
  `;

  tasksList.append(taskItem);
}

/**
 * Format Time
 */

function formatTime(value) {
  return value > 9 ? value : "0" + value;
}

/**
 * Start Timer
 */

function start(id) {
  const currentItem = tasksList.find(function (item) {
    return item.id === id;
  });

  const currentPlayButton = document.querySelector(
    `[data-key='${id}'] .tasks__list-item-play`
  );

  currentPlayButton.setAttribute("disabled", "true");

  currentItem.interval = setInterval(function () {
    ++currentItem.seconds;

    const hoursField = document.querySelector(
      `[data-key='${id}'] .timer__hours`
    );

    const minutesField = document.querySelector(
      `[data-key='${id}'] .timer__minutes`
    );

    const secondsField = document.querySelector(
      `[data-key='${id}'] .timer__seconds`
    );

    hoursField.innerHTML = formatTime(parseInt(currentItem.seconds / 3600));
    minutesField.innerHTML = formatTime(
      parseInt((currentItem.seconds % 3600) / 60, 10)
    );
    secondsField.innerHTML = formatTime(currentItem.seconds % 60);
  }, 1000);
}

/**
 * Pause Timer
 */

function pause(id) {
  const currentItem = tasksList.find(function (item) {
    return item.id === id;
  });

  const currentPlayButton = document.querySelector(
    `[data-key='${id}'] .tasks__list-item-play`
  );

  currentPlayButton.removeAttribute("disabled");

  clearInterval(currentItem.interval);
}

/**
 * Stop all timers
 */

function stopAllTimers() {
  tasksList.map(function (item) {
    clearInterval(item.interval);
  });

  const allPlayButtons = document.querySelectorAll(".tasks__list-item-play");

  allPlayButtons.forEach((button) => {
    button.removeAttribute("disabled");
  });
}

/**
 * Total Counter
 */

function totalCounter() {
  stopAllTimers();

  var sumOfSeconds = tasksList.reduce(function (prevVal, elem) {
    return prevVal + elem.seconds;
  }, 0);

  const totalHours = parseInt(sumOfSeconds / 3600);
  const totalMinutes = parseInt((sumOfSeconds % 3600) / 60, 10);
  const totalSeconds = sumOfSeconds % 60;

  const hoursField = document.querySelector(
    ".tasks__total-timer .timer__hours"
  );

  const minutesField = document.querySelector(
    ".tasks__total-timer .timer__minutes"
  );

  const secondsField = document.querySelector(
    ".tasks__total-timer .timer__seconds"
  );

  hoursField.innerHTML = formatTime(totalHours);
  minutesField.innerHTML = formatTime(totalMinutes);
  secondsField.innerHTML = formatTime(totalSeconds);
}
