const PHOTOS_COUNT = 25;

const Like = {
  MIN: 15,
  MAX: 200
};

const Comment = {
  MIN: 0,
  MAX: 30
};

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Первое описание',
  'Второе описание',
  'Третье описание',
  'Четвёртое описание',
  'Пятое описание',
];

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

const createPhoto = (id, urlId, comments) => ({

  /**
   * id - число от 1 до 25. Идентификаторы не должны повторяться
   * url - число в пути от 1 до 25. Адреса картинок не должны повторяться
   * description - рандомное описание из массива
   * likes - cлучайное число от 15 до 200.
   * comments - массив объектов (от 0 до 30)
   */

  id: id(),
  url: `photos/${urlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomIntegerFromRange(Like.MIN, Like.MAX),
  comments,
});


const createCommentForPhoto = (id) => ({

  /**
   * id - любое число. Идентификаторы не должны повторяться
   * avatar - число в пути от 1 до 6
   * message - рандомное сообщение из массива
   * name - рандомное имя из массива
   */

  id: id(),
  avatar: `img/avatar-${getRandomIntegerFromRange(1, 6)}.svg`,
  message: getRandomArrayElements(MESSAGES, getRandomIntegerFromRange(1, 2)).join(' '),
  name: getRandomArrayElement(NAMES),
});

const createPhotos = () => {

  const getUniquePhotoId = createUniqueRandomId(1, 25);
  const getUniquePhotoUrlId = createUniqueRandomId(1, 25);

  return () => Array.from({ length: PHOTOS_COUNT }, () => {
    const uniqueCommentId = createUniqueRandomId(1, 100);
    const comments = Array.from({ length: getRandomIntegerFromRange(Comment.MIN, Comment.MAX) }, () => createCommentForPhoto(uniqueCommentId));

    return createPhoto(getUniquePhotoId, getUniquePhotoUrlId, comments);
  });
};


const getGallery = createPhotos();
console.log(getGallery());
