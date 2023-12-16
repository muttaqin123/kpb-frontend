export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/pemasaran/kelolaBarang',
    name: 'kelolaBarang',
    component: () => import('pages/member/pemasaran/kelolaBarang.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/pemasaran/kelolaEtalase',
    name: 'kelolaEtalase',
    component: () => import('pages/member/pemasaran/kelolaEtalase.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/pemasaran/tambahProduk',
    name: 'tambahProduk',
    component: () => import('pages/member/pemasaran/tambahBarang.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/pemasaran/produk/:produk_id',
    name: 'detailProdukPemasaran',
    component: () => import('pages/member/pemasaran/detailBarang.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/dashboardPemasaran/profile',
    name: 'editProfile',
    component: () => import('pages/member/pemasaran/editProfile.vue')
  }
]
