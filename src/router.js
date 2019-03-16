import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Signup from './views/Signup'
import Signin from './views/Signin'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  mode: 'history',
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.isPublic)
  if (!isPublic) {
    // isPublic でないルートはログインされているかどうか認証が必要です。
    // もしログインされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router
