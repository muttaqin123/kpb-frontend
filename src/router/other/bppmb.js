import { bppmb } from 'src/helper/ListAkses'
export default {
  path: '/bppmb/',
  meta: {
    adaMenu: true,
    auth: true,
    bppmb: true,
    allowedRole: bppmb.value
  },
  component: () => import('src/layouts/BPPMB.vue'),
  children: [
    {
      path: 'dashboard',
      name: bppmb.index,
      component: () => import('pages/bppmb/Index.vue')
    },
    {
      path: 'pengajuan',
      name: 'pengajuanSertifikasiBenihBPPMB',
      component: () => import('pages/bppmb/Pengajuan.vue')
    },
    {
      path: 'detail/:id',
      name: 'detailSertifikasiBenihBPPMB',
      component: () => import('pages/sharedpages/sertifikasibenih/detailBenih.vue')
    },
    {
      path: 'realisasi',
      name: 'realisasiSertifikasiBenihBPPMB',
      component: () => import('pages/bppmb/Realisasi.vue')
    }
  ]
}
