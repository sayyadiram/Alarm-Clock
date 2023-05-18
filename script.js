// Get the elements
const hourElement = document.getElementById('hour');
const minuteElement = document.getElementById('minute');
const secondElement = document.getElementById('second');
const amPmElement = document.getElementById('am-pm');
const setAlarmButton = document.getElementById('set-alarm-btn');
const alarmsList = document.getElementById('alarms-list');

// Update the clock display every second
setInterval(updateClock, 1000);

// Function to update the clock display
function updateClock() {
  const currentTime = new Date();
  let hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();
  const amPm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12; // Convert to 12-hour format

  hourElement.textContent = formatTimeValue(hour);
  minuteElement.textContent = formatTimeValue(minute);
  secondElement.textContent = formatTimeValue(second);
  amPmElement.textContent = amPm;
}

// Format time value to add leading zero if needed
function formatTimeValue(value) {
  return value < 10 ? '0' + value : value;
}



// Set the alarm
setAlarmButton.addEventListener('click', () => {
  const hourInput = document.getElementById('alarm-hour');
  const minuteInput = document.getElementById('alarm-minute');
  const secondInput = document.getElementById('alarm-second');
  const amPmInput = document.getElementById('alarm-am-pm');

  const hour = parseInt(hourInput.value);
  const minute = parseInt(minuteInput.value);
  const second = parseInt(secondInput.value);
  const amPm = amPmInput.value;

  if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
    alert('Please enter valid values for the alarm time.');
    return;
  }

  if (hour < 1 || hour > 12 || minute < 0 || minute > 59 || second < 0 || second > 59) {
    alert('Please enter valid values for the alarm time.');
    return;
  }

  const alarmTime = formatTime(hour, minute, second, amPm);
  const alarmItem = document.createElement('div');
  alarmItem.className = 'alert alert-info';
  alarmItem.textContent = alarmTime;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn btn-danger btn-sm ml-2';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    alarmItem.remove();
  });

  alarmItem.appendChild(deleteButton);
  alarmsList.appendChild(alarmItem);

  resetInputs(hourInput, minuteInput, secondInput);
});

// Reset the input fields
function resetInputs(...inputs) {
  inputs.forEach((input) => {
    input.value = '';
  });
}

// Format time in hh:mm:ss AM/PM format
function formatTime(hour, minute, second, amPm) {
  return `${formatTimeValue(hour)}:${formatTimeValue(minute)}:${formatTimeValue(second)} ${amPm}`;
}
