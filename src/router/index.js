import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login';
import store from '../store'
import Dashboard from '../views/Dashboard';
Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.getters.isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
});

export default router
