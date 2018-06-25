import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import '../styles/VoteButton.css';
import { downVotePost, upVotePost } from '../actions';

const propTypes = {
  downVote: PropTypes.func.isRequired,
  isUpVote: PropTypes.bool,
  postID: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
};

const defaultProps = {
  isUpVote: false,
};

function PostVoteButton({
  downVote,
  isUpVote,
  postID,
  upVote,
}) {
  function handleDownVote() {
    downVote(postID);
  }

  function handleUpVote() {
    upVote(postID);
  }

  return isUpVote ?
    <button type="button" className="btn btn-primary up-vote" onClick={handleUpVote}>+</button>
    : <button type="button" className="btn btn-primary down-vote" onClick={handleDownVote}>-</button>;
}

PostVoteButton.propTypes = propTypes;
PostVoteButton.defaultProps = defaultProps;

function mapDispatchToProps(dispatch) {
  return {
    downVote: postID => dispatch(downVotePost(postID)),
    upVote: postID => dispatch(upVotePost(postID)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(PostVoteButton);
