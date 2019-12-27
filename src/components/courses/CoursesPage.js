import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import CourseFilter from "./CourseFilter"

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
      searchString: ''
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }

  handleChange = e => {
    const { value } = e.target;
    this.setState({searchString: value})
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.actions.filterCourse(this.state.searchString);
  };

  handleDeleteCourse = async course => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <div className="row">
              <div className="col-sm-4">
                <button
                    style={{ marginBottom: 20 }}
                    className="btn btn-primary add-course"
                    onClick={() => this.setState({ redirectToAddCoursePage: true })}
                >
                  Add Course
                </button>
              </div>
              <div className="col-sm-5 offset-3">
                <CourseFilter onChange={this.handleChange} handleSearch={this.handleSearch} />
              </div>
            </div>
            {this.props.courses.length ?
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            /> : <h2>It is empty here</h2> }
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
      filterCourse: bindActionCreators(courseActions.filterCourse, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
