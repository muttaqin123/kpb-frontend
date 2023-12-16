export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/duta/buatAktivitas',
    name: 'tambahAktivitas',
    component: () => import('src/pages/member/duta/buatAktivitas.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/duta/:id',
    name: 'detailAktivitas',
    component: () => import('src/pages/sharedpages/duta/DetailAktivitas.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/duta/editAktivitas/:id',
    name: 'editAktivitas',
    component: () => import('src/pages/member/duta/editAktivitas.vue')
  }
]
