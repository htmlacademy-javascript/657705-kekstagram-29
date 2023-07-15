const changePhotoScale = (form) => {
  const MIN = 25;
  const MAX = 100;

  const scaleValue = form.querySelector('.scale__control--value');
  const imagePreview = form.querySelector('.img-upload__preview img');

  return (evt) => {
    let value = parseInt(scaleValue.value, 10);

    if (evt.target.closest('.scale__control--bigger')) {
      value += MIN;
    }

    if (evt.target.closest('.scale__control--smaller')) {
      value -= MIN;
    }

    if (value <= MAX && value >= MIN) {
      scaleValue.value = `${value}%`;
      imagePreview.style.transform = value === 100 ? 'scale(1)' : `scale(0.${value})`;
    }
  };
};

const initialScalePhoto = (form) => {
  const imageContainer = form.querySelector('.img-upload__scale');

  imageContainer.addEventListener('click', changePhotoScale(form));
};

export { initialScalePhoto };
