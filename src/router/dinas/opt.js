import { opt } from '../../helper/ListAkses'
export default {
  path: '/opt/',
  meta: {
    adaMenu: true,
    auth: true,
    tphKab: true,
    allowedRole: opt.value
  },
  component: () => import('src/layouts/dinas/OPT.vue'),
  children: [
    {
      path: 'dashboard',
      name: opt.index,
      component: () => import('pages/opt/Index.vue')
    },
    {
      path: 'dokter',
      name: 'dataDokterOpt',
      component: () => import('pages/opt/dokter/Index.vue')
    },
    {
      path: 'dokter/input',
      name: 'inputDataDokterOpt',
      component: () => import('pages/opt/dokter/Input.vue')
    },
    {
      path: 'dokter/edit/:id',
      name: 'editDataDokterOpt',
      component: () => import('pages/opt/dokter/Edit.vue')
    },
    {
      path: 'pengaduan/opt',
      name: 'dataPengaduanOPTPetaniOpt',
      component: () => import('pages/opt/pengaduan/Index.vue')
    },
    {
      path: 'pengaduan/dpi',
      name: 'dataPengaduanSPIPetaniOpt',
      component: () => import('src/pages/opt/pengaduan/dpi/DPI.vue')
    },
    {
      path: 'aph',
      name: 'dataPermohonanAPHPetaniOpt',
      component: () => import('src/pages/opt/pengaduan/aph/Index.vue')
    },
    {
      path: 'aph/master',
      name: 'masterAPHPetaniOpt',
      component: () => import('src/pages/opt/pengaduan/aph/MasterAPH.vue')
    },
    {
      path: 'bimtek',
      name: 'dataPermohonanBimtekPetaniOpt',
      component: () => import('src/pages/opt/bimtek/Index.vue')
    },
    {
      path: 'berita',
      name: 'indexBeritaOpt',
      component: () => import('pages/opt/berita/Index.vue')
    },
    {
      path: 'berita/input',
      name: 'inputBeritaOpt',
      component: () => import('pages/opt/berita/Input.vue')
    },
    {
      path: 'berita/kategori',
      name: 'kategoriBeritaOpt',
      component: () => import('pages/opt/berita/Kategori.vue')
    }
  ]
}
