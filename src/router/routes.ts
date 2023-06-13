import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Services/ServiceOne.vue') },
      { path: '/services1', component: () => import('pages/Services/ServiceOne.vue') },
      { path: '/services2', component: () => import('pages/Services/ServiceTwo.vue') },
      { path: '/services3', component: () => import('pages/Services/ServiceThree.vue') },
      { path: '/services4', component: () => import('pages/Services/ServiceFour.vue') },
      { path: '/services5', component: () => import('pages/Services/ServiceFive.vue') },
      { path: '/changelanguage', component: () => import('pages/Settings/ChangeLanguage.vue') },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/Auth/Login.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
