import React from "react";
import PropTypes from "prop-types";

const CourseFilter = ({handleSearch, onChange}) => {
  return (
      <form onSubmit={handleSearch} className="form-inline">
        <input
            name="searchString"
            onChange={onChange}
            className="form-control"
            placeholder="Filter by Course or Author"
        />
        &nbsp;
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
  )
};

CourseFilter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CourseFilter;
