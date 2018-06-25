import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/PostEditor.css';
import { createPost, fetchCategories, updatePost } from '../actions';
import { fetchPost } from '../utils/api';
import makeID from '../utils/helper';

const propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  createPost: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  postID: PropTypes.string,
  updatePost: PropTypes.func.isRequired,
};

const defaultProps = {
  postID: null,
};

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: makeID(),
      timestamp: Date.now(),
      title: '',
      body: '',
      author: '',
      category: 'react', // hard coded for simplicity
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
    const { postID } = this.props;
    if (postID) {
      /**
       * I didn't use Redux action here because calling the API directly is much easier to
       * populate the form state.
       */
      fetchPost(postID).then((post) => {
        this.setState(post);
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
      id, timestamp, title, body, author, category,
    } = this.state;
    const { postID } = this.props;
    if (postID) {
      this.props.updatePost(postID, title, body);
    } else {
      this.props.createPost(id, timestamp, title, body, author, category);
      this.setState({
        id: makeID(),
        timestamp: Date.now(),
        title: '',
        body: '',
        author: '',
        category: 'react',
      });
    }
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={this.state.title} onChange={this.handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input type="text" className="form-control" id="author" name="author" value={this.state.author} onChange={this.handleInputChange} disabled={this.props.postID} />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea className="form-control" id="body" name="body" rows="5" value={this.state.body} onChange={this.handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select className="form-control" id="category" name="category" value={this.state.category} onChange={this.handleInputChange} disabled={this.props.postID}>
            {this.props.categories.map(category => (
              <option key={category.path} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>{this.props.postID ? 'Update' : 'Create'}</button>
      </form>
    );
  }
}

PostEditor.propTypes = propTypes;
PostEditor.defaultProps = defaultProps;

function mapStateToProps({ categoryReducer }) {
  return {
    ...categoryReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: (id, timestamp, title, body, author, category) =>
      dispatch(createPost(id, timestamp, title, body, author, category)),
    fetchCategories: () => dispatch(fetchCategories()),
    updatePost: (postID, title, body) => dispatch(updatePost(postID, title, body)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostEditor);
