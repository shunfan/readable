import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/PostEditor.css';
import { createComment, updateComment } from '../actions';
import { fetchComment } from '../utils/api';
import makeID from '../utils/helper';

const propTypes = {
  commentID: PropTypes.string,
  createComment: PropTypes.func.isRequired,
  postID: PropTypes.string.isRequired,
  updateComment: PropTypes.func.isRequired,
};

const defaultProps = {
  commentID: null,
};

class CommentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: makeID(),
      timestamp: Date.now(),
      body: '',
      author: '',
      parentId: this.props.postID,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { commentID } = this.props;
    if (commentID) {
      /**
       * I didn't use Redux action here because calling the API directly is much easier to
       * populate the form state.
       */
      fetchComment(commentID).then((comment) => {
        this.setState(comment);
      });
    }
  }

  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const {
      id, timestamp, body, author, parentId,
    } = this.state;
    const { commentID } = this.props;
    if (commentID) {
      this.props.updateComment(id, timestamp, body);
    } else {
      this.props.createComment(id, timestamp, body, author, parentId);
      this.setState({
        id: makeID(),
        timestamp: Date.now(),
        body: '',
        author: '',
        parentId: this.props.postID,
      });
    }
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input type="text" className="form-control" id="author" name="author" value={this.state.author} onChange={this.handleInputChange} disabled={this.props.commentID} />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <input type="text" className="form-control" id="body" name="body" value={this.state.body} onChange={this.handleInputChange} />
        </div>
        {this.props.commentID &&
          <div className="form-group">
            <label htmlFor="timestamp">Timestamp</label>
            <input type="number" className="form-control" id="timestamp" name="timestamp" value={this.state.timestamp} onChange={this.handleInputChange} />
          </div>
        }
        <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>{this.props.commentID ? 'Update' : 'Create'}</button>
      </form>
    );
  }
}

CommentEditor.propTypes = propTypes;
CommentEditor.defaultProps = defaultProps;

function mapDispatchToProps(dispatch) {
  return {
    createComment: (id, timestamp, body, author, parentId) =>
      dispatch(createComment(id, timestamp, body, author, parentId)),
    updateComment: (id, timestamp, body) => dispatch(updateComment(id, timestamp, body)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(CommentEditor);
