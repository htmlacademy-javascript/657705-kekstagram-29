import { renderPhoto } from './full-photo.js';

const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = (photoData) => {
  const { url, description, likes, comments } = photoData;
  const thumbnail = thumbnailTemplate.cloneNode(true);

  const img = thumbnail.querySelector('.picture__img');
  img.src = url;
  img.alt = description;

  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderPhoto(photoData);
  });

  return thumbnail;
};

const renderThumbnails = (photosData) => {
  const thumbnailsListFragment = document.createDocumentFragment();
  const thumbnailsContainer = document.querySelector('.pictures');

  photosData.forEach((photoData) => {
    thumbnailsListFragment.append(createThumbnail(photoData));
  });

  thumbnailsContainer.append(thumbnailsListFragment);
};

export { renderThumbnails };
