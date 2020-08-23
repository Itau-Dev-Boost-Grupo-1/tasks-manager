var TaskManager = function(title, containerId, taskPlaceholder) {
  var name = title || "Task Manager";

  var classes = {
    taskManager: "task-manager",
    form: "add-task__form",
    title: "app__title",
    taskInput: "add-task__form-input",
    addTaskContainer: "add-task",
    addTaskButton: "add-task__form-button",
    taskListContainer: "tasks__list"
  };

  var inputTaskPlaceHolder =  taskPlaceholder || "Create task manager app";
  var taskListUI = null;
  var tasks = [];

  var _self = this;

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
    console.log("[addTask] taskName: ", taskName);

    var task = createTask(taskName);

    tasks.push(task);
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

    return mainContainer;
  }

  function createTitle(title) {
    var h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode(title || ""));
    h1.setAttribute("class", classes.title);

    return h1;
  }

  function createContainer(className, id) {
    console.log("[createContainer] classsName: ", className + ", id: ", id);
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

    var taskInput = createTextInput(classes.taskInput, inputTaskPlaceHolder, true);

    form.appendChild(taskInput);

    var addTaskButton = createButton("Add Task", classes.addTaskButton, _self.addTask);

    form.appendChild(addTaskButton);

    container.appendChild(form);

    return container;
  }

  function createTaskListContainer() {
    var listContainer = document.createElement("li");
    listContainer.setAttribute("class", classes.taskListContainer);

    return listContainer;
  }

  function createButton(text, classes, onClick) {
    console.log("[createButton] text: ", text, ", classes: ", classes, ", onClick: ", typeof(onClick));

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
