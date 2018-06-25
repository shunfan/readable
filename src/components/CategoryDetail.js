import PropTypes from 'prop-types';
import React from 'react';

import '../styles/CategoryDetail.css';
import PostCreateButton from './PostCreateButton';
import PostList from './PostList';
import PostSorter from './PostSorter';

const propTypes = {
  category: PropTypes.string,
};

const defaultProps = {
  category: null,
};

function CategoryDetail({ category }) {
  return (
    <div className="category-detail">
      <div className="category-header">
        <PostCreateButton />
        <div className="float-right"><PostSorter /></div>
      </div>
      <PostList category={category} />
    </div>
  );
}

CategoryDetail.propTypes = propTypes;
CategoryDetail.defaultProps = defaultProps;

export default CategoryDetail;
