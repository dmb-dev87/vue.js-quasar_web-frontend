import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue')},
      { path: '/login', component: () => import('pages/Auth/Login.vue')},
      { path: '/services1', component: () => import('pages/Services/ServiceOne.vue')},
      { path: '/services2', component: () => import('pages/Services/ServiceTwo.vue')},
      { path: '/services3', component: () => import('pages/Services/ServiceThree.vue')},
      { path: '/services4', component: () => import('pages/Services/ServiceFour.vue')},
      { path: '/services5', component: () => import('pages/Services/ServiceFive.vue')},
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
