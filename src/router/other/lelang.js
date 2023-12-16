export default {
  path: '/lelang/',
  component: () => import('src/layouts/LelangLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: 'dashboardLelang',
      component: () => import('pages/others/lelang/Index.vue')
    }
  ]
}
