import { renderComments, unsubscribeToClick } from './comment.js';
import { isEscapeKey } from './util.js';

const COMMENTS_RENDER_STEP = 5;

const photo = document.querySelector('.big-picture');

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    closePhoto();
  }
}

function closePhoto() {
  photo.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  photo.querySelector('.big-picture__cancel').removeEventListener('click', closePhoto);

  unsubscribeToClick();
}

const createPhoto = ({ url, likes, comments, description }) => {
  photo.querySelector('.big-picture__img').children[0].src = url;
  photo.querySelector('.likes-count').textContent = likes;
  photo.querySelector('.social__caption').textContent = description;

  document.querySelector('.social__comments').innerHTML = '';
  renderComments(comments, COMMENTS_RENDER_STEP);
};

const renderPhoto = (photoData) => {
  photo.classList.remove('hidden');
  document.body.classList.add('modal-open');

  createPhoto(photoData);

  document.addEventListener('keydown', onDocumentKeydown);
  photo.querySelector('.big-picture__cancel').addEventListener('click', closePhoto);
};

export { renderPhoto };
