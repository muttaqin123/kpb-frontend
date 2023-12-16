// routes supoeradmin
import saprotan from './saprotan'
import alsintan from './alsintan'
import ealokasi from './ealokasi'
import beasiswa from './beasiswa'
import { superAdmin } from 'src/helper/ListAkses'
import duta from './duta'
export default {
  path: '/super-admin/',
  meta: {
    adaMenu: true,
    auth: true,
    admin: true,
    allowedRole: superAdmin.value
  },
  component: () => import('src/layouts/SuperAdminLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: superAdmin.index,
      component: () => import('pages/superadmin/Index.vue')
    },
    {
      path: 'role/pengajuan',
      name: 'pengajuanRoleSuperAdmin',
      component: () => import('pages/superadmin/role/PengajuanRole.vue')
    },
    {
      path: 'role',
      name: 'manajemenRoleSuperAdmin',
      component: () => import('pages/superadmin/role/Index.vue')
    },
    {
      path: 'role/layanan/:idRole',
      name: 'manajemenRoleLayananSuperAdmin',
      component: () => import('pages/superadmin/role/RoleLayanan.vue')
    },
    {
      path: 'member',
      name: 'dataMemberSuperAdmin',
      component: () => import('pages/superadmin/member/Index.vue')
    },
    {
      path: 'member/detail/:id',
      name: 'detailDataMemberSuperAdmin',
      component: () => import('pages/superadmin/member/Detail.vue')
    },
    {
      path: 'poktan',
      name: 'dataPoktanSuperAdmin',
      component: () => import('pages/superadmin/poktan/Index.vue')
    },
    {
      path: 'poktan/:nik',
      name: 'detailPoktanSuperAdmin',
      component: () => import('pages/superadmin/poktan/Detail.vue')
    },
    {
      path: 'kios',
      name: 'dataKiosSuperAdmin',
      component: () => import('pages/superadmin/kios/Index.vue')
    },
    {
      path: 'kios/:nik',
      name: 'detailKiosSuperAdmin',
      component: () => import('pages/superadmin/kios/Detail.vue')
    },
    {
      path: 'layanan',
      name: 'manajemenLayananSuperAdmin',
      component: () => import('pages/superadmin/layanan/Index.vue')
    },
    {
      path: 'layanan/fitur/:idLayanan',
      name: 'manajemenFiturLayananSuperAdmin',
      component: () => import('pages/superadmin/layanan/FiturLayanan.vue')
    },
    {
      path: 'fitur',
      name: 'manajemenFiturSuperAdmin',
      component: () => import('pages/superadmin/fitur/Index.vue')
    },
    {
      path: 'bank',
      name: 'dataBankSuperAdmin',
      component: () => import('pages/superadmin/bank/Index.vue')
    },
    {
      path: 'kur/pengajuan',
      name: 'dataKURSuperAdmin',
      component: () => import('pages/superadmin/bank/PengajuanKUR.vue')
    },
    {
      path: 'kur/realisasi',
      name: 'dataRealisasiKURSuperAdmin',
      component: () => import('pages/superadmin/bank/RealisasiKUR.vue')
    },
    {
      path: 'kur/riwayat',
      name: 'dataRiwayatKURSuperAdmin',
      component: () => import('pages/superadmin/bank/RiwayatKUR.vue')
    },
    {
      path: 'asuransi/bjps',
      name: 'dataAsuransiBPJSSuperAdmin',
      component: () => import('pages/superadmin/asuransi/BPJS.vue')
    },
    {
      path: 'asuransi/bjps/detail/:id',
      name: 'detailDataAsuransiBPJSSuperAdmin',
      component: () => import('pages/sharedpages/asuransi/bpjs/Detail.vue')
    },
    {
      path: 'asuransi/jasindo',
      name: 'dataAsuransiJasindoSuperAdmin',
      component: () => import('pages/superadmin/asuransi/Jasindo.vue')
    },
    {
      path: 'asuransi/jasindo/detail/:id',
      name: 'detailDataAsuransiJasindoSuperAdmin',
      component: () => import('pages/sharedpages/asuransi/jasindo/Detail.vue')
    },

    // riwayat
    {
      path: 'asuransi/riwayat/bjps',
      name: 'dataRiwayatAsuransiBPJSSuperAdmin',
      component: () => import('src/pages/superadmin/asuransi/riwayat/BPJS.vue')
    },
    {
      path: 'asuransi/riwayat/autp',
      name: 'dataRiwayatAsuransiAUTPSuperAdmin',
      component: () => import('src/pages/superadmin/asuransi/riwayat/AUTP.vue')
    },
    {
      path: 'asuransi/riwayat/autsk',
      name: 'dataRiwayatAsuransiAUTSKSuperAdmin',
      component: () => import('src/pages/superadmin/asuransi/riwayat/AUTSK.vue')
    },
    {
      path: 'kur/detail/:id',
      name: 'detailKURSuperAdmin',
      component: () => import('pages/sharedpages/kur/Detail.vue')
    },
    {
      path: 'kur/status',
      name: 'dataStatusKURSuperAdmin',
      component: () => import('pages/superadmin/bank/StatusKUR.vue')
    },
    {
      path: 'dinas',
      name: 'dataDinasSuperAdmin',
      component: () => import('pages/superadmin/dinas/Index.vue')
    },
    ...saprotan,
    ...alsintan,
    ...ealokasi,
    ...beasiswa.allRoutes,
    ...duta,

    // validasi nik
    {
      path: 'nik/validasi',
      name: 'validasiNikSuperAdmin',
      component: () => import('pages/superadmin/member/ValidasiNIK.vue')
    },
    {
      path: 'nik/ditolak',
      name: 'nikDitolakSuperAdmin',
      component: () => import('pages/superadmin/member/NIKTolak.vue')
    },

    // data distri
    {
      path: 'distributor',
      name: 'dataDistriSuperAdmin',
      component: () => import('pages/superadmin/distri/Index.vue')
    },
    {
      path: 'distributor/:nik/:kode',
      name: 'listKiosDistriSuperAdmin',
      component: () => import('pages/superadmin/distri/ListKios.vue')
    },

    // data sektor
    {
      path: 'sektor',
      name: 'dataSektorSuperAdmin',
      component: () => import('pages/superadmin/sektor/Index.vue')
    },
    {
      path: 'sektor/kategori/:name/:id',
      name: 'dataKategoriSektorSuperAdmin',
      component: () => import('pages/superadmin/sektor/kategori.vue')
    },
    {
      path: 'sektor/detail-kategori/:name/:id',
      name: 'dataDetailKategoriSektorSuperAdmin',
      component: () => import('pages/superadmin/sektor/DetailKategori.vue')
    },
    {
      path: 'sektor/child-detail-kategori/:name/:id',
      name: 'dataChildDetailKategoriSektorSuperAdmin',
      component: () => import('pages/superadmin/sektor/ChildDetailKategori.vue')
    }
  ]
}
