import { createStore } from 'vuex'
import auth from './modules/auth'
import courseDetails from './modules/courseDetails'
import general from './modules/general'

export default createStore({
  modules: {
    auth,
    general,
    courseDetails
  }
})