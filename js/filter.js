import { getRandomIntegerFromRange } from './util.js';
import { renderThumbnails } from './photo/photo-thumbnail.js';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterData = {
  [Filter.DEFAULT]: getDefaultData,
  [Filter.RANDOM]: getRandomData,
  [Filter.DISCUSSED]: getSortedDataByComments
};

const imageFilterForm = document.querySelector('.img-filters__form');

function getDefaultData(data) {
  return data;
}

function getRandomData(data) {
  const NUMBER_OF_PHOTOS = 10;

  const randomData = [];
  const currentData = data.slice();

  for (let i = 0; i < NUMBER_OF_PHOTOS; i++) {
    const startIndex = getRandomIntegerFromRange(0, currentData.length - 1);
    randomData.push(currentData.splice(startIndex, 1)[0]);
  }

  return randomData;
}

function getSortedDataByComments(data) {
  return data.slice().sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);
}

const setFilterClick = (cb) => {
  imageFilterForm.addEventListener('click', (evt) => {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');

    cb(evt.target);
  });
};

const rerenderThumbnails = (data, target) => {
  document.querySelectorAll('.picture').forEach((el) => el.remove());

  const filteredData = filterData[target.id].call(null, data);
  renderThumbnails(filteredData);
};

export { setFilterClick, rerenderThumbnails };
