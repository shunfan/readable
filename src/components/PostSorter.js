import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/PostSorter.css';
import { sortPosts } from '../actions';

const propTypes = {
  sortBy: PropTypes.string.isRequired,
  sortPosts: PropTypes.func.isRequired,
};

class PostSorter extends Component {
  constructor(props) {
    super(props);
    this.sortPosts = this.sortPosts.bind(this);
  }

  sortPosts(event) {
    this.props.sortPosts(event.target.value);
  }

  render() {
    return (
      <div className="post-sorter">
        <select className="custom-select" value={this.props.sortBy} onChange={this.sortPosts}>
          <option value="">Sort by ...</option>
          <option value="timestamp">Date</option>
          <option value="voteScore">Score</option>
        </select>
      </div>
    );
  }
}

PostSorter.propTypes = propTypes;

function mapStateToProps({ postReducer }) {
  return {
    ...postReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sortPosts: sortBy => dispatch(sortPosts(sortBy)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostSorter);
