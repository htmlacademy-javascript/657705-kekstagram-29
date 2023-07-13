import { renderComments } from './comment.js';
import { openModal } from './modal-utils.js';

const COMMENTS_RENDER_STEP = 5;

const photo = document.querySelector('.big-picture');

const createPhoto = ({ url, likes, comments, description }) => {
  photo.querySelector('.big-picture__img').children[0].src = url;
  photo.querySelector('.likes-count').textContent = likes;
  photo.querySelector('.social__caption').textContent = description;

  document.querySelector('.social__comments').innerHTML = '';
  renderComments(comments, COMMENTS_RENDER_STEP);
};

const renderPhoto = (photoData) => {
  createPhoto(photoData);
  openModal(photo, '.big-picture__cancel');
};

export { renderPhoto };
