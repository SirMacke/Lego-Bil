import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/';
import axios from "axios";
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes //routes: routes
})

router.beforeEach(async (to, from, next) => {
  let user = store.state.User.user;
  let isAuth = false;
  let isAdmin = false;
  let authCookie = document.cookie.replace('auth=', '');

  if (authCookie) {
    isAuth = true;
    let response;

    const params = new URLSearchParams();
    params.append('auth', authCookie);

    if (!user) {
      //check
      if (process.env.NODE_ENV == 'production') {
        response = await axios.get('/api/routes/user', { params: { auth: authCookie } });
      } else {
        response = await axios.get('http://localhost:5000/api/routes/user', { params: { auth: authCookie } });
      }
      user = await store.dispatch('User/setUser', response.data);
    }
  }
  user = store.state.User.user;
  
  if (user != null) {
    if (user.isAdmin) isAdmin = true;
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth && !isAuth) next({ name: 'Login' });
  else if (requiresAdmin && !isAdmin) next({ name: 'Login' });
  else next();
})

export default router