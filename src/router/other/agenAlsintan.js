import { agenAlsintan } from 'src/helper/ListAkses'
export default {
  path: '/agenalsintan/',
  meta: {
    adaMenu: true,
    auth: true,
    agenalsintan: true,
    allowedRole: agenAlsintan.value
  },
  component: () => import('src/layouts/AgenAlsintan.vue'),
  children: [
    {
      path: 'dashboard',
      name: agenAlsintan.index,
      component: () => import('pages/agenAlsintan/Index.vue')
    },
    {
      path: 'permohonan/detail/:id',
      name: 'detailAgenAlsintan',
      component: () => import('pages/agenAlsintan/DetailPermohonan.vue')
    },
    {
      path: 'permohonan/transit/',
      name: 'agenDataTransit',
      component: () => import('pages/agenAlsintan/Transit.vue')
    },
    {
      path: 'permohonan/sedang-berlangsung',
      name: 'agenDataBerlangsung',
      component: () => import('pages/agenAlsintan/Berlangsung.vue')
    },
    {
      path: 'permohonan/pemulangan-ke-agen',
      name: 'agenDataPemulangan',
      component: () => import('pages/agenAlsintan/PulangAgen.vue')
    }
  ]
}
