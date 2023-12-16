import { pabrikan } from 'src/helper/ListAkses'
export default {
  path: '/pabrikan/',
  meta: {
    adaMenu: true,
    auth: true,
    pabrikan: true,
    allowedRole: pabrikan.value
  },
  component: () => import('src/layouts/PabrikanLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: pabrikan.index,
      component: () => import('pages/pabrikan/Index.vue')
    },
    {
      path: 'databarang',
      name: 'dataBarangPabrikan',
      component: () => import('pages/pabrikan/DataBarang.vue')
    }
  ]
}
