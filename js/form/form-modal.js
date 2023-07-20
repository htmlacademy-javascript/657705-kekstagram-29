import { isEscapeKey } from '../util.js';
import { resetForm } from './form.js';

const formModalNode = document.querySelector('.img-upload__overlay');
const closeBtnNode = formModalNode.querySelector('.img-upload__cancel');

let submitedContainer;

const addDocumentEscKeydown = () => document.addEventListener('keydown', onDocumentKeydown);
const removeDocumentEscKeydown = () => document.removeEventListener('keydown', onDocumentKeydown);

const openFormModal = () => {
  formModalNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  addDocumentEscKeydown();
  closeBtnNode.addEventListener('click', onCloseBtnClick);
};

const closeFormModal = () => {
  formModalNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  removeDocumentEscKeydown();
  closeBtnNode.removeEventListener('click', onCloseBtnClick);

  resetForm();
};

const openSubmitedFormModal = (status, error = false) => {
  submitedContainer = document.querySelector(`#${status}`)
    .content
    .querySelector(`.${status}`)
    .cloneNode(true);

  if (!error) {
    closeFormModal();
  } else {
    removeDocumentEscKeydown();
  }

  document.body.insertAdjacentElement('beforeend', submitedContainer);

  submitedContainer.addEventListener('click', onSubmitedContaierClick);
  document.addEventListener('keydown', onSubmitedDocumentKeydown);
};

const closeSubmitedFormModal = () => {
  submitedContainer.remove();
  submitedContainer.removeEventListener('click', onSubmitedContaierClick);
  document.removeEventListener('keydown', onSubmitedDocumentKeydown);

  if (submitedContainer.classList.contains('error')) {
    addDocumentEscKeydown();
  }
};

function onSubmitedDocumentKeydown() {
  closeSubmitedFormModal();
}

function onSubmitedContaierClick(evt) {
  const allowClasses = ['success__button', 'success', 'error__button', 'error'];
  const canClick = allowClasses.some((el) => evt.target.classList.contains(el));

  if (canClick) {
    closeSubmitedFormModal();
  }
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    closeFormModal();
  }
}

function onCloseBtnClick() {
  closeFormModal();
}

export { openFormModal, openSubmitedFormModal };
