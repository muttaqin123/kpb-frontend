import { okkpd } from 'src/helper/ListAkses'
export default {
  path: '/okkpd/',
  meta: {
    adaMenu: true,
    auth: true,
    okkpd: true,
    allowedRole: okkpd.value
  },
  component: () => import('src/layouts/OKKPD.vue'),
  children: [
    {
      path: 'dashboard',
      name: okkpd.index,
      component: () => import('pages/okkpd/Index.vue')
    },
    {
      path: 'dataPermohonan',
      name: 'dataPermohonan',
      component: () => import('pages/okkpd/dataPengajuan.vue')
    },
    {
      path: 'dataKomoditas',
      name: 'dataKomoditas',
      component: () => import('pages/okkpd/dataKomoditas.vue')
    },
    {
      path: 'dataKepuasan',
      name: 'dataKepuasan',
      component: () => import('pages/okkpd/dataKepuasan.vue')
    },
    {
      path: 'dataPermohonan/:id',
      name: 'permohonanOkkpd',
      component: () => import('pages/sharedpages/okkpd/detailPermohonan.vue')
    },
    {
      path: 'dataPengujianLab/:idDetail/:id',
      name: 'pengajuanSCHCOkkpd',
      component: () => import('pages/sharedpages/okkpd/pengajuanSCHC.vue')
    },
    {
      path: 'detailPenilaian/:idDetail/:id',
      name: 'ratingKepuasanOkkpd',
      component: () => import('pages/sharedpages/okkpd/ratingKepuasan.vue')
    },
    {
      path: 'dataMember',
      name: 'memberOkkpd',
      component: () => import('pages/okkpd/dataMember.vue')
    }
  ]
}
