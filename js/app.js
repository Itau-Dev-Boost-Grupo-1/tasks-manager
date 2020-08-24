var addTask = document.getElementById('list-main')
var clock = document.getElementById('clock')

function Chronometer(){
    this.miliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
}

Chronometer.prototype.clockify = function() {
    let self = this
    self.seconds ++
    let minutes = Math.floor( self.minutes / 60)
    let seconds = self.seconds - self.minutes * 60;
    let hours = 0
    if(seconds > 59){
      self.seconds = 0
      self.minutes ++
    }
    
    clock.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    // if(seconds < 10) {
    //     appendseconds.textContent = '0' + seconds
    // }else if(seconds > 10 && seconds < 59){
    //     appendseconds.textContent = seconds
    // }else if(seconds > 59 ){
    //    self.minutes ++
    //     appendseconds.textContent = '00'
    //     appendminutes.textContent =  '0' + minutes
    // }
    // if (minutes < 10) {minutes = `0` + minutes
    //     }
}

Chronometer.prototype.startTimer = function()  {
    let self = this
    let clocktimer = setInterval(() => this.clockify(), 1000);
}

Chronometer.prototype.stopClick = function () {
  clearInterval(this.clocktimer);
};

Chronometer.prototype.setMinutes = function () {
  return Math.floor(this.currentTime / 60);
};

Chronometer.prototype.setSeconds = function () {
  return Math.floor(this.currentTime - this.setMinutes(this.currentTime) * 60);
};

Chronometer.prototype.twoDigitsNumber = function (number) {
  return (number.toString().length === 1) ? `0${number}` : number.toString();
};

Chronometer.prototype.setTime = function () {
  this.minutes = this.twoDigitsNumber(this.setMinutes());
  this.seconds = this.twoDigitsNumber(this.setSeconds());
};

Chronometer.prototype.setMilliseconds = function () {
  return this.milliCurrentTime.toString().slice(-2);
};


Chronometer.prototype.resetClick = function () {
  this.currentTime = 0;
  printTime('00', '00');
  printMilliseconds('00');
};

