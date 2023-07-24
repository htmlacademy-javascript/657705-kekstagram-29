import { getData } from './api.js';
import { renderThumbnails } from './photo/photo-thumbnail.js';
import { initForm } from './form/form.js';
import { showAlert } from './util.js';

getData()
  .then((photosData) => {
    renderThumbnails(photosData);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

initForm();
