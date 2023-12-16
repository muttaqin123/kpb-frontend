const listStatus = [
  {
    label: 'Belum Melakukan Pembayaran',
    color: 'negative',
    value: 0
  },
  {
    label: 'Sudah Melakukan Pembayaran',
    color: 'warning',
    value: 1
  },
  {
    label: 'Pembayaran Dikonfirmasi Kios',
    color: 'warning',
    value: 2
  },
  {
    label: 'Barang Dikirim',
    color: 'warning',
    value: 3
  },
  {
    label: 'Transaksi Berhasil',
    color: 'positive',
    value: 4
  },
  {
    label: 'Pembayaran Ditolak',
    color: 'negative',
    value: 5
  }
]
export default function (status) {
  const filterListStatus = listStatus.filter(r => r.value === Number(status))
  return filterListStatus.length > 0 ? filterListStatus[0] : {
    label: '-',
    color: 'negative',
    value: '-'
  }
}
