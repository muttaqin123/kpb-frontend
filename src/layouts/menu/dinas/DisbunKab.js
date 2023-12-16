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
  }
]
