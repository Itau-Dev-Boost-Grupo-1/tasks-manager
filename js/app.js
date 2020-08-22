let tasksList = [];

/**
 * Add new Task
 */

function addNewTask(value) {
  const newTask = {
    value,
    id: Date.now(),
  };

  tasksList.push(newTask);
  renderTasks(newTask);
}

/**
 * Handle form submit
 */

const form = document.querySelector(".add-task__form");

form.addEventListener("submit", (e) => {
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
    <p class="tasks__list-item-title">${task.value}</p>

    <ul class="tasks__list-item-timer">
      <li><span class="tasks__list-item-hours">00</span>:</li>
      <li><span class="tasks__list-item-minutes">00</span>:</li>
      <li><span class="tasks__list-item-seconds">00</span></li>
    </ul>

    <div class="tasks__list-item-controls">
      <button class="tasks__list-item-button tasks__list-item-pause">
        <img src="./img/icon__pause.svg" alt="Pause icon">
      </button>

      <button class="tasks__list-item-button tasks__list-item-play" onClick="startTimer(${task.id})">
        <img src="./img/icon__play.svg" alt="Play icon">
      </button>
    </div>
  `;

  tasksList.append(taskItem);
}

/**
 * Start Timer
 */

function formatTime(value) {
  return value > 9 ? value : "0" + value;
}

function startTimer(id) {
  console.log(`cliquei no play do item ${id}`);

  let seconds = 0;

  const counter = setInterval(function () {
    const minutesField = document.querySelector(
      `[data-key='${id}'] .tasks__list-item-minutes`
    );

    const secondsField = document.querySelector(
      `[data-key='${id}'] .tasks__list-item-seconds`
    );

    minutesField.innerHTML = formatTime(parseInt(seconds / 60, 10));
    secondsField.innerHTML = formatTime(++seconds % 60);
  }, 1000);
}
