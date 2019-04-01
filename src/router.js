import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Signup from './views/Signup'
import Signin from './views/Signin'
import MailVerify from './views/MailVerify'
import firebase from 'firebase/app'

Vue.use(Router)

let router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: 'signin'
    },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { isPublic: true }
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      meta: { isPublic: true }
    },
    {
      path: '/mailverify',
      name: 'mailverify',
      component: MailVerify,
      meta: { isPublic: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.isPublic)
  if (!isPublic) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const authUser = firebase.auth().currentUser
        if (authUser.emailVerified) {
          next()
        } else {
          next({
            path: '/signin',
            query: { redirect: to.fullPath }
          })
        }
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next()
  }
})

export default router
