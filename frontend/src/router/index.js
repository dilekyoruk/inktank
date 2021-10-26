import Vue from 'vue';
import VueRouter from 'vue-router';
import Profile from '../views/profile.vue';
import TattooArtistList from '../views/tattoo-artist-list.vue';
import Login from '../views/login.vue';
import Register from '../views/register.vue';

Vue.use(VueRouter);

export default function init(store) {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'Profile',
        component: Profile,
      },
      {
        path: '/users/:id',
        name: 'UserDetail',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/user-detail.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter(to, from, next) {
          if (store.state.user) return next('/profile');
          return next();
        },
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter(to, from, next) {
          if (store.state.user) return next('/profile');
          return next();
        },
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
        beforeEnter(to, from, next) {
          if (!store.state.user) return next('/login');
          return next();
        },
      },
      {
        path: '/tattoo-artists',
        name: 'TattooArtistList',
        component: TattooArtistList,
      },
      {
        path: '/tattoo-artists/:id',
        name: 'TattooArtistDetail',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/tattoo-artist-detail.vue'),
      },
    ],
  });
}
