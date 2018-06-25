import PropTypes from 'prop-types';
import React from 'react';

import '../styles/CommentSection.css';
import CommentList from './CommentList';
import CommentEditor from './CommentEditor';

const propTypes = {
  postID: PropTypes.string.isRequired,
};

function CommentSection({ postID }) {
  return (
    <div className="comment-section card">
      <div className="card-body">
        <CommentList postID={postID} />
        <h3>Leave a new comment</h3>
        <CommentEditor postID={postID} />
      </div>
    </div>
  );
}

CommentSection.propTypes = propTypes;

export default CommentSection;
