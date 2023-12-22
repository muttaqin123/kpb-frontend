import { unila } from 'src/helper/ListAkses'
export default {
  path: '/unila/',
  meta: {
    adaMenu: true,
    auth: true,
    unila: true,
    allowedRole: unila.value
  },
  component: () => import('src/layouts/UnilaLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: unila.index,
      component: () => import('pages/unila/Index.vue')
    },
    {
      path: 'tambah',
      name: 'unilaTambahArtikel',
      component: () => import('pages/unila/Tambah.vue')
    },
    {
      path: 'edit/:id',
      name: 'unilaEditArtikel',
      component: () => import('pages/unila/Tambah.vue')
    },
    {
      path: 'detail/:id',
      name: 'unilaDetailArtikel',
      component: () => import('pages/sharedpages/klinikperkebunan/Artikel.vue')
    }
  ]
}
