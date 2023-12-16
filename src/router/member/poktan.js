export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/poktan/ealokasi',
    name: 'dataEAlokasiPoktan',
    component: () => import('pages/member/poktan/EAlokasi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/poktan/puber/penebusan',
    name: 'dataPenebusanPoktan',
    component: () => import('pages/member/poktan/DataPenebusan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/poktan/puber/penebusan/detail/:idTransaksi',
    name: 'detailDataPenebusanPoktan',
    component: () => import('pages/sharedpages/ealokasi/Detail.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/poktan/puber/data-anggota',
    name: 'dataAnggotaPoktan',
    component: () => import('pages/member/poktan/DataAnggota.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/poktan/puber/data-anggota',
    name: 'profilePoktan',
    component: () => import('pages/member/poktan/Profile.vue')
  }
]
