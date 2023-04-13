import { createRouter, createWebHistory } from 'vue-router'
import signup from '../views/auth/signup.vue'
import login from '../views/auth/login.vue'
import store from '../store/mainIndex'
import verify from '../views/auth/verify.vue'
import dashboard from '../views/dashboard.vue'
import profileShow from '../views/profileShow.vue'
import viewallEnroll from '../views/viewallEnroll.vue'
import syllabus from '../views/courses/syllabus.vue';
import details from '../views/courses/details.vue';
import searchCourse from '../views/searchCourse.vue';
import content from '../views/courses/content.vue';
import coursesDetails from '../views/courses/coursesShow/coursesDetails.vue';
import lectureShow from '../views/courses/coursesShow/lectureShow.vue';
import discussionShow from '../views/courses/coursesShow/discussionShow.vue';
import newQuestion from '../views/courses/discussionCourse/newQuestion.vue';
import showQuestion from '../views/courses/discussionCourse/showQuestion.vue';
import videoLecture from '../views/courses/coursesShow/videoLecture.vue';
import landingPage from "../views/landingPage"
import TandC from "../views/TandC.vue"
import PrivacyPolicy from "../views/PrivacyPolicy"
import ContactUs from "../views/ContactUs"

const routes = [
  {
    path : "/terms-conditions",
    name : "TandC",
    component : TandC
  },
  {
    path : "/support",
    name : "support",
    component : ContactUs
  },
  {
    path : "/privacy-policy",
    name : "PP",
    component : PrivacyPolicy
  },
  {
    path : '/signup',
    name : 'signup',
    component : signup
  },
  {
    path : '/',
    name : "landing",
    component : landingPage
  },
  {
    path : '/login',
    name : 'login',
    component : login
  },
  {
    path: '/signup/verify',
    name : 'verify',
    component : verify
  },
  {
    path: '/user/',
    name : 'user',
    component : profileShow
  },
  {
    path : '/dashboard',
    name : 'dashboard',
    beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
      else next()
    },
    component : dashboard
  },
  {
    path : '/viewEnroll',
    name : 'viewEnroll',
    beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
      else next()
    },
    component : viewallEnroll
  },
  {
    path : '/syllabusPage',
    name : 'syllabus',
    beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
      else next()
    },
    component : syllabus
  },
  {
    path : '/details',
    name : 'details',
    beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
      else next()
    },
    component : details
  },
  {
    path : '/content',
    name : 'content',
    beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
      else next()
    },
    component : content
  },
  {
    path: '/course/:course_id/details',
    name: 'coursesDetailsShow',
    beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
      else next()
    },
    component:coursesDetails
  },
  
  {
    path: '/course/:course_id/lecture',
    name: 'lectureShow',
    beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
      else next()
    },
    component:lectureShow
  },
  {
    path: '/course/:course_id/discussion',
    name: 'discussionShow',
    beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
      else next()
    },
    component:discussionShow
  },
  {
    path: '/course/:course_id/question/new',
    name: 'newQuestion',
    beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
      else next()
    },
    component:newQuestion
  },
  {
    path: '/course/:course_id/question/:question_id',
    name: 'showQuestion',
    beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
      else next()
    },
    component:showQuestion
  },
  {
    path: '/course/:course_id/lecture/:lecture_id',
    name: 'videoLecture',
    beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && !store.state.auth.isLoggedIn) next({ name: 'login' })
      else next()
    },
    component:videoLecture
  },
  {
    path : '/searchCourse',
    name : 'searchCourse',
    component : searchCourse
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
