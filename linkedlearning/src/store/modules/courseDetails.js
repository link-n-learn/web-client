const state = {
  courseId: "",
  foundCourse: "",
};
const getters = {
  getcourseId: function (state) {
    console.log("getter");
    return state.courseId;
  },
  getfoundCourse: function (state) {
    return state.foundCourse;
  },
};
const mutations = {
  setfoundCourse: (state, foundCourse) => {
    console.log("muta");
    state.foundCourse = foundCourse;
  },
  setcourseId: (state, courseId) => {
    state.courseId = courseId;
    localStorage.setItem("courseId", JSON.stringify(state));
  },
  syncCourseIdLocalStorage(state) {
    const courseId = JSON.parse(localStorage.getItem("courseId"));
    state.courseId = courseId.courseId;
  },
  clearCourseIdState: (state) => {
    state.courseId = "";
  },
};
const actions = {
  setfoundCourse: ({ commit }, foundCourse) => {
    localStorage.setItem("course_focus", JSON.stringify(foundCourse));
    commit("setfoundCourse", foundCourse);
  },
  syncfoundCourseLocalStorage: ({ commit }) => {
    const courseData = JSON.parse(localStorage.getItem("course_focus"));
    if (courseData) {
      commit("setfoundCourse", courseData);
    }
  },
  syncCourseIdLocalStorage({ commit }) {
    const courseId = JSON.parse(localStorage.getItem("courseId"));

    if (courseId) {
      commit("syncCourseIdLocalStorage", courseId);
    }
  },
  clearCourseIdState: ({ commit }) => {
    localStorage.removeItem("courseId");
    commit("clearCourseIdState");
  },
  setcourseId: ({ commit }, courseId) => {
    localStorage.setItem("setcourseId", JSON.stringify(courseId));
    commit("setcourseId", courseId);
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
