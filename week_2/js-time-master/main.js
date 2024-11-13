const setAlarmButton = document.getElementById("set-alarm-button");
const clearAlarmButton = document.getElementById("clear-alarm-button");
const toggleButton = document.getElementById("toggle-button");

const alarmTimeInput = document.getElementById("alarm-time");

const alarmSound = document.getElementById("alarm-sound");
const timeDisplay = document.getElementById("time-display");

const currentTime = new Date();

// Object Oriented Clock
function Clock() {
  this.hours = currentTime.getHours();
  this.minutes = currentTime.getMinutes();
  this.seconds = currentTime.getSeconds();
  this.display12HourFormat = false;
  this.alarmTime = null;
  this.alarmSet = false;
  this.alarmSound = alarmSound;
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
  const amPm = this.hours >= 12 ? "PM" : "AM";

  return `${hours.toString().padStart(2, "0")}:${this.minutes
    .toString()
    .padStart(2, "0")} ${amPm}`;
};

// Display

Clock.prototype.updateClock = function () {
  timeDisplay.textContent = this.display12HourFormat
    ? this.get12HourTime()
    : this.getFormattedTime();
};

// Alarm methods
Clock.prototype.setAlarm = function (hours, minutes) {
  this.alarmTime = { hours, minutes };
  this.alarmSet = true;
  alert(`Your alarm is set to ${hours}:${minutes}`);
};

Clock.prototype.cancelAlarm = function () {
  this.alarmTime = null;
  this.alarmSet = false;
  this.stopAlarmSound();
  alert("Alarm cancelled");
};

Clock.prototype.stopAlarmSound = function () {
  this.alarmSound.pause();
  this.alarmSound.currentTime = 0;
};

// Alarm check
Clock.prototype.triggerAlarmSound = function () {
  if (this.alarmSet && this.alarmTime) {
    if (
      this.hours === this.alarmTime.hours &&
      this.minutes === this.alarmTime.minutes
    )
      this.alarmSound.play();
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
  this.display12HourFormat = !this.display12HourFormat;
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
    alert("Please enter a valid time.");
  }
});

clearAlarmButton.addEventListener("click", () => {
  clock.cancelAlarm();
});
