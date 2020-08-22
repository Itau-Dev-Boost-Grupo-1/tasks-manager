var addTask = document.getElementById('list-main')
var addBtn = document.getElementById('btn-add')
var startBtn = document.getElementById('btn-start')
var hours = document.getElementById('hours')
var minutes = document.getElementById('minutes')
var appendseconds = document.getElementById('seconds')
var appendminutes= document.getElementById('minutes')
var chronometer = new Chronometer()

function Chronometer(){
    this.miliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
}

Chronometer.prototype.addTask = function(text) {
    try {
        console.log("Inside add task", text)
      let addedTask = document.getElementById('list-main');
      let newLi = document.createElement('li');
      let timeText = document.createTextNode(text);
    
      newLi.appendChild(timeText);
    
      addedTask.appendChild(newLi);
    } catch (error) {
      console.log(error);
    }
  
}

// let hours = `00`,
// minutes = `00`,
// seconds = `00`,
// chronometerDisplay = document.querySelector(`[data-chronometer]`),
// chronometerCall

// function chronometer() {

// seconds ++

// if (seconds < 10) seconds = `0` + seconds

// if (seconds > 59) {
// seconds = `00`
// minutes ++

// if (minutes < 10) minutes = `0` + minutes
// }

// if (minutes > 59) {
// minutes = `00`
// hours ++

// if (hours < 10) hours = `0` + hours
// }

// chronometerDisplay.textContent = `${hours}:${minutes}:${seconds}`

// }

// play.onclick = (event) => {
// chronometerCall = setInterval(chronometer, 1000)
// event.target.setAttribute(`disabled`,``)
// }



Chronometer.prototype.clockify = function() {
    let self = this
    self.seconds ++
    console.log(self, "Clockify")
    let minutes = Math.floor( self.minutes / 60)
    let seconds = self.seconds - minutes * 60;
    console.log('seconds', seconds , 'minutes', minutes)
    if(seconds < 10) {
        appendseconds.textContent = '0' + seconds
    }else if(seconds > 10 && seconds < 59){
        appendseconds.textContent = seconds
    }else if(seconds > 59 ){
       self.minutes ++
        appendseconds.textContent = '00'
        appendminutes.textContent =  '0' + minutes
    }
    if (minutes < 10) {minutes = `0` + minutes
        }

        if (minutes > 59) {
        minutes = `00`
        hours ++

        if (hours < 10) hours = `0` + hours
        }

    //appendseconds.textContent = seconds
    //seconds = seconds < 10 ? '0'+ seconds : seconds;
    //minutes = minutes < 10 ? '0' + minutes : minutes;
     // return minutes + ':' + seconds
}

// Chronometer.prototype.startTimer = function()  {
//     let self = this
//     console.log(self, "Inside start")

//     let clocktimer = setInterval(chronometer.clockify, 1000);
// }

Chronometer.prototype.startTimer = function()  {
    let self = this
    console.log(self, "Inside start")

    let clocktimer = setInterval(() => {
        if(self.seconds > 0){
            console.log('before clockify',self.seconds)
            chronometer.clockify();
            self.seconds + 1;
            console.log(self.seconds)
        } else if ('after clockify', self.seconds === 0){
            chronometer.clockify();
            self.seconds + 1;
        } 
    }, 200);
}

addBtn.addEventListener('click', function () {
    var taskName = document.getElementById('task-name').value
    chronometer.addTask(taskName)
});

startBtn.addEventListener('click', function(){
    chronometer.startTimer()
})


