import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import '../styles/CategorySelector.css';

const propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function CategorySelector({ categories }) {
  return (
    <div className="category-selector">
      <ul className="nav nav-pills nav-justified">
        <li key="/" className="nav-item">
          <NavLink exact to="/" className="nav-link" activeClassName="active">All</NavLink>
        </li>
        {categories.map(category => (
          <li key={category.path} className="nav-item">
            <NavLink to={`/${category.path}`} className="nav-link" activeClassName="active">{category.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

CategorySelector.propTypes = propTypes;

function mapStateToProps({ categoryReducer }) {
  return {
    ...categoryReducer,
  };
}

export default withRouter(connect(
  mapStateToProps,
  null,
)(CategorySelector));
