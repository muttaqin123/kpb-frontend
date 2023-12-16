import { bpjs } from 'src/helper/ListAkses'
export default {
  path: '/bpjs/',
  meta: {
    adaMenu: true,
    auth: true,
    bpjs: true,
    allowedRole: bpjs.value
  },
  component: () => import('src/layouts/BPJS.vue'),
  children: [
    {
      path: 'dashboard',
      name: bpjs.index,
      component: () => import('pages/bpjs/Index.vue')
    },
    {
      path: 'pengajuan',
      name: 'pengajuanBPJSByBPJS',
      component: () => import('pages/bpjs/Pengajuan.vue')
    },
    {
      path: 'pengajuan/detail/:id',
      name: 'detailPengajuanBPJSByBPJS',
      component: () => import('pages/sharedpages/asuransi/bpjs/Detail.vue')
    }
  ]
}
