import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Register from '../views/Register.vue'
import Account from '../views/Account.vue'
import Profile from '../views/Profile.vue'
import ProfileEdit from '../views/ProfileEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/login/:status',
    name: 'Time to Login',
    component: Login
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: ForgotPassword
  },
  {
    path: '/reset-password/:token',
    name: 'Reset Password',
    component: ResetPassword
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/account/:tab',
    name: 'Account Details',
    component: Account
  },
  {
    alias: '/account',
    path: '/account/account',
    component: Account
  },
  {
    path: '/profile/:id',
    name: 'Profile Redirect',
    component: Profile
  },
  {
    path: '/profile/:id/edit',
    name: 'Profile Edit',
    component: ProfileEdit
  },
  {
    path: '/profile/:id/:slug',
    name: 'Profile',
    component: Profile
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const authRequired = to.path.search('account') !== -1
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router
