import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import '../styles/VoteButton.css';
import { downVoteComment, upVoteComment } from '../actions';

const propTypes = {
  downVote: PropTypes.func.isRequired,
  isUpVote: PropTypes.bool,
  commentID: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
};

const defaultProps = {
  isUpVote: false,
};

function CommentVoteButton({
  downVote,
  isUpVote,
  commentID,
  upVote,
}) {
  function handleDownVote() {
    downVote(commentID);
  }

  function handleUpVote() {
    upVote(commentID);
  }

  return isUpVote ?
    <button type="button" className="btn btn-primary up-vote" onClick={handleUpVote}>+</button>
    : <button type="button" className="btn btn-primary down-vote" onClick={handleDownVote}>-</button>;
}

CommentVoteButton.propTypes = propTypes;
CommentVoteButton.defaultProps = defaultProps;

function mapDispatchToProps(dispatch) {
  return {
    downVote: commentID => dispatch(downVoteComment(commentID)),
    upVote: commentID => dispatch(upVoteComment(commentID)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(CommentVoteButton);
