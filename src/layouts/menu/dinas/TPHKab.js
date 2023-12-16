import { tphKab } from '../../../helper/ListAkses'
export default [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: tphKab.index
  },
  {
    label: 'Data KUR',
    icon: 'article',
    to: `dataKUR${tphKab.name}`
  },
  // {
  //   label: 'Data E-Alokasi',
  //   icon: 'article',
  //   to: `dataEAlokasi${tphKab.name}`
  // },
  {
    label: 'Data Penebusan',
    icon: 'article',
    to: `penebusanPuber${tphKab.name}`
  }
]
