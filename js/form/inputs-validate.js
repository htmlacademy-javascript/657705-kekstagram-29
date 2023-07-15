import { hasDuplicates } from '../util.js';

const invalidText = {
  hashtags: [],
  description: []
};

const getErrorText = (text) => () => invalidText[text].map((el) => `<span>${el}</span>`).join('');
const getValueWithTrimmedSpaces = (value) => value.replace(/\s+/g, ' ');

const validateHashtags = (value) => {
  const MAX_HASHTAGS = 5;

  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  const valueWithTrimmedSpaces = getValueWithTrimmedSpaces(value).toLowerCase();
  const hashtags = valueWithTrimmedSpaces.trim().split(' ');
  const invalidHashtags = hashtags.some((el) => !hashtagRegex.test(el));

  invalidText.hashtags = [];

  if (value.length === 0) {
    return true;
  }

  if (hashtags.length > MAX_HASHTAGS) {
    invalidText.hashtags.push('Хэш-тегов не может быть больше пяти');
  }

  if (hasDuplicates(hashtags)) {
    invalidText.hashtags.push('Хэш-теги не могут повторяться');
  }

  if (invalidHashtags) {
    invalidText.hashtags.push('Введён невалидный хэш-тег');
  }

  return invalidText.hashtags.length === 0;
};

const validateDescription = (value) => {
  const MAX_DESC_LENGTH = 140;

  const desc = getValueWithTrimmedSpaces(value).trim();

  invalidText.description = [];

  if (desc.length === 0) {
    return true;
  }

  if (desc.length > MAX_DESC_LENGTH) {
    invalidText.description.push('Длина комментария не может составлять больше 140 символов');
  }

  return invalidText.description.length === 0;
};

const initialValidate = (form) => {
  const inputHashtags = form.querySelector('.text__hashtags');
  const inputDesc = form.querySelector('.text__description');

  const pristineConfig = {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'invalid-input',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'invalid-text'
  };

  const pristine = new Pristine(form, pristineConfig, false);

  pristine.addValidator(inputHashtags, validateHashtags, getErrorText('hashtags'));
  pristine.addValidator(inputDesc, validateDescription, getErrorText('description'));

  return pristine;
};

export { initialValidate };
