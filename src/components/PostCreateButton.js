import React, { Component } from 'react';

import PostEditor from './PostEditor';

class PostCreateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate() {
    this.setState(state => ({
      editMode: !state.editMode,
    }));
  }

  render() {
    return (
      <React.Fragment>
        <button type="button" className="btn btn-success" onClick={this.handleCreate}>New Post</button>
        {this.state.editMode &&
          <div className="card">
            <div className="card-body"><PostEditor />
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default PostCreateButton;
