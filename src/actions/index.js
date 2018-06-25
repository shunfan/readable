import * as APIUtil from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SORT_POSTS = 'SORT_POSTS';
export const ADD_POST = 'ADD_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POST = 'REMOVE_POST';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

const upVote = 'upVote';
const downVote = 'downVote';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  ...categories,
});

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const sortPosts = sortBy => ({
  type: SORT_POSTS,
  sortBy,
});

export const addPost = post => ({
  type: ADD_POST,
  post,
});

export const receivePost = post => ({
  type: RECEIVE_POST,
  post,
});

export const removePost = id => ({
  type: REMOVE_POST,
  id,
});

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments,
});

export const addComment = comment => ({
  type: ADD_COMMENT,
  comment,
});

export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment,
});

export const removeComment = id => ({
  type: REMOVE_COMMENT,
  id,
});

export const fetchCategories = () => dispatch => (
  APIUtil
    .fetchCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);

export const fetchPosts = category => (dispatch) => {
  if (category) {
    APIUtil
      .fetchPostsByCategory(category)
      .then(posts => dispatch(receivePosts(posts)));
  } else {
    APIUtil
      .fetchAllPosts()
      .then(posts => dispatch(receivePosts(posts)));
  }
};

export const createPost = (id, timestamp, title, body, author, category) => dispatch => (
  APIUtil
    .createPost(id, timestamp, title, body, author, category)
    .then(post => dispatch(addPost(post)))
);

export const fetchPost = id => dispatch => (
  APIUtil
    .fetchPost(id)
    .then(post => dispatch(receivePost(post)))
);

export const upVotePost = id => dispatch => (
  APIUtil
    .votePost(id, upVote)
    .then(post => dispatch(receivePost(post)))
);

export const downVotePost = id => dispatch => (
  APIUtil
    .votePost(id, downVote)
    .then(post => dispatch(receivePost(post)))
);

export const updatePost = (id, title, body) => dispatch => (
  APIUtil
    .updatePost(id, title, body)
    .then(post => dispatch(receivePost(post)))
);

export const deletePost = id => dispatch => (
  APIUtil
    .deletePost(id)
    .then(() => dispatch(removePost(id)))
);

export const fetchComments = id => dispatch => (
  APIUtil
    .fetchComments(id)
    .then(comments => dispatch(receiveComments(comments)))
);

export const createComment = (id, timestamp, body, author, parentId) => dispatch => (
  APIUtil
    .createComment(id, timestamp, body, author, parentId)
    .then(comment => dispatch(addComment(comment)))
);

export const fetchComment = id => dispatch => (
  APIUtil
    .fetchComment(id)
    .then(comment => dispatch(receiveComment(comment)))
);

export const upVoteComment = id => dispatch => (
  APIUtil
    .voteComment(id, upVote)
    .then(comment => dispatch(receiveComment(comment)))
);

export const downVoteComment = id => dispatch => (
  APIUtil
    .voteComment(id, downVote)
    .then(comment => dispatch(receiveComment(comment)))
);

export const updateComment = (id, timestamp, body) => dispatch => (
  APIUtil
    .updateComment(id, timestamp, body)
    .then(comment => dispatch(receiveComment(comment)))
);

export const deleteComment = id => dispatch => (
  APIUtil
    .deleteComment(id)
    .then(() => dispatch(removeComment(id)))
);
