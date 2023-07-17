const PhotoScale = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const scaleWrapperNode = document.querySelector('.img-upload__scale');
const scaleInputNode = document.querySelector('.scale__control--value');
const imagePreviewNode = document.querySelector('.img-upload__preview img');

const onScaleWrapperClick = (evt) => {

  let value = parseInt(scaleInputNode.value, 10);

  if (evt.target.closest('.scale__control--bigger')) {
    value += PhotoScale.STEP;
  }

  if (evt.target.closest('.scale__control--smaller')) {
    value -= PhotoScale.STEP;
  }

  if (value <= PhotoScale.MAX && value >= PhotoScale.MIN) {
    scaleInputNode.value = `${value}%`;
    imagePreviewNode.style.transform = value === 100 ? 'scale(1)' : `scale(0.${value})`;
  }

};

const initialPhotoScale = () => {
  scaleWrapperNode.addEventListener('click', onScaleWrapperClick);
};

const removePhotoScale = () => {
  imagePreviewNode.style.transform = '';
  scaleWrapperNode.removeEventListener('click', onScaleWrapperClick);
};

export { initialPhotoScale, removePhotoScale };
