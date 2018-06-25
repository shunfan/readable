const serverURL = 'http://localhost:3001';
const defaultHeaders = { Authorization: 'whatever-you-want', 'content-type': 'application/json' };

export const fetchCategories = () => (
  fetch(`${serverURL}/categories`, { headers: defaultHeaders })
    .then(res => res.json())
);

export const fetchPostsByCategory = category => (
  fetch(`${serverURL}/${category}/posts`, { headers: defaultHeaders })
    .then(res => res.json())
);

export const fetchAllPosts = () => (
  fetch(`${serverURL}/posts`, { headers: defaultHeaders })
    .then(res => res.json())
);

export const createPost = (id, timestamp, title, body, author, category) => (
  fetch(`${serverURL}/posts`, {
    body: JSON.stringify({
      id, timestamp, title, body, author, category,
    }),
    headers: defaultHeaders,
    method: 'POST',
  })
    .then(res => res.json())
);

export const fetchPost = id => (
  fetch(`${serverURL}/posts/${id}`, { headers: defaultHeaders })
    .then(res => res.json())
);

export const votePost = (id, option) => (
  fetch(`${serverURL}/posts/${id}`, {
    body: JSON.stringify({ option }),
    headers: defaultHeaders,
    method: 'POST',
  })
    .then(res => res.json())
);

export const updatePost = (id, title, body) => (
  fetch(`${serverURL}/posts/${id}`, {
    body: JSON.stringify({ title, body }),
    headers: defaultHeaders,
    method: 'PUT',
  })
    .then(res => res.json())
);

export const deletePost = id => (
  fetch(`${serverURL}/posts/${id}`, {
    headers: defaultHeaders,
    method: 'DELETE',
  })
    .then(res => res.json())
);

export const fetchComments = id => (
  fetch(`${serverURL}/posts/${id}/comments`, { headers: defaultHeaders })
    .then(res => res.json())
);

export const createComment = (id, timestamp, body, author, parentId) => (
  fetch(`${serverURL}/comments`, {
    body: JSON.stringify({
      id, timestamp, body, author, parentId,
    }),
    headers: defaultHeaders,
    method: 'POST',
  })
    .then(res => res.json())
);

export const fetchComment = id => (
  fetch(`${serverURL}/comments/${id}`, { headers: defaultHeaders })
    .then(res => res.json())
);

export const voteComment = (id, option) => (
  fetch(`${serverURL}/comments/${id}`, {
    body: JSON.stringify({ option }),
    headers: defaultHeaders,
    method: 'POST',
  })
    .then(res => res.json())
);

export const updateComment = (id, timestamp, body) => (
  fetch(`${serverURL}/comments/${id}`, {
    body: JSON.stringify({ timestamp, body }),
    headers: defaultHeaders,
    method: 'PUT',
  })
    .then(res => res.json())
);

export const deleteComment = id => (
  fetch(`${serverURL}/comments/${id}`, {
    headers: defaultHeaders,
    method: 'DELETE',
  })
    .then(res => res.json())
);
