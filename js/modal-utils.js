import { subscribeToEvent, isEscapeKey } from './util.js';

let unsubscribeToClickEvent;
let unsubscribeToKeydownEvent;

function openModal(el, closeBtnClass, isForm = false) {
  el.classList.remove('hidden');
  document.body.classList.add('modal-open');

  unsubscribeToKeydownEvent = subscribeToEvent(document, 'keydown', onDocumentKeydown(el, isForm));
  unsubscribeToClickEvent = subscribeToEvent(el.querySelector(closeBtnClass), 'click', onCloseBtnClick(el, isForm));
}

function closeModal(el, isForm) {
  el.classList.add('hidden');
  document.body.classList.remove('modal-open');

  unsubscribeToKeydownEvent();
  unsubscribeToClickEvent();

  if (isForm) {
    const form = el.parentNode;

    form.querySelector('.img-upload__input').value = '';
  }
}

function onDocumentKeydown(el, isForm) {
  return (evt) => {
    if (isEscapeKey(evt)) {
      if (!evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
        closeModal(el, isForm);
      }
    }
  };
}

function onCloseBtnClick(el, isForm) {
  return () => closeModal(el, isForm);
}

export { openModal };
