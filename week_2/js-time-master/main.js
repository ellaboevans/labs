const setAlarmButton = document.getElementById("set-alarm-button");
const clearAlarmButton = document.getElementById("clear-alarm-button");
const toggleButton = document.getElementById("toggle-button");

const alarmTimeInput = document.getElementById("alarm-time");

const timeDisplay = document.getElementById("time-display");
const message = document.getElementById("message");

const audio = new Audio("./audio/alarm.mp3");

// Object Oriented Clock
function Clock() {
  const currentTime = new Date();

  this.hours = currentTime.getHours();
  this.minutes = currentTime.getMinutes();
  this.seconds = currentTime.getSeconds();
  this.displayFormat = false;
  this.alarmTime = null;
  this.alarmSet = false;
}

// Time Formatting
Clock.prototype.getFormattedTime = function () {
  const hours = String(this.hours).padStart(2, "0");
  const minutes = String(this.minutes).padStart(2, "0");
  const seconds = String(this.seconds).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

Clock.prototype.get12HourTime = function () {
  const hours = this.hours % 12;
  const timeSuffix = this.hours >= 12 ? "PM" : "AM";

  return `${hours.toString().padStart(2, "0")}:${this.minutes
    .toString()
    .padStart(2, "0")}:${this.seconds
    .toString()
    .padStart(2, "0")} ${timeSuffix}`;
};

// Updates the current time in the webpage
Clock.prototype.updateClock = function () {
  timeDisplay.textContent = this.displayFormat
    ? this.get12HourTime()
    : this.getFormattedTime();
};

// Sets alarm to user selected schedules
Clock.prototype.setAlarm = function (hours, minutes) {
  this.alarmTime = { hours, minutes };
  this.alarmSet = true;
  message.textContent = `Your alarm is set to play at ${hours}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

Clock.prototype.cancelAlarm = function () {
  this.alarmTime = null;
  this.alarmSet = false;
  alarmTimeInput.value = null;
  this.stopAlarmSound();
  message.textContent = "You have successfully cancelled you alarm.";
};

Clock.prototype.stopAlarmSound = function () {
  audio.pause();
  audio.currentTime = 0;
};

// Alarm check
Clock.prototype.triggerAlarmSound = function () {
  if (this.alarmSet && this.alarmTime) {
    if (
      this.hours === this.alarmTime.hours &&
      this.minutes === this.alarmTime.minutes
    )
      audio.play();
  }
};

// Clock instance
const clock = new Clock();
setInterval(() => {
  const now = new Date();

  clock.hours = now.getHours();
  clock.minutes = now.getMinutes();
  clock.seconds = now.getSeconds();

  clock.updateClock();
  clock.triggerAlarmSound();
}, 1000);

// Customization
Clock.prototype.toggleFormat = function () {
  this.displayFormat = !this.displayFormat;
  toggleButton.textContent = this.displayFormat ? "In 12 Hours" : "In 24 hours";
  this.updateClock();
};

// Add Event Listeners
toggleButton.addEventListener("click", () => {
  clock.toggleFormat();
});

setAlarmButton.addEventListener("click", () => {
  const alarmTime = alarmTimeInput.value.split(":");
  if (alarmTime.length === 2) {
    const hours = parseInt(alarmTime[0]);
    const minutes = parseInt(alarmTime[1]);
    clock.setAlarm(hours, minutes);
  } else {
    message.textContent = "Please enter a valid time.";
  }
});

clearAlarmButton.addEventListener("click", () => {
  clock.cancelAlarm();
});
