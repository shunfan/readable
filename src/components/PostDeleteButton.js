import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { deletePost } from '../actions';

const propTypes = {
  atPostDetailComponent: PropTypes.bool,
  deletePost: PropTypes.func.isRequired,
  postID: PropTypes.string.isRequired,
};

const defaultProps = {
  atPostDetailComponent: false,
};

class PostDeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
    this.handleDeletion = this.handleDeletion.bind(this);
  }

  handleDeletion() {
    this.props.deletePost(this.props.postID);
    this.setState({ redirect: true });
  }

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-danger" onClick={this.handleDeletion}>Delete</button>
        {this.props.atPostDetailComponent && this.state.redirect && <Redirect to="/" />}
      </React.Fragment>
    );
  }
}

PostDeleteButton.propTypes = propTypes;
PostDeleteButton.defaultProps = defaultProps;

function mapDispatchToProps(dispatch) {
  return {
    deletePost: postID => dispatch(deletePost(postID)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(PostDeleteButton);
