const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const filterConfig = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: '',
    sliderOptions: {
      min: 0,
      max: 1,
      start: 1,
      step: 0.1
    },
  },

  [Effect.SEPIA]: {
    style: 'sepia',
    unit: '',
    sliderOptions: {
      min: 0,
      max: 1,
      start: 1,
      step: 0.1
    },
  },

  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%',
    sliderOptions: {
      min: 0,
      max: 100,
      start: 100,
      step: 1
    },
  },

  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
    sliderOptions: {
      min: 0,
      max: 3,
      start: 3,
      step: 0.1
    },
  },

  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
    sliderOptions: {
      min: 1,
      max: 3,
      start: 3,
      step: 0.1
    },
  },
};

const effectsListNode = document.querySelector('.effects__list');
const sliderWrapperNode = document.querySelector('.img-upload__effect-level');
const sliderNode = sliderWrapperNode.querySelector('.effect-level__slider');
const previewImageNode = document.querySelector('.img-upload__preview img');
const effectInputNode = document.querySelector('.effect-level__value');

const onFilterClick = (evt) => {
  if (evt.target.value === Effect.DEFAULT) {
    sliderWrapperNode.classList.add('hidden');
    previewImageNode.style.filter = '';
    effectInputNode.value = 0;
    return;
  }

  sliderWrapperNode.classList.remove('hidden');

  const { style, unit, sliderOptions } = filterConfig[evt.target.value];

  sliderNode.noUiSlider.updateOptions({
    range: {
      min: sliderOptions.min,
      max: sliderOptions.max,
    },
    start: sliderOptions.start,
    step: sliderOptions.step
  });

  sliderNode.noUiSlider.off();

  sliderNode.noUiSlider.on('update', () => {
    previewImageNode.style.filter = `${style}(${sliderNode.noUiSlider.get()}${unit})`;
    effectInputNode.value = sliderNode.noUiSlider.get();
  });

};

const initialFilter = () => {
  noUiSlider.create(sliderNode, {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower',
  });

  sliderWrapperNode.classList.add('hidden');

  effectsListNode.addEventListener('change', onFilterClick);
};

const removeFilter = () => {
  previewImageNode.style.filter = '';
  effectInputNode.value = 0;
  sliderNode.noUiSlider.destroy();
};

export { initialFilter, removeFilter };
