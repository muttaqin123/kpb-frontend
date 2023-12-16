import alsintan from './alsintan'
import beasiswa from './beasiswa'
import duta from './duta'
export default [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: 'dashboardSuperAdmin'
  },
  {
    label: 'Master Data',
    icon: 'source',
    hasChild: true,
    subMenu: [
      {
        label: 'Member',
        icon: 'chevron_right',
        to: 'dataMemberSuperAdmin'
      },
      {
        label: 'Dinas',
        icon: 'chevron_right',
        to: 'dataDinasSuperAdmin'
      },
      {
        label: 'Poktan',
        icon: 'chevron_right',
        to: 'dataPoktanSuperAdmin'
      },
      {
        label: 'Kios',
        icon: 'chevron_right',
        to: 'dataKiosSuperAdmin'
      },
      {
        label: 'Distributor',
        icon: 'chevron_right',
        to: 'dataDistriSuperAdmin'
      },
      {
        label: 'Sektor',
        icon: 'chevron_right',
        to: 'dataSektorSuperAdmin'
      }
    ]
  },
  {
    label: 'Transaksi',
    icon: 'receipt_long',
    hasChild: true,
    subMenu: [
      {
        label: 'Validasi NIK',
        icon: 'chevron_right',
        to: 'validasiNikSuperAdmin'
      },
      {
        label: 'NIK Ditolak',
        icon: 'chevron_right',
        to: 'nikDitolakSuperAdmin'
      },
      {
        label: 'Validasi Role',
        icon: 'chevron_right',
        to: 'pengajuanRoleSuperAdmin'
      },
      {
        label: 'Pengajuan KUR',
        icon: 'chevron_right',
        to: 'dataKURSuperAdmin'
      },
      {
        label: 'Pengajuan BPJS',
        icon: 'chevron_right',
        to: 'dataAsuransiBPJSSuperAdmin'
      },
      {
        label: 'Pengajuan Jasindo',
        icon: 'chevron_right',
        to: 'dataAsuransiJasindoSuperAdmin'
      },
      {
        label: 'Penebusan E-Alokasi',
        icon: 'chevron_right',
        to: 'penebusanPuberAdmin'
      }
    ]
  },
  {
    label: 'Laporan',
    icon: 'text_snippet',
    hasChild: true,
    subMenu: [
      {
        label: 'Data Member',
        icon: 'chevron_right',
        to: 'dataMemberSuperAdmin'
      },
      {
        label: 'Realisasi KUR',
        icon: 'chevron_right',
        to: 'dataRealisasiKURSuperAdmin'
      },
      {
        label: 'BPJS',
        icon: 'chevron_right',
        to: 'dataAsuransiBPJSSuperAdmin'
      },
      {
        label: 'Jasindo',
        icon: 'chevron_right',
        to: 'dataAsuransiJasindoSuperAdmin'
      }
      // {
      //   label: 'Kategori Sapras',
      //   icon: 'design_services',
      //   to: 'manajemenFiturSuperAdmin'
      // }
    ]
  },
  {
    label: 'Settings',
    icon: 'settings',
    hasChild: true,
    subMenu: [
      {
        label: 'Manajemen Role',
        icon: 'chevron_right',
        to: 'manajemenRoleSuperAdmin'
      },
      {
        label: 'Manajemen Layanan',
        icon: 'chevron_right',
        to: 'manajemenLayananSuperAdmin'
      },
      {
        label: 'Manajemen Fitur',
        icon: 'chevron_right',
        to: 'manajemenFiturSuperAdmin'
      },
      {
        label: 'Status KUR',
        icon: 'chevron_right',
        to: 'dataStatusKURSuperAdmin'
      },
      {
        label: 'Kategori Alsintan',
        icon: 'chevron_right',
        to: 'manajemenKategoriAlsintanSuperAdmin'
      }
    ]
  },
  alsintan,
  beasiswa,
  duta
]
// import alsintan from './alsintan'
// export default [
//   {
//     label: 'Dashboard',
//     icon: 'dashboard',
//     to: 'dashboardSuperAdmin'
//   },
//   {
//     label: 'Manajemen Member',
//     icon: 'people',
//     hasChild: true,
//     subMenu: [
//       {
//         label: 'Validasi NIK',
//         icon: 'key',
//         to: 'validasiNikSuperAdmin'
//       },
//       {
//         label: 'Pengajuan Role',
//         icon: 'person',
//         to: 'pengajuanRoleSuperAdmin'
//       },
//       {
//         label: 'Data Member',
//         icon: 'people',
//         to: 'dataMemberSuperAdmin'
//       }
//     ]
//   },
//   {
//     label: 'Manajemen Role',
//     icon: 'manage_accounts',
//     to: 'manajemenRoleSuperAdmin'
//   },
//   {
//     label: 'Manajemen Layanan',
//     icon: 'design_services',
//     to: 'manajemenLayananSuperAdmin'
//   },
//   {
//     label: 'Manajemen Fitur',
//     icon: 'featured_play_list',
//     to: 'manajemenFiturSuperAdmin'
//   },
//   {
//     label: 'Akun Dinas',
//     icon: 'transcribe',
//     to: 'dataDinasSuperAdmin'
//   },
//   {
//     label: 'Manajemen Bank',
//     icon: 'account_balance',
//     to: 'dataBankSuperAdmin'
//   },
//   {
//     label: 'KUR',
//     icon: 'beenhere',
//     hasChild: true,
//     subMenu: [
//       {
//         label: 'Pengajuan KUR',
//         icon: 'chevron_right',
//         to: 'dataKURSuperAdmin'
//       },
//       {
//         label: 'Realisasi KUR',
//         icon: 'chevron_right',
//         to: 'dataRealisasiKURSuperAdmin'
//       },
//       {
//         label: 'Riwayat KUR',
//         icon: 'chevron_right',
//         to: 'dataRiwayatKURSuperAdmin'
//       },
//       {
//         label: 'Status KUR',
//         icon: 'chevron_right',
//         to: 'dataStatusKURSuperAdmin'
//       }
//     ]
//   },
//   {
//     label: 'Data Asuransi',
//     icon: 'group_work',
//     hasChild: true,
//     subMenu: [
//       {
//         label: 'BPJS',
//         icon: 'chevron_right',
//         to: 'dataAsuransiBPJSSuperAdmin'
//       },
//       {
//         label: 'Jasindo',
//         icon: 'chevron_right',
//         to: 'dataAsuransiJasindoSuperAdmin'
//       }
//     ]
//   },
//   {
//     label: 'Data Riwayat Asuransi',
//     icon: 'history',
//     hasChild: true,
//     subMenu: [
//       {
//         label: 'BPJS',
//         icon: 'chevron_right',
//         to: 'dataRiwayatAsuransiBPJSSuperAdmin'
//       },
//       {
//         label: 'AUTP',
//         icon: 'chevron_right',
//         to: 'dataRiwayatAsuransiAUTPSuperAdmin'
//       },
//       {
//         label: 'AUTSK',
//         icon: 'chevron_right',
//         to: 'dataRiwayatAsuransiAUTSKSuperAdmin'
//       }
//     ]
//   },
//   {
//     label: 'Manajemen Sapras',
//     icon: 'precision_manufacturing',
//     hasChild: true,
//     subMenu: [
//       {
//         label: 'Data Penyedia Sapras',
//         icon: 'chevron_right',
//         to: 'manajemenPenyediaSaprasSuperAdmin'
//       },
//       {
//         label: 'Data Sapras',
//         icon: 'chevron_right',
//         to: 'manajemenSaprasSuperAdmin'
//       }
//       // {
//       //   label: 'Kategori Sapras',
//       //   icon: 'design_services',
//       //   to: 'manajemenFiturSuperAdmin'
//       // }
//     ]
//   },
//   alsintan
// ]
