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
const submitBtnNode = uploadFormNode.querySelector('.img-upload__submit');

const initForm = () => {
  uploadInputNode.addEventListener('change', () => {

    const file = uploadInputNode.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const url = URL.createObjectURL(file);

      imagePreviewNode.src = url;
      effectPreviewImagesNode.forEach((el) => {
        el.style.backgroundImage = `url(${url})`;
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
      toggleSubmitBtn();
      sendData(new FormData(evt.target))
        .then(() => openSubmitedFormModal('success'))
        .catch(() => openSubmitedFormModal('error', true))
        .finally(toggleSubmitBtn);
    }
  });
};

const resetForm = () => {
  uploadFormNode.reset();
  resetValidate();
  resetPhotoScale();
  resetFilter();
};

function toggleSubmitBtn() {
  submitBtnNode.disabled = !submitBtnNode.disabled;
}

export { initForm, resetForm };
