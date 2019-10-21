import { RouteConfig } from 'vue-router';
import Users from 'components/Users/Users.vue';
import Locks from 'components/Locks/Locks.vue';
import Logs from 'components/Logs/Logs.vue';
import AccessControl from 'components/AccessControl/AccessControl.vue';

const pagesRoutes: Array<RouteConfig> = [
  {
    path: '/users',
    name: 'Пользователи',
    component: Users,
  },
  {
    path: '/logs',
    name: 'Журнал',
    component: Logs,
  },
  {
    path: '/access',
    name: 'Управление доступом',
    component: AccessControl,
  },
  {
    path: '/locks',
    name: 'Замки',
    component: Locks,
  },
];

export default pagesRoutes;
