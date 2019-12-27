import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      );
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter(course => course.id !== action.course.id);
    case types.SEARCH_STRING:
      return state.filter(course => {
        const searchString = action.searchString.toLowerCase();
        const courseTitle = course.title.toLowerCase();
        const courseCategory = course.category.toLowerCase();
        return courseTitle.includes(searchString) || courseCategory.includes(searchString)
      });
    default:
      return state;
  }
}
