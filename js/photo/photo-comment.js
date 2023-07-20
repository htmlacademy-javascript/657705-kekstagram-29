// TODO: Не забыть переделать подгрузку комменитариев!

const COMMENTS_STEP_TO_RENDER = 5;

const commentsContainerNode = document.querySelector('.social__comments');
const commentsLoaderNode = document.querySelector('.comments-loader');

let startPositionToRender;
let commentsList;

const createCommentNode = () => {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');

  const p = document.createElement('p');
  p.classList.add('social__text');

  li.append(img, p);

  return ({ avatar, message, name }) => {
    const comment = li.cloneNode(true);

    const commentImg = comment.querySelector('.social__picture');
    commentImg.src = avatar;
    commentImg.alt = name;
    commentImg.width = 35;
    commentImg.height = 35;

    comment.querySelector('.social__text').textContent = message;

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
  const commentsForRendering = comments.slice(start, start + step);
  commentsContainerNode.append(createComments(commentsForRendering));

  const nodesCount = document.querySelector('.social__comments').children.length;
  document.querySelector('.social__comment-count').childNodes[0].textContent = `${nodesCount} из `;

  if (comments.length === nodesCount) {
    commentsLoaderNode.classList.add('hidden');
    commentsLoaderNode.removeEventListener('click', onCommentsLoaderClick);
  }
};

const renderComments = (comments) => {
  commentsList = [];
  startPositionToRender = 0;

  commentsList = [...comments];

  document.querySelector('.comments-count').textContent = commentsList.length;

  if (commentsList.length > COMMENTS_STEP_TO_RENDER) {
    commentsLoaderNode.classList.remove('hidden');
    commentsLoaderNode.addEventListener('click', onCommentsLoaderClick);
  }

  loadComments(commentsList, startPositionToRender, COMMENTS_STEP_TO_RENDER);
};

function onCommentsLoaderClick() {
  startPositionToRender += COMMENTS_STEP_TO_RENDER;
  loadComments(commentsList, startPositionToRender, COMMENTS_STEP_TO_RENDER);
}

export { renderComments };
