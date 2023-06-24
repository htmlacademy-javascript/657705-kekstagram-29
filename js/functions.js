const checkStringLength = (str, maxLength) => str.length <= maxLength;

const isPalindrome = (str) => {
  str = str.replaceAll(' ', '').toLowerCase();
  let left = 0;
  let right = str.length - 1;

  while (left <= right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
};

const getNumberFromString = (str) => {
  let number = '';

  [...String(str).replaceAll(' ', '')].forEach((el) => {
    if (!Number.isNaN(Number(el))) {
      number += el;
    }
  });

  return parseInt(number, 10);
};

const getMinutesFromTime = (time) => {
  const [hour, minute] = time.split(':').map((el) => parseInt(el, 10));
  const minutes = hour * 60 + minute;

  return minutes;
};

const isMeetingAvailable = (startTime, endTime, time, duration) => {
  const startWork = getMinutesFromTime(startTime);
  const endWork = getMinutesFromTime(endTime);

  const startMeeting = getMinutesFromTime(time);
  const endMeeting = startMeeting + duration;

  if (startMeeting >= startWork && endMeeting <= endWork) {
    return true;
  }

  return false;
};

isMeetingAvailable('08:00', '17:30', '14:00', 90); // true
console.log('isMeetingAvailable(\'08:00\', \'17:30\', \'14:00\', 90) :', isMeetingAvailable('08:00', '17:30', '14:00', 90));
isMeetingAvailable('8:0', '10:0', '8:0', 120); // true
console.log('isMeetingAvailable(\'8:0\', \'10:0\', \'8:0\', 120) :', isMeetingAvailable('8:0', '10:0', '8:0', 120));
isMeetingAvailable('08:00', '14:30', '14:00', 90); // false
console.log('isMeetingAvailable(\'08:00\', \'14:30\', \'14:00\', 90) :', isMeetingAvailable('08:00', '14:30', '14:00', 90));
isMeetingAvailable('14:00', '17:30', '08:0', 90); // false
console.log('isMeetingAvailable(\'14:00\', \'17:30\', \'08:0\', 90) :', isMeetingAvailable('14:00', '17:30', '08:0', 90));
isMeetingAvailable('8:00', '17:30', '08:00', 900); // false
console.log('isMeetingAvailable(\'8:00\', \'17:30\', \'08:00\', 900) :', isMeetingAvailable('8:00', '17:30', '08:00', 900));
