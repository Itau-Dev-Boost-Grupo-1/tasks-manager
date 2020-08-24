var TaskManager = function(title, containerId, taskPlaceholder) {
  var name = title || "Task Manager";

  var classes = {
    taskManager: "task-manager",
    form: "task__form",
    title: "app__title",
    taskInput: "task__form-input",
    displayTotal: "task__form-input--small",
    addTaskContainer: "task",
    addTaskButton: "task__form-button",
    taskListContainer: "tasks__list"
  };

  var inputTaskPlaceHolder =  taskPlaceholder || "Create task manager app";
  var taskListUI = null;
  var tasks = [];

  var _self = this;
  var taskInput = null;
  var display = null;
  var displayDefaultValue = "00:00:00";

  function create() {

    try {
      var app = createMainContainerUI();
      var appContainer = getAppContainer(containerId);

      appContainer.appendChild(app);

      console.info("Task Manager created!");
    } catch (error) {

      console.error(error);
    }

  }

  function destroy() {}

  function createTask(name) {
    var task = new Task(taskListUI, name);

    return task;
  }

  this.addTask = function(taskName) {
    var task = createTask(taskName);

    tasks.push(task);

    taskInput.value = "";
  }

  // this.removeTask = function() {}

  function errorMessageHTML(message) {
    var p = document.createElement("p");
    p.innerText = message || "Houve um erro!";

    return p;
  }

  function getAppContainer(containerId) {
    var id = containerId || null;
    var container = null;

    if (id) {
      container = document.getElementById(id);
    }

    if (container === null) {
      container = document.body;
    }

    return container;
  }

  function createMainContainerUI() {
    var mainContainer = createContainer(classes.taskManager);

    var title = createTitle(name);
    mainContainer.appendChild(title);

    var taskUI = createTaskUI();
    mainContainer.appendChild(taskUI);

    taskListUI =  createTaskListContainer();
    mainContainer.appendChild(taskListUI);

    var calcTotalUI = createCalcTotalUI();
    mainContainer.appendChild(calcTotalUI);

    return mainContainer;
  }

  function createTitle(title) {
    var h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode(title || ""));
    h1.setAttribute("class", classes.title);

    return h1;
  }

  function createContainer(className, id) {
    var container = document.createElement("div");

    if (className) {
      container.setAttribute("class", className);
    }

    if (id) {
      container.setAttribute("id", id);
    }

    return container;
  }

  function createTaskUI() {
    var container = createContainer(classes.addTaskContainer);

    var form = document.createElement("div");
    form.setAttribute("class", classes.form);

    taskInput = createTextInput(classes.taskInput, inputTaskPlaceHolder, true);

    form.appendChild(taskInput);

    var addTaskButton = createButton("Add Task", classes.addTaskButton, function () {
      _self.addTask(taskInput.value);
    });

    form.appendChild(addTaskButton);

    container.appendChild(form);

    return container;
  }

  function createCalcTotalUI() {
    var container = createContainer(classes.form);

    var title = createTitle("Total hours");
    container.appendChild(title);

    var form = document.createElement("div");
    form.setAttribute("class", classes.form);

    display = createTextInput(classes.displayTotal, inputTaskPlaceHolder, true);
    display.value = displayDefaultValue;

    container.appendChild(display);


    var calculateButton = createButton("Calculate", classes.addTaskButton, function () {
      calculateTotal();
    });

    form.appendChild(calculateButton);

    container.appendChild(form);

    return container;
  }

  function calculateTotal() {
    var totalTime = 0;

    var length = tasks.length;

    if (length < 1) {
      return;
    }

    for (var index = 0; index < length; index++) {
      var task = tasks[index];

      task.stop();
      totalTime += task.getTime();
    }

    display.value = new Task(document.createElement("div"), "time").calculateTime(totalTime);
  }

  function createTaskListContainer() {
    var listContainer = document.createElement("ul");
    listContainer.setAttribute("class", classes.taskListContainer);

    return listContainer;
  }

  function createButton(text, classes, onClick) {
    var button = document.createElement("button");
    button.innerText = text || "Click";

    if (classes) {
      button.setAttribute("class", classes);
    }

    if (typeof(onClick) == "function") {
      button.addEventListener("click", onClick);
    }

    return button;
  }

  function createTextInput(classes, placeholder, required) {
    var input = document.createElement("input");
    input.type = "text";

    if (classes) {
      input.setAttribute("class", classes);
    }

    if (placeholder) {
      input.setAttribute("placeholder", placeholder);
    }

    if (typeof(required) == "boolean") {
         input.setAttribute("required", required); 
    }

    return input;
  }

  create();

}
