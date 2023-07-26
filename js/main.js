import { getData } from './api.js';
import { renderThumbnails } from './photo/photo-thumbnail.js';
import { rerenderThumbnails, setFilterClick } from './filter.js';
import { initForm } from './form/form.js';
import { showAlert } from './util.js';
import { debounce } from './util.js';

const imageFilterNode = document.querySelector('.img-filters');

initForm();

try {
  const data = await getData();
  imageFilterNode.classList.remove('img-filters--inactive');

  setFilterClick(debounce((target) => rerenderThumbnails(data, target)));
  renderThumbnails(data);

} catch (err) {
  showAlert(err.message);
}
