import { disbunKab } from 'src/helper/ListAkses'
export default [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: disbunKab.index
  },
  {
    label: 'Data KUR',
    icon: 'article',
    to: 'dataKURDisbunKab'
  },
  {
    label: 'Data Penebusan',
    icon: 'article',
    to: `penebusanPuber${disbunKab.name}`
  },
  {
    label: 'Data Klinik Perkebunan',
    icon: 'article',
    to: `klinik${disbunKab.name}`
  },
  {
    label: 'Riwayat Data Klinik Perkebunan',
    icon: 'article',
    to: `riwayatKlinik${disbunKab.name}`
  }
]
