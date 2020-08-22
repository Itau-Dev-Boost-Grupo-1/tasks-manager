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
});

/**
 * Render tasks
 */

function renderTasks(task) {
  const tasksList = document.querySelector(".tasks__list");

  const taskItem = document.createElement("li");

  taskItem.setAttribute("class", `tasks__list-item`);

  taskItem.innerHTML = `
    <p class="tasks__list-item-title">${task.value}</p>
  `;

  tasksList.append(taskItem);
}
