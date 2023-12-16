import { jasindo } from 'src/helper/ListAkses'
export default {
  path: '/jasindo/',
  meta: {
    adaMenu: true,
    auth: true,
    jasindo: true,
    allowedRole: jasindo.value
  },
  component: () => import('src/layouts/Jasindo.vue'),
  children: [
    {
      path: 'dashboard',
      name: jasindo.index,
      component: () => import('pages/jasindo/Index.vue')
    },
    {
      path: 'pengajuan',
      name: 'pengajuanAsuransiJasindo',
      component: () => import('pages/jasindo/Pengajuan.vue')
    },
    {
      path: 'pengajuan/detail/:id',
      name: 'detailPengajuanAsuransiJasindo',
      component: () => import('pages/sharedpages/asuransi/jasindo/Detail.vue')
    }
  ]
}
