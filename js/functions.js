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
  return hour * 60 + minute;

};

const isMeetingAvailable = (startTime, endTime, time, duration) => {
  const startWork = getMinutesFromTime(startTime);
  const endWork = getMinutesFromTime(endTime);

  const startMeeting = getMinutesFromTime(time);
  const endMeeting = startMeeting + duration;

  return startMeeting >= startWork && endMeeting <= endWork;

};
