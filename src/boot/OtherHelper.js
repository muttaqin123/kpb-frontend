import { boot } from 'quasar/wrappers'
import { parseDate, generateYear } from '../helper/ParseDate'

const formatNumber = (value) => {
  const val = (value / 1).toFixed(0).replace('.', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export default boot(async ({ app }) => {
  app.config.globalProperties.$getParams = (route) => {
    return {
      idRole: route.params.idRole,
      idLayanan: route.params.idLayanan
    }
  }

  app.config.globalProperties.$formatNumber = formatNumber
  app.config.globalProperties.$formatPrice = (val) => {
    return `Rp.${formatNumber(val)},00`
  }

  app.config.globalProperties.$parseDate = parseDate
  app.config.globalProperties.$generateYear = generateYear
  app.config.globalProperties.$defaultValidation = [
    val => val !== null & val !== '' || 'Mohon Isi'
  ]
  app.config.globalProperties.$map = {
    zoom: 12,
    center: { lat: -5.4170269, lng: 105.2689625 }
  }

  app.config.globalProperties.$dateTimeManual = (datetime) => {
    const date = new Date(datetime)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    const seconds = String(date.getUTCSeconds()).padStart(2, '0')

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
  }
  app.config.globalProperties.$convertRupiah = (angka) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })

    return formatter.format(angka)
  }
})
