const state = {
    loggedInUser: {

    },
    isLoggedIn: false,
    refreshToken : '',
    accessToken : '',
    userId : '',
}
const getters =  {
    getloggedInUser : function(state) {
        return state.loggedInUser
    },
    getisLoggedIn : function(state){
        return state.isLoggedIn
    },
    getRefreshToken : function(state){
        return state.refreshToken
    },
    getAccessToken : function(state){
        return state.accessToken
    },
    getuserId : function(state){
        return state.userId
    }
}

const mutations = {
    setLoggedInUser: (state, data) => {
        console.log('In set logged ' , data)
        state.loggedInUser = data.user;
        state.isLoggedIn = true;
        state.refreshToken = data.tokens.refresh;
        state.accessToken = data.tokens.access;
        state.userId = data.user.id
        localStorage.setItem('auth_data', JSON.stringify(state));
    },
    syncAuthLocalStorage(state) {
        const authData = JSON.parse(localStorage.getItem('auth_data'))
        state.loggedInUser = authData.loggedInUser;
        state.isLoggedIn = authData.isLoggedIn;
        state.refreshToken = authData.refreshToken;
        state.accessToken = authData.accessToken
        state.userId = authData.userId
    },
    clearAuthState: state => {
        state.loggedInUser = {};
        state.isLoggedIn = false;
        state.refreshToken = '';
        state.accessToken = '';
        state.userId = '';
    },
    setAccessToken : (state , token)=>{
        state.accessToken = token
    },
    setSignupUser : (state , userId)=>{
        state.userId = userId
    }
}
const actions =  {
    setLoggedInUser: ({ commit }, user) => {
        commit("setLoggedInUser", user);
    },
    syncAuthLocalStorage({ commit }) {

        const authData = JSON.parse(localStorage.getItem('auth_data'));

        if (authData) {

            commit("syncAuthLocalStorage", authData);
        }
    },
    clearAuthState: ({ commit }) => {
        localStorage.removeItem("auth_data");
        commit("clearAuthState")
    },
    setAccessToken : ({commit} , token)=>{
        const data = JSON.parse(localStorage.getItem('auth_data'));
        data.accessToken = token
        localStorage.setItem('auth_data' , JSON.stringify(data))
        commit('setAccessToken' , token)
    },
    setSignupUser : ({commit} , data)=>{ //data contains only userId
        localStorage.setItem('auth_data', JSON.stringify(data));
        commit("setSignupUser" , data.userId)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}