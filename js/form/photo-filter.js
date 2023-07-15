const initialFilters = (form) => {

  const sliderElement = form.querySelector('.effect-level__slider');

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower',
  });

};

export { initialFilters };
