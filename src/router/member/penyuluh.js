export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/penyuluh/kur/pengajuan',
    name: 'verifikasiKURPenyuluh',
    component: () => import('pages/member/kur/penyuluh/Index.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/penyuluh/kur/pengajuan/detail/:id',
    name: 'detailKURPenyuluh',
    component: () => import('pages/sharedpages/kur/Detail.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/penyuluh/asuransi/bpjs',
    name: 'verifikasiBPJSPenyuluh',
    component: () => import('pages/member/asuransi/bpjs/Penyuluh.vue')
  }
]
