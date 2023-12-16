export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/pekebun/sertifikasi-benih/form',
    name: 'memberPengajuanSertifikasiBenih',
    component: () => import('pages/member/sertifikasibenih/Pengajuan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/pekebun/sertifikasi-benih',
    name: 'dataPengajuanSertifikasiBenihMember',
    component: () => import('pages/member/sertifikasibenih/Index.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/pekebun/sertifikasi-benih/detail/:id',
    name: 'detailSertifikasi',
    component: () => import('pages/sharedpages/sertifikasibenih/detailBenih.vue')
  }
]
