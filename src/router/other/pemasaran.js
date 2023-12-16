export default {
  path: '/pemasaran/',
  component: () => import('src/layouts/PemasaranLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: 'dashboardPemasaran',
      component: () => import('pages/others/pemasaran/Index.vue')
    },
    {
      path: 'katalog/:id/:search',
      name: 'katalogPemasaran',
      component: () => import('pages/others/pemasaran/Katalog.vue')
    },
    {
      path: 'detail/:id',
      name: 'detailPemasaran',
      component: () => import('pages/others/pemasaran/Detail.vue')
    },
    {
      path: 'toko/:idToko',
      name: 'toko',
      component: () => import('pages/others/pemasaran/Toko.vue')
    }
  ]
}
