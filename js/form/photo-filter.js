const slider = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const previewImage = document.querySelector('.img-upload__preview img');
const effectValue = document.querySelector('.effect-level__value');

const defaultFilterCfg = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',

  format: {
    to: function (value) {
      return value.toFixed(2);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
};

noUiSlider.create(sliderElement, defaultFilterCfg);

const filters = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

const updatePreviewStyle = (filterName) => {
  const filterSymbol = {
    grayscale: '',
    sepia: '',
    invert: '%',
    blur: 'px',
    brightness: ''
  };

  sliderElement.noUiSlider.on('update', () => {
    previewImage.style.filter = `${filterName}(${sliderElement.noUiSlider.get()}${filterSymbol[filterName]})`;
    effectValue.value = sliderElement.noUiSlider.get();
  });
};

const useNoneFilter = () => {
  slider.classList.add('hidden');
  previewImage.style.filter = '';
  effectValue.value = 0;
};

const useChromeFilter = () => {
  const filterName = 'grayscale';

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1
    },

    start: 1,
    step: 0.1
  });

  updatePreviewStyle(filterName);
};

const useSepiaFilter = () => {
  const filterName = 'sepia';

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1
    },

    start: 1,
    step: 0.1
  });

  updatePreviewStyle(filterName);
};

const useMarvinFilter = () => {
  const filterName = 'invert';

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100
    },

    start: 100,
    step: 1
  });

  updatePreviewStyle(filterName);
};

const usePhobosFilter = () => {
  const filterName = 'blur';

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3
    },

    start: 3,
    step: 0.1
  });

  updatePreviewStyle(filterName);
};

const useHeatFilter = () => {
  const filterName = 'brightness';

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3
    },

    start: 3,
    step: 0.1
  });

  updatePreviewStyle(filterName);
};

const filtersHandlers = {
  none: useNoneFilter,
  chrome: useChromeFilter,
  sepia: useSepiaFilter,
  marvin: useMarvinFilter,
  phobos: usePhobosFilter,
  heat: useHeatFilter
};

const onFilterClick = (evt) => {
  const [, filterName] = evt.target.id.split('-');

  if (filters.includes(filterName)) {

    if (filterName !== 'none') {
      slider.classList.remove('hidden');
    }

    filtersHandlers[filterName]();
  }
};

const initialFilters = (form) => {
  slider.classList.add('hidden');
  form.querySelector('.effects__list').addEventListener('click', onFilterClick);
};

export { initialFilters };
