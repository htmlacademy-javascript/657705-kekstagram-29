const checkStringLength = (str, maxLength) => str.length <= maxLength;

checkStringLength('проверяемая строка', 20); // true - ok
// console.log(checkStringLength('проверяемая строка', 18)); // true - ok
// console.log(checkStringLength('проверяемая строка', 10)); // false - ok

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

isPalindrome('топот'); // true - ok
// console.log(isPalindrome('ДовОд')); // true - ok
// console.log(isPalindrome('Кекс')); // false - ok
// console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true - ok

const getNumberFromString = (str) => {
  let number = '';

  [...String(str).replaceAll(' ', '')].forEach((el) => {
    if (!Number.isNaN(Number(el))) {
      number += el;
    }
  });

  return number !== '' ? parseInt(number, 10) : NaN;
};

getNumberFromString('2023 год');
// console.log(getNumberFromString('ECMAScript 2022'));
// console.log(getNumberFromString('1 кефир, 0.5 батона'));
// console.log(getNumberFromString('агент 007'));
// console.log(getNumberFromString('а я томат'));
// console.log(getNumberFromString(2023));
// console.log(getNumberFromString(-1));
// console.log(getNumberFromString(1.5));
// all ok
