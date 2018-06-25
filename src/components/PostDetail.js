import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/PostDetail.css';
import CommentSection from './CommentSection';
import PostEditButton from './PostEditButton';
import PostVoteButton from './PostVoteButton';
import { fetchPost } from '../actions';
import PostDeleteButton from './PostDeleteButton';

const propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    timestamp: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    voteScore: PropTypes.number,
    deleted: PropTypes.bool,
    commentCount: PropTypes.number,
    error: PropTypes.string,
  }).isRequired,
  postID: PropTypes.string.isRequired,
  receivePost: PropTypes.func.isRequired,
};

class PostDetail extends Component {
  componentWillMount() {
    this.props.receivePost(this.props.postID);
  }

  getPostDate() {
    const date = new Date(this.props.post.timestamp);
    return date.toLocaleDateString();
  }

  render() {
    const {
      id, title, body, author, category, voteScore, commentCount,
    } = this.props.post;
    return (
      <React.Fragment>
        {category && id &&
          <div className="post-detail">
            <div className="card">
              <div className="card-body">
                <h2>{title}</h2>
                <div>
                  <PostVoteButton postID={id} />
                  {voteScore}
                  <PostVoteButton postID={id} isUpVote />
                </div>
                <p>
                  Date: {this.getPostDate()},
                  Author: {author},
                  Number of comments: {commentCount}
                </p>
                <p>{body}</p>
                <PostEditButton category={category} postID={id} />
                <PostDeleteButton postID={id} atPostDetailComponent />
              </div>
            </div >
            <CommentSection postID={id} />
          </div>
        }
        <p>{this.props.post.error && '404'}</p>
      </React.Fragment>
    );
  }
}

PostDetail.propTypes = propTypes;

function mapStateToProps({ postReducer }) {
  return {
    ...postReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receivePost: postID => dispatch(fetchPost(postID)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);
