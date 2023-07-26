import { isEscapeKey } from '../util.js';

const photoModalNode = document.querySelector('.big-picture');
const closeBtnNode = photoModalNode.querySelector('.big-picture__cancel');

const openPhotoModal = () => {
  photoModalNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  closeBtnNode.addEventListener('click', onCloseBtnClick);
};

const closePhotoModal = () => {
  photoModalNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeBtnNode.removeEventListener('click', onCloseBtnClick);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    closePhotoModal();
  }
}

function onCloseBtnClick() {
  closePhotoModal();
}

export { openPhotoModal };
