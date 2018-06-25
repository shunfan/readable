import { combineReducers } from 'redux';

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  SORT_POSTS,
  RECEIVE_POST,
  REMOVE_POST,
  RECEIVE_COMMENTS,
  ADD_POST,
  ADD_COMMENT,
  RECEIVE_COMMENT,
  REMOVE_COMMENT,
} from '../actions';

const initialCategories = {
  categories: [],
};

const initialPosts = {
  post: {},
  posts: [], // only include undeleted posts
  sortBy: '',
};

const initialComments = {
  comments: [],
};

function categoryReducer(state = initialCategories, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES: {
      const { categories } = action;
      return Object.assign({}, state, { categories });
    }
    default:
      return state;
  }
}

function postReducer(state = initialPosts, action) {
  switch (action.type) {
    case RECEIVE_POSTS: {
      const { posts } = action;
      return Object.assign({}, state, { posts });
    }
    case SORT_POSTS: {
      const { sortBy } = action;
      return Object.assign({}, state, { sortBy });
    }
    case ADD_POST: {
      const postAdded = action.post;
      return Object.assign({}, state, {
        post: postAdded,
        posts: [...state.posts, postAdded],
      });
    }
    case RECEIVE_POST: {
      const postReceived = action.post;
      return Object.assign({}, state, {
        post: postReceived,
        posts: state.posts.map((post) => {
          if (post.id === postReceived.id) {
            return postReceived;
          }
          return post;
        }),
      });
    }
    case REMOVE_POST: {
      const postIDRemoved = action.id;
      return Object.assign({}, state, {
        post: {},
        posts: state.posts.filter(post => post.id !== postIDRemoved),
      });
    }
    default:
      return state;
  }
}

function commentReducer(state = initialComments, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS: {
      const { comments } = action;
      return Object.assign({}, state, { comments });
    }
    case ADD_COMMENT: {
      const commentAdded = action.comment;
      return Object.assign({}, state, {
        comments: [...state.comments, commentAdded],
      });
    }
    case RECEIVE_COMMENT: {
      const commentReceived = action.comment;
      return Object.assign({}, state, {
        comments: state.comments.map((comment) => {
          if (comment.id === commentReceived.id) {
            return commentReceived;
          }
          return comment;
        }),
      });
    }
    case REMOVE_COMMENT: {
      const commentIDRemoved = action.id;
      return Object.assign({}, state, {
        comments: state.comments.filter(comment => comment.id !== commentIDRemoved),
      });
    }
    default:
      return state;
  }
}

export default combineReducers({
  categoryReducer,
  postReducer,
  commentReducer,
});
