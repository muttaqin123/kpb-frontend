import { dinasKehutananKab } from 'src/helper/ListAkses'
export default {
  path: '/dinaskehutanan-kabupaten/',
  meta: {
    adaMenu: true,
    auth: true,
    dinaskehutanankab: true,
    allowedRole: dinasKehutananKab.value
  },
  component: () => import('src/layouts/dinas/DinasKehutananKab.vue'),
  children: [
    {
      path: 'dashboard',
      name: dinasKehutananKab.index,
      component: () => import('pages/kehutanan/kabupaten/Index.vue')
    },
    {
      path: 'kur',
      name: 'dataKURDinasKehutananKab',
      component: () => import('pages/kehutanan/kabupaten/kur/Index.vue')
    },
    {
      path: 'kur/detail/:id',
      name: 'detailKURDinasKehutananKab',
      component: () => import('pages/sharedpages/kur/Detail.vue')
    }
  ]
}
