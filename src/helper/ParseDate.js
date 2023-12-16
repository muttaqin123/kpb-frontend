const listMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'Desember']
const listDay = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const fullListMonth = listMonth.map((r, i) => {
  return {
    label: r,
    value: i + 1
  }
})
function parseDate (date) {
  let respon
  if (date === '' || date === null || date === undefined) {
    respon = {
      date: '-',
      dateLocal: '-',
      fullDate: '-',
      timeStap: '-'
    }
  } else {
    const newDate = new Date(date)
    const month = '' + (newDate.getUTCMonth() + 1)
    const tgl = '' + (newDate.getUTCDate())
    const year = newDate.getUTCFullYear()
    const full = `${tgl} ${listMonth[month - 1]} ${year}`
    respon = {
      dateLocal: [year, `${month < 10 ? `0${month}` : (month)}`, `${tgl < 10 ? `0${tgl}` : tgl}`].join('/'),
      fullDate: full,
      timeCustom: `${full}`,
      timeStap: `${full} ${newDate.getUTCHours()}:${newDate.getUTCMinutes()}:${newDate.getUTCSeconds()}`,
      timeWithDay: `${listDay[newDate.getUTCDay()]}, ${full}`
    }
  }
  return respon
}

function generateYear () {
  const thisYear = new Date().getFullYear()
  const listYear = []
  for (let i = 0; i < 5; i++) {
    listYear.push(thisYear + i)
  }
  return listYear
}
export { parseDate, generateYear, listMonth, fullListMonth }
