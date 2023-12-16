import { bppKec } from '../../../helper/ListAkses'
export default [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: bppKec.index
  },
  {
    label: 'Data KUR',
    icon: 'article',
    to: `dataKUR${bppKec.name}`
  },
  // {
  //   label: 'Data E-Alokasi',
  //   icon: 'article',
  //   to: `dataEAlokasi${bppKec.name}`
  // },
  {
    label: 'Data Penebusan',
    icon: 'article',
    to: `penebusanPuber${bppKec.name}`
  }
]
