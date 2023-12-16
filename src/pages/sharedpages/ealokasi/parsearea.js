export default function (data) {
  return `${data.pubers_poktan?.reg_villages?.name ?? '-'} - ${data.pubers_poktan?.reg_villages?.reg_districts?.name ?? '-'} - ${data.pubers_poktan?.reg_villages?.reg_districts?.reg_regencies?.name ?? '-'}`
}
