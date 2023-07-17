// TODO: Не забыть переделать подгрузку комменитариев!

import { subscribeToEvent } from './util.js';

const commentsContainer = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');

let unsubscribeToClick;

const createCommentNode = () => {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');

  const p = document.createElement('p');
  p.classList.add('social__text');

  li.append(img, p);

  return ({ id, avatar, message, name }) => {
    const comment = li.cloneNode(true);

    const commentImg = comment.querySelector('.social__picture');
    commentImg.src = avatar;
    commentImg.alt = name;
    commentImg.width = 35;
    commentImg.height = 35;

    comment.querySelector('.social__text').textContent = `${id} - ${message}`;

    return comment;
  };
};

const createComments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();
  const createComment = createCommentNode();
  comments.forEach((comment) => commentsListFragment.append(createComment(comment)));

  return commentsListFragment;
};

const loadComments = (comments, start, step) => {
  const commentsForRendering = comments.slice(start, step);
  commentsContainer.append(createComments(commentsForRendering));

  const nodesCount = document.querySelector('.social__comments').children.length;
  document.querySelector('.social__comment-count').childNodes[0].textContent = `${nodesCount} из `;

  if (comments.length === nodesCount) {
    commentsLoader.classList.add('hidden');
    unsubscribeToClick();
  }
};

const onCommentsLoaderClick = (comments, start, step) => {
  let currentPosition = start + step;
  let nextPosition = currentPosition + step;

  return () => {
    loadComments(comments, currentPosition, nextPosition);

    currentPosition += step;
    nextPosition += step;
  };
};

const renderComments = (comments, step) => {
  document.querySelector('.comments-count').textContent = comments.length;

  unsubscribeToClick = subscribeToEvent(commentsLoader, 'click', onCommentsLoaderClick(comments, 0, step));

  if (comments.length > step) {
    commentsLoader.classList.remove('hidden');
  }

  loadComments(comments, 0, step);
};

export { renderComments, unsubscribeToClick };
