import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchComments } from '../actions';
import Comment from './Comment';

const propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchComments: PropTypes.func.isRequired,
  postID: PropTypes.string.isRequired,
};

class CommentList extends Component {
  componentWillMount() {
    this.props.fetchComments(this.props.postID);
  }

  render() {
    return (
      <div className="comment-list">
        {this.props.comments.map(comment => (
          <Comment
            key={comment.id}
            id={comment.id}
            body={comment.body}
            author={comment.author}
            postID={this.props.postID}
            voteScore={comment.voteScore}
          />
        ))}
      </div>
    );
  }
}

CommentList.propTypes = propTypes;

function mapStateToProps({ commentReducer }) {
  return {
    ...commentReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: postID => dispatch(fetchComments(postID)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentList);
