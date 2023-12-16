export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/rekomendasi-pengedar',
    name: 'RekomendasiPengedarMember',
    component: () => import('pages/member/sertifikasibenihpertanian/RekomendasiPengedarMember.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/rekomendasi-pengedar/pengajuan-rekomendasi-pengedar',
    name: 'PengajuanPengedarPageMember',
    component: () => import('src/pages/member/sertifikasibenihpertanian/FormPengajuanPengedarMember.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/rekomendasi-pengedar/list-rekomendasi-pengedar',
    name: 'ListPengedarPageMember',
    component: () => import('pages/sharedpages/sertifikasibenihpertanian/RiwayatrekomendasiPageMember.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/sertifikasi-benih',
    name: 'SertifBenihPertanianMember',
    component: () => import('pages/member/sertifikasibenihpertanian/PengajuanSertifikasiBenihMember.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/sertifikasi-benih/pengajuan-sertifikasi-benih',
    name: 'PengajuanSertifBenihMember',
    component: () => import('pages/member/sertifikasibenihpertanian/FormPengajuanSertifikasiMember.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/sertifikasi-benih/list-sertifikasi-benih',
    name: 'ListSertifBenihMember',
    component: () => import('pages/sharedpages/sertifikasibenihpertanian/RiwayatSertifikasiBenih.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/sertifikasi-benih/sertifikasi-benih/:id',
    name: 'detailPengajuanSertifBenihMember',
    component: () => import('src/pages/sharedpages/sertifikasibenihpertanian/detailPageMember.vue')
  }

]
