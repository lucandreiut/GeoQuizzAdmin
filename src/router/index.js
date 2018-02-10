import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signin from '@/components/Signin'
import Register from '@/components/Register'
import New from '@/components/New'
import store from '@/store'
import Series from '@/components/Series'
import Pictures from '@/components/Pictures'
Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/new',
      name: 'New',
      component: New
    },
    {
      path: '/series',
      name: 'Series',
      component: Series
    },
    {
      path: '/series/:idPicture',
      name: 'AddPicture',
      component: Pictures
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Signin' && to.name !== 'Register' && !store.getters['auth/isConnected']) {
    next({name: 'Signin', query: {redirect: to.fullPath}})
  } else if (to.name === 'Signin' && store.getters['auth/isConnected']) {
    next({name: 'Home'})
  } else {
    next()
  }
})
