import React from "react";
import { NavLink } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Header = ({numberOfCourses}) => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>
        Courses
      </NavLink>
      {" | "}
      <NavLink to="/authors" activeStyle={activeStyle}>
        Authors
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
      <span style={{marginLeft: 10}} className="badge badge-primary">{numberOfCourses}</span>
    </nav>
  );
};

function mapStateToProps(state) {
  let courses = state.courses.length;
  const numberOfCourses =  courses > 0 ? `${courses} courses registered` : `${courses} course registered`;
  return {
    numberOfCourses
  };
}

Header.propTypes = {
  numberOfCourses: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(Header);
