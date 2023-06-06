import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Auth/Login.vue')},
      { path: '/login', component: () => import('pages/Auth/Login.vue')},
      { path: '/services1', component: () => import('pages/IndexPage.vue')},
      { path: '/services2', component: () => import('pages/IndexPage.vue')},
      { path: '/services3', component: () => import('pages/IndexPage.vue')},
      { path: '/services4', component: () => import('pages/IndexPage.vue')},
      { path: '/services5', component: () => import('pages/IndexPage.vue')},
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
