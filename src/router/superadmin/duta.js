export default [
  {
    path: 'listkegiatanDuta',
    name: 'dataKegiatanDuta',
    component: () => import('src/pages/superadmin/duta/Index.vue')
  },
  {
    path: 'listkegiatanDuta/:nik',
    name: 'listkegiatanDutaMember',
    component: () => import('src/pages/superadmin/duta/listKegiatanbyMember.vue')
  },
  {
    path: 'detailKegiatan/:nik/:id',
    name: 'detailAktivitasAdmin',
    component: () => import('src/pages/sharedpages/duta/DetailAktivitas.vue')
  }
]
