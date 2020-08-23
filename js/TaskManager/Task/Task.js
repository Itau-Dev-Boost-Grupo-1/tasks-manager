var Task = function (container, taskName) {
  var name = taskName || "Task";

  var display = null;
  var time = null;
  var mainContainer = null;

  var classes = {
    taskContainer: "tasks__list-item",
    taskTitle: "tasks__list-item-title",
    pauseButton: "add-task__form-button-pause",
    startButton: "add-task__form-button-start"
  }

  this.start = function() {}
  this.stop = function() {}

  this.getTimeString = function() {}
  this.getTime = function() {}

  this.destroy = function() {}

  function create() {
    mainContainer = getMainContainer(container);
    mainContainer.appendChild(createTaskUI());

    console.log("[Task create] ", mainContainer);
  }

  function getMainContainer(container) {

    if (!container) {
      container = document.body;
    }

    return container;
  }

  function createTaskContainer() {
    var li = document.createElement("li");
    li.setAttribute("class", classes.taskContainer);

    return li;
  }

  function createTaskUI() {
    var container = createTaskContainer();
    container.appendChild(createTitle(name));
    container.appendChild(taskControls());

    return container;
  }

  function createTitle(name) {
    var name = document.createElement('p');
    name.setAttribute("class", classes.taskTitle);

    return name;
  }

  function taskControls() {
    var controlsContainer = document.createElement("div");

    display = document.createElement("input");
    display.setAttribute("disable", true);

    controlsContainer.appendChild(display);

    var pauseButton = createButton("pause", classes.pauseButton, this.stop);
    controlsContainer.appendChild(pauseButton);

    var startButton = createButton("start", classes.startButton, this.start);
    controlsContainer.appendChild(pauseButton);

    return controlsContainer;
  }

  function createButton(text, classes, onClick) {
    var button = document.createElement("button");
    button.setAttribute("class", classes);
    button.addEventListener("click", onClick);

    return button;
  }

  create();

}
