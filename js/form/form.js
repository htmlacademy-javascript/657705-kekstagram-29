import { openModal } from '../modal-utils.js';
import { initialValidate } from './inputs-validate.js';
import { initialFilter, removeFilter } from './photo-filter.js';
import { initialPhotoScale, removePhotoScale } from './photo-scale.js';

const uploadForm = document.querySelector('.img-upload__form');
let formValidator;

const initialForm = () => {

  const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
  const uploadInput = uploadForm.querySelector('.img-upload__input');

  uploadInput.addEventListener('change', () => {
    openModal(uploadOverlay, '.img-upload__cancel', true);

    formValidator = initialValidate(uploadForm);
    initialPhotoScale();
    initialFilter();
  });

  uploadForm.addEventListener('submit', (evt) => {
    if (!formValidator.validate()) {
      evt.preventDefault();
    }
  });
};

const resetForm = () => {
  uploadForm.reset();
  formValidator.reset();
  removeFilter();
  removePhotoScale();
};

export { initialForm, resetForm };
