import { getRandomArrayElement, getRandomArrayElements, getRandomIntegerFromRange, createUniqueRandomId } from './util.js';

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

const createPhoto = (id, urlId, comments) => ({
  id: id(),
  url: `photos/${urlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomIntegerFromRange(Like.MIN, Like.MAX),
  comments,
});

const createCommentForPhoto = (id) => ({
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

export { createPhotos };
