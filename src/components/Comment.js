import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommentVoteButton from './CommentVoteButton';
import CommentEditor from './CommentEditor';
import { deleteComment } from '../actions';

const propTypes = {
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  postID: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
};

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit() {
    this.setState(state => ({
      editMode: !state.editMode,
    }));
  }

  handleDelete() {
    this.props.deleteComment(this.props.id);
  }

  render() {
    const {
      author, body, id, postID, voteScore,
    } = this.props;
    return (
      <div key={id} className="comment">
        <p>
          <CommentVoteButton commentID={id} />
          {voteScore}
          <CommentVoteButton commentID={id} isUpVote />
          {author}: {body}
          <button type="button" className="btn btn-primary" onClick={this.handleEdit}>Edit</button>
          <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
        </p>
        {this.state.editMode &&
          <div className="card">
            <div className="card-body"><CommentEditor postID={postID} commentID={id} />
            </div>
          </div>
        }
      </div>
    );
  }
}

Comment.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: commentID => dispatch(deleteComment(commentID)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Comment);
