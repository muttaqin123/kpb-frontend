import { bpsb } from 'src/helper/ListAkses'
export default {
  path: '/bpsb/',
  meta: {
    adaMenu: true,
    auth: true,
    bppmb: true,
    allowedRole: bpsb.value
  },
  component: () => import('src/layouts/BPSBLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: bpsb.index,
      component: () => import('pages/bpsb/Index.vue')
    },
    {
      path: 'list-pengajuan',
      name: 'listPengajuanBPSB',
      component: () => import('pages/bpsb/ListPengajuan.vue')
    },
    {
      path: 'detail/:id',
      name: 'detailPengajuanBPSBAdmin',
      component: () => import('src/pages/sharedpages/sertifikasibenihpertanian/detailPageAdmin.vue')
    }
  ]
}
