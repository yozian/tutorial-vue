// Composables
import {
  createRouter,
  createWebHistory,
} from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
         children: [

         ]
      },
    ],
  },
  {
        path: '/todo',
        name: 'TodoLayout',
        component: () => import('@/layouts/main/MainLayout.vue'),
        children: [
          {
          path: '/todo',
          name: 'Todo',
          component: () => import(/* webpackChunkName: "home" */ '@/views/Todo.vue'),
        },
        {
          path: '/todo/:id',
          name: 'TodoEdit',
          component: () => import(/* webpackChunkName: "home" */ '@/views/TodoEdit.vue'),
          props:true
        },
        ]
      },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
