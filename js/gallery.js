import { getPhotos } from './data.js';

const createGallery = () => {
  const PHOTOS_COUNT = 25;

  const photosContainer = document.querySelector('.pictures');
  const photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const photos = getPhotos(PHOTOS_COUNT);
  const photosListFragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
    const photo = photoTemplate.cloneNode(true);

    const img = photo.querySelector('.picture__img');
    img.src = url;
    img.alt = description;

    photo.querySelector('.picture__likes').textContent = likes;
    photo.querySelector('.picture__comments').textContent = comments.length;

    photosListFragment.appendChild(photo);
  });

  photosContainer.appendChild(photosListFragment);
};

export { createGallery };
