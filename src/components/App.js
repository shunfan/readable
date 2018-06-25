import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import '../styles/App.css';
import CategoryDetail from './CategoryDetail';
import CategorySelector from './CategorySelector';
import PostDetail from './PostDetail';
import { fetchCategories } from '../actions';

const propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div className="app container">
        <h1>Readable</h1>
        <CategorySelector />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <CategoryDetail />
            )}
          />
          {this.props.categories.map(category => (
            <Route
              exact
              key={category.path}
              path={`/${category.path}`}
              render={() => (
                <CategoryDetail category={category.name} />
              )}
            />
          ))}
          <Route
            exact
            path="/:category/:postID"
            render={({ match }) => (
              <PostDetail postID={match.params.postID} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

App.propTypes = propTypes;

function mapStateToProps({ categoryReducer }) {
  return {
    ...categoryReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
