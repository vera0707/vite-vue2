import Vue from 'vue';
import VueRouter from 'vue-router';

const BasicLayout = () => import('@/components/BasicLayout');
const NotFindPage = () => import('@/modules/404');

const mainRouter = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/modules/system/views/login/index.vue'),
    name: 'login',
    title: '登录',
    meta: { title: '登录', notRequireAuth: true }
  },
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页' },
    component: BasicLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '首页' },
        component: () => import('@/modules/system/views/home')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/modules/404'),
    title: '404',
    meta: { notRequireAuth: true, title: '404' }
  },
  {
    path: '*',
    component: NotFindPage,
    meta: { notRequireAuth: true }
  }
];

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [...mainRouter]
});
router.beforeEach((to, from, next) => {
  next();
});

export default router;
