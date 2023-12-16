import { agenAlsintan } from '../..//helper/ListAkses'
export default [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: agenAlsintan.index
  },
  {
    label: 'Transit',
    icon: 'browse_gallery',
    to: 'agenDataTransit'
  },
  {
    label: 'Sedang Berlangsung',
    icon: 'auto_mode',
    to: 'agenDataBerlangsung'
  },
  {
    label: 'Pemulangan Ke Agen',
    icon: 'reply_all',
    to: 'agenDataPemulangan'
  }
]
