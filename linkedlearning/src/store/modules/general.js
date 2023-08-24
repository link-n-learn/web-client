const state = {
    error: '',
    msg: '',
}

const getters = {
    getError: function(state) {
      return state.error
    },
    getMsg: function(state) {
      return state.msg
    },
  }

const mutations =  {
    setError : (state, error) => state.error = error,
    setMsg : (state, msg) => state.msg = msg,
    setMsgandError : (state) => {
      console.log('clear message and error in mutations')
      state.error = '',
      state.msg = ''
    }
  }
const actions = {
    setError : function(context, error){
      console.log(error)
      
      context.commit('setError', error)
    },
    setMsg : function(context, msg){
      console.log('In set msg')
      context.commit('setMsg', msg)
    },
    setMsgandError : function(context){
      console.log('Clear message and error in action.')
      context.commit('setMsgandError')
    }
  }
export default {
    state,
    getters,
    actions,
    mutations
}