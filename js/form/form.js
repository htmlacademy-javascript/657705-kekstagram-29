import { openModal } from '../modal-utils.js';
import { initialValidate } from './inputs-validate.js';
import { initialScalePhoto } from './photo-scale.js';

const initialForm = () => {

  const uploadForm = document.querySelector('.img-upload__form');
  const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
  const uploadInput = uploadForm.querySelector('.img-upload__input');

  const form = initialValidate(uploadForm);
  initialScalePhoto(uploadForm);

  uploadInput.addEventListener('change', () => {
    openModal(uploadOverlay, '.img-upload__cancel', true);
  });

  uploadForm.addEventListener('submit', (evt) => {
    if (!form.validate()) {
      evt.preventDefault();
    }
  });
};

export { initialForm };
