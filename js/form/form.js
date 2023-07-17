import { openModal } from '../modal-utils.js';
import { initialValidate } from './inputs-validate.js';
import { initialFilters } from './photo-filter.js';
import { initialScalePhoto } from './photo-scale.js';

const uploadForm = document.querySelector('.img-upload__form');
let formValidator;

const initialForm = () => {

  const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
  const uploadInput = uploadForm.querySelector('.img-upload__input');

  formValidator = initialValidate(uploadForm);
  initialScalePhoto(uploadForm);
  initialFilters(uploadForm);

  uploadInput.addEventListener('change', () => {
    openModal(uploadOverlay, '.img-upload__cancel', true);
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
};

export { initialForm, resetForm };
