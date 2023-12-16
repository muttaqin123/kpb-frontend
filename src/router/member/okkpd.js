export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/okkpd/form-permohonan/form',
    name: 'memberPengajuanOkkpd',
    component: () => import('pages/member/okkpd/Pengajuan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/okkpd/form-permohonan',
    name: 'dataPengajuanOkkpd',
    component: () => import('pages/member/okkpd/Index.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/okkpd/permohonan/detail/:id',
    name: 'detailPermohonanOkkpd',
    component: () => import('pages/sharedpages/okkpd/detailPermohonan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/okkpd/pengujianlab/:idDetail/:id',
    name: 'pengajuanSCHC',
    component: () => import('pages/sharedpages/okkpd/pengajuanSCHC.vue')
  },
  // {
  //   path: 'dataPengujianLab/:idDetail/:id',
  //   name: 'pengajuanSCHCOkkpd',
  //   component: () => import('pages/sharedpages/okkpd/pengajuanSCHC.vue')
  // },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/okkpd/ratingkepuasan/:idDetail/:id',
    name: 'ratingKepuasan',
    component: () => import('pages/sharedpages/okkpd/ratingKepuasan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/okkpd/editpengajuanSCHC/:idDetail/:id',
    name: 'editpengajuanSCHC',
    component: () => import('pages/sharedpages/okkpd/editpengajuanSCHC.vue')
  }
]
