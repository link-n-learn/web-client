const state = {
    courseId : "",
}
const getters = {
    getcourseId : function(state) {
        return state.courseId;
    }
}
const mutations = {
    setcourseId: (state, courseId) => {
        state.courseId = courseId;
        localStorage.setItem("courseId", JSON.stringify(state));
    },
    syncCourseIdLocalStorage(state) {
        const courseId = JSON.parse(localStorage.getItem("courseId"));
        state.courseId = courseId.courseId;
    },
    clearCourseIdState: state => {
        state.courseId = "";
    }
}
const actions = {
    syncCourseIdLocalStorage({ commit }) {

        const courseId = JSON.parse(localStorage.getItem('courseId'));

        if (courseId) {

            commit("syncCourseIdLocalStorage", courseId);
        }
    },
    clearCourseIdState: ({ commit }) => {
        localStorage.removeItem("courseId");
        commit("clearCourseIdState")
    },
    setcourseId : ({commit}, courseId) => {
        localStorage.setItem("setcourseId", JSON.stringify(courseId));
        commit("setcourseId", courseId);
    }
}
export default {
    state, 
    getters,
    mutations,
    actions
}