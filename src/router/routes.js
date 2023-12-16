import adminRoutes from './superadmin/index'
import bankRoutes from './bank/index'
import routeMember from './member/index'
import dinasRoutes from './dinas/index'
import otherRoutes from './other/index'
import kios from './member/kios'
import pemasaran from './other/pemasaran'
import beasiswa from './superadmin/beasiswa'

const routes = [
  adminRoutes,
  bankRoutes,
  ...dinasRoutes,
  ...otherRoutes,
  pemasaran,
  {
    path: '/',
    name: 'loginPage',
    component: () => import('pages/user/Login.vue')
  },
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      {
        path: 'landingpage',
        name: 'landingpage',
        component: () => import('src/pages/guest/LandingPageNew.vue')
      },
      {
        path: 'layanan',
        name: 'layanan',
        component: () => import('src/pages/guest/LayananNew.vue')
      },
      {
        path: 'laporan',
        name: 'laporan',
        component: () => import('src/pages/guest/LaporanNew.vue')
      },
      {
        path: 'panduan',
        name: 'panduan',
        component: () => import('src/pages/guest/PanduanAplikasiNew.vue')
      }
    ]
  },
  {
    path: '/card',
    name: 'cardPage',
    component: () => import('pages/sharedpages/card/Index.vue')
  },
  {
    path: '/register',
    name: 'registerPage',
    component: () => import('pages/user/Register.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MenuLayout.vue'),
    meta: {
      auth: true,
      member: true
    },
    children: [
      {
        path: 'member',
        name: 'indexRoleMember',
        component: () => import('pages/member/Index.vue')
      },
      {
        path: 'member/profile',
        name: 'updateProfile',
        component: () => import('pages/sharedpages/others/UpdateProfile.vue')
      },
      {
        path: 'member/role',
        name: 'indexTambahRoleMember',
        component: () => import('pages/member/PilihRole.vue')
      },
      {
        path: 'layanan/:idRole',
        name: 'indexLayanan',
        meta: {
          cekAkses: true,
          cekRole: true
        },
        component: () => import('pages/member/Layanan.vue')
      }
      // {
      //   path: 'fitur/:idRole/:idLayanan',
      //   name: 'indexFitur',
      //   meta: {
      //     adaMenu: true,
      //     cekAkses: true,
      //     cekLayanan: true
      //   },
      //   component: () => import('pages/member/Fitur.vue')
      // },
      // {
      //   path: 'fitur/:idRole/:idLayanan/apa',
      //   name: 'indexFiturApa',
      //   meta: {
      //     adamenu: true,
      //     idFitur: 4,
      //     idLayanan: 3
      //   },
      //   component: () => import('pages/member/Fitur.vue')
      // }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/FiturLayout.vue'),
    meta: {
      auth: true,
      adaMenu: true,
      cekAkses: true,
      cekFitur: true,
      member: true
    },
    children: routeMember
  },
  kios.cetakRoutes,
  beasiswa.cetakRoutes,
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
