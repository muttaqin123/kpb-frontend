// dataAlokasiPetani
export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/ealokasi',
    name: 'dataAlokasiPetani',
    component: () => import('pages/member/petani/alokasi/Index.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/opt',
    name: 'indexOPTPetani',
    component: () => import('pages/member/petani/opt/Index.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/opt/input',
    name: 'inputOPTPetani',
    component: () => import('pages/member/petani/opt/Input.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/dpi',
    name: 'pengaduanDPIPetani',
    component: () => import('src/pages/member/petani/opt/dpi/DPI.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/dpi/input',
    name: 'inputPengaduanDPIPetani',
    component: () => import('src/pages/member/petani/opt/dpi/Form.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/aph',
    name: 'permohonanAPHPetani',
    component: () => import('src/pages/member/petani/opt/aph/Index.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/aph/input',
    name: 'formPermohonanAPHPetani',
    component: () => import('src/pages/member/petani/opt/aph/Form.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/bimtek',
    name: 'permohonanBimtekPetani',
    component: () => import('src/pages/member/petani/opt/bimtek/Index.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/bimtek/input',
    name: 'formPermohonanBimtekPetani',
    component: () => import('src/pages/member/petani/opt/bimtek/Form.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/informasi',
    name: 'showInformasiPetani',
    component: () => import('pages/member/petani/opt/Informasi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/petani/informasi/:id',
    name: 'detailInformasiPetani',
    component: () => import('pages/member/petani/opt/DetailInformasi.vue')
  }
]
