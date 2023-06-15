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

const getRandomInteger = (range = {}) => {
  if (Object.keys(range).length !== 0) {
    return getRandomIntegerFromRange(range.min, range.max);
  }

  return Math.floor(Math.random() * 100) + 1; // Проблема #1
};


const createUniqueRandomId = (range = {}) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(range);

    if (Object.keys(range).length !== 0) {
      if (previousValues.length >= (range.max - range.min + 1)) {
        return null;
      }
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(range);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

const createComment = (id, url, message, name) => ({
  id,
  avatar: url,
  message,
  name,
});

const createComments = (min, max) => {
  const comments = [];

  const generateCommentId = createUniqueRandomId();

  const getAvatarUrl = () => `img/avatar-${getRandomInteger({min: 1, max: 6})}.svg`;
  const getMessage = () => MESSAGES[getRandomInteger({min: 0, max: MESSAGES.length - 1})];
  const getName = () => NAMES[getRandomInteger({min: 0, max: NAMES.length - 1})];

  for (let i = min; i < max; i++) {
    comments.push(createComment(generateCommentId(), getAvatarUrl(), getMessage(), getName()));
  }

  return comments;
};

const createPhoto = (id, url, description, likes, comments) => ({
  id,
  url,
  description,
  likes,
  comments,
});


const createPhotos = (min, max) => {
  const photos = [];

  const generatePhotoId = createUniqueRandomId({min, max});
  const generatePhotoUrlId = createUniqueRandomId({min, max});

  const getPhotoUrl = () => `photos/${generatePhotoUrlId()}.jpg`;
  const getDescription = () => DESCRIPTIONS[getRandomInteger({min: 0, max: DESCRIPTIONS.length - 1})];
  const getLikes = () => getRandomInteger({min: 15, max: 200});
  const getComments = () => {
    const generateCommentsLength = getRandomInteger({min: 0, max: 30});
    return generateCommentsLength !== 0 ? createComments(1, generateCommentsLength) : 'Комментариев нету';
  };

  for (let i = min; i <= max; i++) {
    photos.push(createPhoto(generatePhotoId(), getPhotoUrl(), getDescription(), getLikes(), getComments()));
  }

  return photos;
};

const gallery = createPhotos(1, 25);
console.log(gallery);
