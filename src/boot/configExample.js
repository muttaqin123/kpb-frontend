// change this file name to config.js
const config = {
  dev: {
    baseURL: 'http://192.168.5.213:9068/api/v1',
    urlPemasaran: 'https://api.e-kpb.shop/',
    mapsApiKey: 'AIzaSyCWmOBCzRrPIlgUeBA0RjSwBvHcPsDuxEc'
  },
  production: {
    baseURL: 'https://api.e-kpb.lampungprov.go.id:9068/api/v1/',
    urlPemasaran: 'https://api.e-kpb.shop/',
    mapsApiKey: 'AIzaSyCWmOBCzRrPIlgUeBA0RjSwBvHcPsDuxEc'
  }
}
export default config.dev
