import { sendData } from '../api.js';
import { openFormModal, openSubmitedFormModal } from './form-modal.js';
import { initValidate, resetValidate, isValidForm } from './form-inputs-validate.js';
import { initPhotoScale, resetPhotoScale } from './form-photo-scale.js';
import { initFilter, resetFilter } from './form-photo-filter.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFormNode = document.querySelector('.img-upload__form');
const uploadInputNode = uploadFormNode.querySelector('.img-upload__input');
const imagePreviewNode = document.querySelector('.img-upload__preview img');
const effectPreviewImagesNode = document.querySelectorAll('.effects__preview');

const initForm = () => {
  uploadInputNode.addEventListener('change', () => {

    const file = uploadInputNode.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      imagePreviewNode.src = URL.createObjectURL(file);
      effectPreviewImagesNode.forEach((el) => {
        el.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
      });
    }

    initValidate();
    initPhotoScale();
    initFilter();

    openFormModal();
  });

  uploadFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isValidForm()) {
      disableSubmitBtn();
      sendData(new FormData(evt.target))
        .then(() => openSubmitedFormModal('success'))
        .catch(() => openSubmitedFormModal('error', true))
        .finally(enableSubmitBtn);
    }
  });
};

const resetForm = () => {
  uploadFormNode.reset();
  resetValidate();
  resetPhotoScale();
  resetFilter();
};

function disableSubmitBtn() {
  uploadFormNode.querySelector('.img-upload__submit').disabled = true;
}

function enableSubmitBtn() {
  uploadFormNode.querySelector('.img-upload__submit').disabled = false;
}

export { initForm, resetForm };
