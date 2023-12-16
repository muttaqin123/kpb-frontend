export default function (data) {
  return `${data.provinsi ?? ''} - ${data.kabupaten} - ${data.kecamatan} - ${data.desa}`
}
