import { brigade } from '../..//helper/ListAkses'
export default [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: brigade.index
  },
  {
    label: 'Permohonan Peminjaman',
    icon: 'mark_unread_chat_alt',
    to: 'permohonanPeminjaman'
  },
  // {
  //   label: 'Histori Permohonan/ Transaksi',
  //   icon: 'receipt',
  //   to: 'historisPeminjaman'
  // },
  {
    label: 'Histori Permohonan/ Transaksi',
    icon: 'receipt',
    hasChild: true,
    subMenu: [
      {
        label: 'Disetujui',
        icon: 'chevron_right',
        to: 'historiDisetujui'
      },
      {
        label: 'Pengeluaran Barang',
        icon: 'chevron_right',
        to: 'historipengeluaranbarang'
      },
      {
        label: 'Distribusi Provinsi Ke Agen',
        icon: 'chevron_right',
        to: 'historiDistProvAgen'
      },
      {
        label: 'Dikirim Ke Peminjam',
        icon: 'chevron_right',
        to: 'historiDistAgenPetani'
      },
      {
        label: 'Berlangsung',
        icon: 'chevron_right',
        to: 'historiBerlangsung'
      },
      {
        label: 'Pengembalian Ke Agen',
        icon: 'chevron_right',
        to: 'historiPengembalianKeAgen'
      },
      {
        label: 'Pengembalian Ke Brigade',
        icon: 'chevron_right',
        to: 'historiPengembalianKeProv'
      },
      {
        label: 'Ditolak',
        icon: 'chevron_right',
        to: 'historiDitolak'
      },
      {
        label: 'Dibatalkan',
        icon: 'chevron_right',
        to: 'historiDibatalkan'
      },
      {
        label: 'Report Laporan',
        icon: 'chevron_right',
        to: 'reportLaporan'
      }
    ]
  },
  {
    label: 'Material Master',
    icon: 'trolley',
    to: 'brigademanajemenSaprasSuperAdmin'
  },
  {
    label: 'Master Harga',
    icon: 'currency_exchange',
    to: 'masterHargaBrigade'
  },
  {
    label: 'Daftar Gudang',
    icon: 'emoji_transportation',
    to: 'daftarGudang'
  },
  {
    label: 'Agen Kabupaten',
    icon: 'emoji_people',
    to: 'agenKabupaten'
  }
  // {
  //   label: 'Data Anggota/ Employee',
  //   icon: 'group_add',
  //   to: 'employee'
  // },
  // {
  //   label: 'Profile',
  //   icon: 'verified',
  //   to: 'ProfileBrigade'
  // }
]
