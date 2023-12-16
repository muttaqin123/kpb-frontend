import { brigade } from 'src/helper/ListAkses'
export default {
  path: '/brigade/',
  meta: {
    adaMenu: true,
    auth: true,
    brigade: true,
    allowedRole: brigade.value
  },
  component: () => import('src/layouts/BrigadeLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: brigade.index,
      component: () => import('pages/brigade/Index.vue')
    },
    {
      path: 'permohonanpeminjaman',
      name: 'permohonanPeminjaman',
      component: () => import('pages/brigade/PermohonanPeminjaman.vue')
    },
    // {
    //   path: 'historispermohonan',
    //   name: 'historisPeminjaman',
    //   component: () => import('pages/brigade/HistoryTransaksi.vue')
    // },
    {
      path: 'historidisetujui',
      name: 'historiDisetujui',
      component: () => import('pages/brigade/HistoriTransaksi/Disetujui.vue')
    },
    {
      path: 'historipengeluaranbarang',
      name: 'historipengeluaranbarang',
      component: () => import('pages/brigade/HistoriTransaksi/PengeluaranBarang.vue')
    },
    {
      path: 'historidistprovagen',
      name: 'historiDistProvAgen',
      component: () => import('pages/brigade/HistoriTransaksi/DistribusiProvkeAgen.vue')
    },
    {
      path: 'historidistagenpetani',
      name: 'historiDistAgenPetani',
      component: () => import('pages/brigade/HistoriTransaksi/DistribusiAgenkePetani.vue')
    },
    {
      path: 'historiberlangsung',
      name: 'historiBerlangsung',
      component: () => import('pages/brigade/HistoriTransaksi/Berlangsung.vue')
    },
    {
      path: 'historipengembaliankeagen',
      name: 'historiPengembalianKeAgen',
      component: () => import('pages/brigade/HistoriTransaksi/DikembalikankeAgen.vue')
    },
    {
      path: 'historipengembaliankeprov',
      name: 'historiPengembalianKeProv',
      component: () => import('pages/brigade/HistoriTransaksi/PengembaliankeProvinsi.vue')
    },
    {
      path: 'historiditolak',
      name: 'historiDitolak',
      component: () => import('pages/brigade/HistoriTransaksi/Ditolak.vue')
    },
    {
      path: 'historidibatalkan',
      name: 'historiDibatalkan',
      component: () => import('pages/brigade/HistoriTransaksi/Dibatalkan.vue')
    },
    {
      path: 'reportlaporan',
      name: 'reportLaporan',
      component: () => import('pages/brigade/HistoriTransaksi/ReportLaporan.vue')
    },
    {
      path: 'detailpermohonan/:id',
      name: 'detailPermohonan',
      component: () => import('pages/brigade/DetailPermohonan.vue')
    },
    {
      path: 'daftargudang',
      name: 'daftarGudang',
      component: () => import('pages/brigade/daftarGudang.vue')
    },
    {
      path: 'daftargudang/listbarang/:idgudang',
      name: 'isigudang',
      component: () => import('pages/brigade/IsiGudang.vue')
    },
    {
      path: '/materialmaster/:idgudang',
      name: 'materialMaster',
      component: () => import('pages/brigade/MaterialMaster.vue')
    },
    {
      path: '/materialmaster/detail/:id/:idgudang',
      name: 'detailMaterialMaster',
      component: () => import('pages/brigade/MaterialMasterDetail.vue')
    },
    {
      path: 'detailmaterialmastergudang/:idmm/:idgudang/:idagen',
      name: 'detailMaterialMasterGudang',
      component: () => import('pages/brigade/DetailMaterialMasterGudang.vue')
    },
    {
      path: 'agenkabupaten/',
      name: 'agenKabupaten',
      component: () => import('pages/brigade/Agen/AgenKabupaten.vue')
    },
    {
      path: 'agenkabupaten/form/:nik',
      name: 'formAgenkabupaten',
      component: () => import('pages/brigade/Agen/FormAgen.vue')
    },
    {
      path: '/sarpras/materialmaster',
      name: 'brigademanajemenSaprasSuperAdmin',
      component: () => import('pages/superadmin/sapras/Index.vue')
    },
    {
      path: '/master/harga',
      name: 'masterHargaBrigade',
      component: () => import('pages/brigade/MasterHarga.vue')
    }
    // {
    //   path: 'employee',
    //   name: 'employee',
    //   component: () => import('pages/brigade/ProfileBrigade.vue')
    // },
    // {
    //   path: 'profile',
    //   name: 'ProfileBrigade',
    //   component: () => import('pages/brigade/ProfileBrigade.vue')
    // }
  ]
}
