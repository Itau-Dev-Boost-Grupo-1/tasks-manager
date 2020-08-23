var Task = function (container, taskName) {
  var name = taskName || "Task";

  var display = null;
  var time = 15000;
  var timerId = null;
  var mainContainer = null;
  var displayDefaultValue = "00:00:00";

  var classes = {
    taskContainer: "tasks__list-item",
    taskInput: "add-task__form-input",
    taskTitle: "tasks__list-item-title",
    pauseButton: "add-task__form-button-pause",
    startButton: "add-task__form-button-start"
  }

  var _self = this;

  this.start = function() {
    timerId = setInterval(function (params) {
      var date = new Date();

      time++;
      display.value = timeToDisplay(transformSeconds(time));
    }, 1000);
  }

  this.stop = function() {
    clearInterval(timerId);
  }

  function transformSeconds(timeSeconds) {
    var result = { time: 0, timeLeft: 0 };

    result = getSeconds(timeSeconds);
    var seconds = result.time;

    result = getMinutes(result.timeLeft);
    var minutes = result.time;

    result = getHours(result.timeLeft);
    var hours = result.time;

    return { hours: hours, minutes: minutes, seconds: seconds };
  }

  function getSeconds(timeSeconds) {
    var seconds = 0;
    var timeLeft = 0;

    if (timeSeconds >= 60) {
      seconds = timeSeconds % 60;

      if (seconds == 0) {
        timeLeft = timeSeconds / 60;
      }

    }
    else {

      seconds = timeSeconds;
    }

    if (seconds > 0) {
        timeLeft = timeSeconds - seconds;
    }

    return { time: seconds, timeLeft: timeLeft };
  }

  function getMinutes(timeSeconds) {
    var minutes = 0;
    var hourMinutes = 0

    if (timeSeconds >= 60) {
      minutes = timeSeconds % 60;

      if (minutes == 0) {
        hourMinutes = timeSeconds / 60;
        minutes = hourMinutes % 60;
      } 
    }

    console.log("Minutos: ", minutes, "tt: ", timeSeconds);

    return { time: minutes, timeLeft: hourMinutes - minutes };
  }

  function getHours(timeSeconds) {
    var hours = 0;
    console.log("Hours: ", hours, "tt: ", timeSeconds);
    if (timeSeconds >= 60) {
      hours = timeSeconds % 60;

      if (hours == 0) {
        hours = timeSeconds / 60;
      }
      else {
        hours = 0;
      } 
    }

    return { time: hours, timeLeft: 0 };
  }

  function timeToDisplay(timeStruct) {
      var hours = correctTimeDigit(timeStruct.hours);
      var minutes = correctTimeDigit(timeStruct.minutes);
      var seconds = correctTimeDigit(timeStruct.seconds);

      return hours + ":" + minutes + ":" + seconds;
  }

  function getDisplayTime(date) {
    var displayTime = "00:00:00";

    if (date) {
      var hours = null, minutes = null, seconds = null;

      hours = correctTimeDigit(date.getHours());
      minutes = correctTimeDigit(date.getMinutes());
      seconds = correctTimeDigit(date.getSeconds());

      displayTime = hours + ":" + minutes + ":" + seconds;
    }

    return displayTime;
  }

  function correctTimeDigit(digit) {

    if (parseInt(digit) && digit < 9) {
      return "0" + digit; 
    }

    if (!parseInt(digit)) {
      return "00"; 
    }

    return digit;
  }

  this.getTimeString = function() {}
  this.getTime = function() {}

  this.destroy = function() {}

  function create() {
    mainContainer = getMainContainer(container);
    mainContainer.appendChild(createTaskUI());

    console.log("Task created!");
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
    var p = document.createElement("p");
    p.setAttribute("class", classes.taskTitle);
    p.innerText = name;

    return p;
  }

  function taskControls() {
    var controlsContainer = document.createElement("div");

    display = document.createElement("input");
    display.type = "text";
    display.value = displayDefaultValue;
    display.setAttribute("disable", true);
    display.setAttribute("class", classes.taskInput);

    controlsContainer.appendChild(display);

    var pauseButton = createButton("pause", classes.pauseButton, _self.stop);
    controlsContainer.appendChild(pauseButton);

    var startButton = createButton("start", classes.startButton, _self.start);
    controlsContainer.appendChild(startButton);

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
