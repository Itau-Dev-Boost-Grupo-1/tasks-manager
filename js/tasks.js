var chronometer = new Chronometer()
var nodeList = document.getElementsByTagName("li");
var close = document.getElementsByClassName("close");
var startBtn = document.getElementsByClassName("start");


for (var i = 0; i < nodeList.length; i++) {
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  nodeList[i].appendChild(span);
}

// Click on a close button to hide the current list item
for (var i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

//Start chronometer
for (var i = 0; i < startBtn.length; i++) {
    startBtn[i].onclick = function(i) {
    chronometer.startTimer()
  }
}


// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("task__input").value;
  var t = document.createTextNode(inputValue);
  
  li.appendChild(t);
  if (inputValue === '') {
    alert("Deve inserir alguma tarefa");
  } else {
    document.getElementById("list-main").appendChild(li);
  }
  document.getElementById("task__input").value = "";
 
  li.innerHTML = `
        <li class="tasks__list-item">
            <p class="task__name">${inputValue}</p> 
            <span id="clock">00:00:00</span>
            <button id="btn-start" class="start">Start</button>
            <button id="btn-stop">Stop</button>
            <button id="btn-clear">Clear</button>
        </li>`
}

function totalCounter(){
  for(var i =0; i< nodeList.length ; i++){
    //console.log(nodeList[i].innerText)
  }
}
