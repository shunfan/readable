import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../styles/PostList.css';
import PostEditButton from './PostEditButton';
import PostVoteButton from './PostVoteButton';
import { fetchPosts } from '../actions';
import PostDeleteButton from './PostDeleteButton';

const propTypes = {
  category: PropTypes.string,
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortBy: PropTypes.string.isRequired,
};

const defaultProps = {
  category: null,
};

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts(this.props.category);
  }

  render() {
    const { posts, sortBy } = this.props;
    return (
      <div className="post-list">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Number of comments</th>
              <th>Current score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.sort((a, b) => {
              if (sortBy === '') {
                return 0;
              }

              return b[sortBy] - a[sortBy];
            }).map(post => (
              <tr key={post.id}>
                <td>
                  <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                </td>
                <td>{post.author}</td>
                <td>{post.commentCount}</td>
                <td>
                  <PostVoteButton postID={post.id} />
                  {post.voteScore}
                  <PostVoteButton postID={post.id} isUpVote />
                </td>
                <td>
                  <PostEditButton category={post.category} postID={post.id} />
                  <PostDeleteButton postID={post.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

PostList.propTypes = propTypes;
PostList.defaultProps = defaultProps;

function mapStateToProps({ postReducer }) {
  return {
    ...postReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: category => dispatch(fetchPosts(category)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostList);
