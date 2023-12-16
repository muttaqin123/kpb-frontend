import { adminSijelabat } from '../../helper/ListAkses'
export default [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: adminSijelabat.index
  },
  {
    label: 'Profil Usaha',
    icon: 'domain_add',
    hasChild: true,
    subMenu: [
      {
        label: 'Menunggu Verifikasi',
        icon: 'chevron_right',
        to: 'AdminSijelabatProfilUsahaUnverifikasi'
      },
      {
        label: 'Data Profil Usaha',
        icon: 'chevron_right',
        to: 'AdminSejelabatProfilUsaha'
      }
    ]
  },
  {
    label: 'Laporan Transaksi',
    icon: 'store',
    to: 'AdminSejelabatTransaksiList'
  }
]
