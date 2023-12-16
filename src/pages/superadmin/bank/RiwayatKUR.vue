<template>
  <q-page padding>
    <q-table
      loading-label="Sedang Memuat"
      flat
      title="Data Riwayat KUR"
      :rows="rows"
      :loading="loading"
      :columns="columns"
      row-key="nama"
      @request="onRequest"
      :pagination="pagination"
      v-model:pagination="pagination"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="NIK" :props="props">
            {{ props.row.NIK }}
          </q-td>
          <q-td key="Nama" :props="props">
            {{ props.row.Nama }}
          </q-td>
          <q-td key="bank" :props="props">
            {{ getNamaBank(props.row.id_Bank) }}
          </q-td>
          <q-td key="CabangBank" :props="props">
            {{ props.row.CabangBank }}
          </q-td>
          <q-td key="Kabupaten" :props="props">
            {{ props.row.Kabupaten }}
          </q-td>
          <q-td key="Alamat" :props="props">
            {{ props.row.Alamat }}
          </q-td>
          <q-td key="JumlahPinjaman" :props="props">
            {{ $formatPrice(props.row.JumlahPinjaman) }}
          </q-td>
          <q-td key="JumlahPinjaman" :props="props">
            {{ props.row.Tenor }} Bulan
          </q-td>
          <q-td key="UsahaUtama" :props="props">
            {{ props.row.UsahaUtama }}
          </q-td>
          <q-td key="UsahaTambahan" :props="props">
            {{ props.row.UsahaTambahan }}
          </q-td>
          <q-td key="TanggalMulai" :props="props">
            {{ $parseDate(props.row.TanggalMulai).fullDate }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'NIK', align: 'left', label: 'NIK', field: 'NIK' },
        { name: 'Nama', align: 'left', label: 'Nama', field: 'Nama' },
        { name: 'bank', align: 'left', label: 'Nama Bank', field: 'bank' },
        { name: 'CabangBank', align: 'left', label: 'Cabang Bank', field: 'CabangBank' },
        { name: 'Kabupaten', align: 'left', label: 'Kabupaten', field: 'Kabupaten' },
        { name: 'Alamat', align: 'left', label: 'Alamat', field: 'Alamat' },
        { name: 'JumlahPinjaman', align: 'left', label: 'Jumlah Pinjaman', field: 'JumlahPinjaman' },
        { name: 'Tenor', align: 'left', label: 'Tenor', field: 'Tenor' },
        { name: 'UsahaUtama', align: 'left', label: 'UsahaUtama', field: 'UsahaUtama' },
        { name: 'UsahaTambahan', align: 'left', label: 'Usaha Tambahan', field: 'UsahaTambahan' },
        { name: 'TanggalMulai', align: 'left', label: 'Tanggal Mulai', field: 'TanggalMulai' }
      ],
      loading: false,
      dialog: false,
      activeData: null,
      activeStatus: null,
      pagination: {
        sortBy: 'nik',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getNamaBank (id) {
      const idParsed = Number(id)
      if (idParsed === 5) {
        return 'Bank Mandiri'
      } else if (idParsed === 8) {
        return 'Bank Lampung'
      } else {
        return '-'
      }
    },
    onRequest (props) {
      this.loading = true
      this.$axios.get('kur/temp-pinjaman', this.$createPaginate(props))
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
            this.pagination = res.data.paginate
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getData (props) {
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    }
  }
}
</script>
