import { renderComments } from './photo-comment.js';
import { openPhotoModal } from './photo-modal.js';

const photo = document.querySelector('.big-picture');

const createPhoto = ({ url, likes, comments, description }) => {
  photo.querySelector('.big-picture__img img').src = url;
  photo.querySelector('.likes-count').textContent = likes;
  photo.querySelector('.social__caption').textContent = description;

  document.querySelector('.social__comments').innerHTML = '';
  renderComments(comments);
};

const renderPhoto = (photoData) => {
  createPhoto(photoData);
  openPhotoModal();
};

export { renderPhoto };
