const getRandomIntegerFromRange = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createUniqueRandomId = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomIntegerFromRange(min, max);

    if (previousValues.length >= (max - min + 1)) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomIntegerFromRange(min, max);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomIntegerFromRange(0, elements.length - 1)];

const getRandomArrayElements = (elements, quantity = 1) => {
  const array = [];
  for (let i = 0; i < quantity; i++) {
    array.push(elements[getRandomIntegerFromRange(0, elements.length - 1)]);
  }

  return array;
};

const subscribeToEvent = (target, eventName, handler) => {
  target.addEventListener(eventName, handler);
  return () => target.removeEventListener(eventName, handler);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomIntegerFromRange,
  createUniqueRandomId,
  getRandomArrayElement,
  getRandomArrayElements,
  subscribeToEvent,
  isEscapeKey
};
