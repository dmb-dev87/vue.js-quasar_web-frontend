import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', meta: {title: 'message.services'}, component: () => import('pages/Services/ServiceOne.vue') },
      { path: '/services1', meta: {title: 'message.services'}, component: () => import('pages/Services/ServiceOne.vue') },
      { path: '/services2', meta: {title: 'message.services'}, component: () => import('pages/Services/ServiceTwo.vue') },
      { path: '/services3', meta: {title: 'message.services'}, component: () => import('pages/Services/ServiceThree.vue') },
      { path: '/services4', meta: {title: 'message.services'}, component: () => import('pages/Services/ServiceFour.vue') },
      { path: '/services5', meta: {title: 'message.services'}, component: () => import('pages/Services/ServiceFive.vue') },
      { path: '/services/:id', meta: {title: 'message.service_details', backable: true}, component: () => import('pages/Services/ServiceDetails.vue') },
      { path: '/seedraft/:id', meta: {title: 'message.drawn', backable: true}, component: () => import('pages/Services/SeeDraft.vue') },
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
