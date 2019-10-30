const pagesRoutes: Array<Object> = [
  {
    path: '/users',
    name: 'Пользователи',
    component: 'Users',
  },
  {
    path: '/logs',
    name: 'Журнал',
    component: 'Logs',
  },
  {
    path: '/access',
    name: 'Управление доступом',
    component: 'AccessControl',
  },
  {
    path: '/locks',
    name: 'Замки',
    component: 'Locks',
  },
  {
    path: '/',
    name: 'Главная страница',
    component: 'Home',
  }
];

export default pagesRoutes;
