import { institusi } from 'src/helper/ListAkses'
export default {
  path: '/institusi/',
  meta: {
    adaMenu: true,
    auth: true,
    institusi: true,
    allowedRole: institusi.value
  },
  component: () => import('src/layouts/institusi.vue'),
  children: [
    {
      path: 'dashboard',
      name: institusi.index,
      component: () => import('pages/institusipendidikan/indexPage.vue')
    },
    {
      path: 'datadiri',
      name: 'datadiriInstitusi',
      component: () => import('pages/institusipendidikan/DataDiri.vue')
    },
    {
      path: 'dataBeasiswa',
      name: 'dataBeasiswaInstitusi',
      component: () => import('pages/institusipendidikan/DataBeasiswa.vue')
    },
    {
      path: 'detailBeasiswa/:id',
      name: 'detailbeasiswaInstitut',
      component: () => import('pages/sharedpages/beasiswa/DetailPage.vue')
    },
    {
      path: 'dataPengajuan',
      name: 'dataPengajuanInstitut',
      component: () => import('pages/institusipendidikan/DataPengajuan.vue')
    },
    {
      path: 'detailPengajuan/:id',
      name: 'detailPengajuanInstitut',
      component: () => import('pages/sharedpages/beasiswa/DetailPengajuan.vue')
    }
  ]
}
