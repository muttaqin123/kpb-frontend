export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/distri/saprotan',
    name: 'kelolaSaprotanDistri',
    component: () => import('pages/member/distri/KelolaSaprotan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/distri/puber/datakios',
    name: 'dataKiosPerDistri',
    component: () => import('pages/member/distri/DataKios.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/distri/puber/alokasikios',
    name: 'alokasiKiosByDistri',
    component: () => import('pages/member/distri/AlokasiKios.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/distri/puber/totalpenebusan',
    name: 'totalDataPenebusanDistri',
    component: () => import('pages/member/distri/TotalPenebusan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/distri/updateprofile',
    name: 'updateProfileDistri',
    component: () => import('pages/member/distri/Profile.vue')
  }
]
