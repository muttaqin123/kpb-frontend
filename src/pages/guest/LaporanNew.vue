<template>
  <q-page>
    <q-img src="img/landingpage/laporan.png">
      <div class="absolute-full text-white flex flex-center">
        <div class="q-mx-xl q-px-xl text-white text-center column q-gutter-sm">
          <span class="text-h3 text-weight-bold">Laporan Data Realisasi</span>
          <span class="text-body">Kartu Petani Berjaya (e-KPB)</span>
        </div>
      </div>
    </q-img>
    <div :class="`q-mt-lg column ${this.$q.screen.xs ? 'q-pa-xs' : 'q-px-xl q-py-md'}`">
      <div class="column flex flex-center">
        <span class="text-h5">Data Penerima Beasiswa</span>
        <q-separator class="q-my-sm" color="grey-9" style="width: 20%;"/>
        <q-table
          :style="`width: ${this.$q.screen.xs ? this.$q.screen.width : this.$q.screen.width - 100}px;`"
          title="Data Penerima"
          :rows="rowBeasiswa"
          :columns="columnBeasiswa"
          flat
          row-key="npm"
          @request="onRequestBeasiswa"
          :loading="loadingBeasiswa"
          :pagination="paginationBeasiswa"
          v-model:pagination="paginationBeasiswa"
        >
          <template v-slot:top-right>
            <div class="row q-gutter-sm">
              <q-btn
                label="Export Penerima Beasiswa"
                unelevated
                color="primary"
                no-caps
                @click="exportPenerima"
              />
            </div>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="npm" :props="props">
                {{ props.row.npm }}
              </q-td>
              <q-td key="nama" :props="props">
                {{ props.row.nama }}
              </q-td>
              <q-td key="universitas" :props="props">
                {{ props.row.universitas ?? '-' }}
              </q-td>
              <q-td key="fakultas" :props="props">
                {{ props.row.fakultas ?? '-' }}
              </q-td>
              <q-td key="prodi" :props="props">
                {{ props.row.prodi ?? '-' }}
              </q-td>
              <q-td key="tanggal_masuk" :props="props">
                {{ props.row.tanggal_masuk }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      loadingBeasiswa: false,
      filterBeasiswa: '',
      universitas: '',
      fakultas: '',
      tahun: '',
      rowBeasiswa: [],
      columnBeasiswa: [
        { name: 'npm', align: 'left', label: 'NPM', field: 'npm' },
        { name: 'nama', align: 'left', label: 'Nama', field: 'nama' },
        { name: 'universitas', align: 'left', label: 'Universitas', field: 'universitas' },
        { name: 'fakultas', align: 'left', label: 'Fakultas', field: 'fakultas' },
        { name: 'prodi', align: 'left', label: 'Prodi', field: 'prodi' },
        { name: 'tanggal_masuk', align: 'left', label: 'Tgl. Masuk', field: 'tanggal_masuk' }
      ],
      paginationBeasiswa: {
        sortBy: 'nik',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    }
  },
  created () {
    this.getDataBeasiswa()
  },
  methods: {
    getDataBeasiswa () {
      this.onRequestBeasiswa({
        pagination: this.paginationBeasiswa
      })
    },
    onRequestBeasiswa (props) {
      this.loadingBeasiswa = true
      const params = {
        filter: this.filterBeasiswa,
        universitas: this.universitas,
        fakultas: this.fakultas,
        tahun: this.tahun
      }
      const { page, rowsPerPage, rowsNumber } = props.pagination
      const resultParams = {
        page: Number(page),
        perpage: rowsPerPage === 0 ? rowsNumber : rowsPerPage,
        ...params
      }
      console.log(resultParams)
      this.$axios.get('beasiswa/getPenerima', {
        params: resultParams
      }).finally(() => { this.loadingBeasiswa = false })
        .then(res => {
          console.log(res)
          if (this.$parseResponse(res.data, false)) {
            this.rowBeasiswa = res.data.result.data
            this.paginationBeasiswa = res.data.paginate
          } else {
            this.rows = []
          }
        }).catch(() => this.$commonErrorNotif())
    },
    exportPenerima () {
      this.$showLoading()
      const params = {
        filter: this.filter,
        universitas: this.universitas,
        fakultas: this.fakultas,
        tahun: this.tahun
      }
      this.$axios.get('beasiswa/export-beasiswa', {
        params: params
      }).finally(() => this.$hide())
        .then(res => {
          const rows = res.data.result
          const header = ['NPM', 'Nama', 'Universitas', 'Fakultas', 'Prodi', 'Tanggal Masuk', 'Tanggal Selesai', 'Alamat', 'Tahun']
          const data = rows.map(row => [
        `${row.npm}`,
        `${row.nama}`,
        `${row.universitas}`,
        `${row.fakultas ?? '-'}`,
        `${row.prodi ?? '-'}`,
        `${row.tanggal_masuk ?? '-'}`,
        `${row.tanggal_selesai ?? '-'}`,
        `${row.alamat ?? '-'}`,
        `${row.tahun ?? '-'}`
          ])

          const headerRow = header.join(';')
          const dataRows = data.map(row => row.join(';'))

          const csvData = [headerRow, ...dataRows].join('\n')

          this.$exportToCsv('DataPenerimaanBeasiswa.csv', csvData)
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
