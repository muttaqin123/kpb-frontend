export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/alsintan/member/dashboard',
    name: 'dashboardMemberAlsintan',
    component: () => import('pages/member/alsintan/Dashboard.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/alsintan/member/listbarangalsintan',
    name: 'listBarangAlsintan',
    component: () => import('pages/member/alsintan/ListBarang.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/alsintan/member/detailbarangalsintan/:id/:idstok/:jml',
    name: 'detailBarangAlsintan',
    component: () => import('pages/member/alsintan/DetailBarang.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/alsintan/member/riwayatpeminjaman',
    name: 'riwayatPeminjaman',
    component: () => import('pages/member/alsintan/RiwayatPeminjaman.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/alsintan/member/riwayatpeminjaman/detail/:id',
    name: 'detailRiwayatPeminjaman',
    component: () => import('pages/member/alsintan/DetailPermohonan.vue')
  }
]
