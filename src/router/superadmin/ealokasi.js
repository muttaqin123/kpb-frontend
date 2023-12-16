export default [
  {
    path: '/ealokasi',
    name: 'penebusanPuberAdmin',
    component: () => import('pages/superadmin/ealokasi/Penebusan.vue')
  },
  {
    path: '/ealokasi/detail/:idTransaksi',
    name: 'detailPenebusanPuberAdmin',
    component: () => import('pages/sharedpages/ealokasi/Detail.vue')
  }
]
