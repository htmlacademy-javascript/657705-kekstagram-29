import { hasDuplicates } from '../util.js';

const ErrorMessage = {
  MAX_HASHTAGS: 'Хэш-тегов не может быть больше пяти',
  HAS_DUPLICATE: 'Хэш-теги не могут повторяться',
  INVALID: 'Введён невалидный хэш-тег',
  MAX_LENGTH: 'Длина комментария не может составлять больше 140 символов'
};

const formNode = document.querySelector('.img-upload__form');

const invalidText = {
  hashtags: [],
  description: []
};

let pristine;

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
    invalidText.hashtags.push(ErrorMessage.MAX_HASHTAGS);
  }

  if (hasDuplicates(hashtags)) {
    invalidText.hashtags.push(ErrorMessage.HAS_DUPLICATE);
  }

  if (invalidHashtags) {
    invalidText.hashtags.push(ErrorMessage.INVALID);
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
    invalidText.description.push(ErrorMessage.MAX_LENGTH);
  }

  return invalidText.description.length === 0;
};

const initValidate = () => {
  const inputHashtags = formNode.querySelector('.text__hashtags');
  const inputDesc = formNode.querySelector('.text__description');

  const pristineConfig = {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'invalid-input',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'invalid-text'
  };

  pristine = new Pristine(formNode, pristineConfig, false);

  pristine.addValidator(inputHashtags, validateHashtags, getErrorText('hashtags'));
  pristine.addValidator(inputDesc, validateDescription, getErrorText('description'));

};

const resetValidate = () => pristine.destroy();

const isValidForm = () => pristine.validate();

export { initValidate, resetValidate, isValidForm };
