import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PostEditor from './PostEditor';

const propTypes = {
  postID: PropTypes.string.isRequired,
};

class PostEditButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    this.setState(state => ({
      editMode: !state.editMode,
    }));
  }

  render() {
    return (
      <React.Fragment>
        <button type="button" className="btn btn-primary" onClick={this.handleEdit}>Edit</button>
        {this.state.editMode &&
          <div className="card">
            <div className="card-body"><PostEditor postID={this.props.postID} />
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}

PostEditButton.propTypes = propTypes;

export default PostEditButton;
