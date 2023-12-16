<template>
  <q-page class="q-pa-md">
    <q-card class="q-mb-md" flat>
      <q-card-section>
        <span class="text-body">Filter Data</span>
        <div class="row q-col-gutter-x-md">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-input
              outlined
              v-model="filter"
              label="Cari Nama / NIK"
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-select
              v-model="universitas"
              outlined
              :options="optionUniversitas"
              label="Universitas"
              @update:model-value="getData"
              use-input
              clearable
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-select
              v-model="tahun"
              outlined
              :options="optionTahun"
              label="Tahun"
              @update:model-value="getData"
              use-input
              clearable
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-table
      class="my-sticky-header-column-table"
      title="Data Penerima"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      flat
      row-key="npm"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
      v-model:pagination="pagination"
    >
      <template v-slot:top-right>
        <div class="row q-gutter-sm">
          <q-btn
            label="Import Penerima Beasiswa"
            unelevated
            color="primary"
            no-caps
            @click="this.upload = !this.upload"
          />
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
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-sm">
              <q-btn @click="detailPopup(props.row)" label="Detail" color="primary" no-caps unelevated/>
              <q-btn @click="deleteBeasiswa(props.row)" label="Hapus" color="negative" no-caps unelevated/>
            </div>
          </q-td>
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
    <q-dialog v-model="upload">
      <div class="q-pa-md bg-white" style="width: 100%">
        <q-form class="q-gutter-sm" @submit="onSubmit">
          <span class="text-h5 q-mt-sm">Upload File Penerima Beasiswa</span>
          <q-file outlined v-model="fileImport" class="q-mt-sm" label="File Penerima Beasiswa">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <div class="row">
            <q-space/>
            <q-btn label="Import" no-caps color="primary" type="submit"/>
          </div>
        </q-form>
      </div>
    </q-dialog>
    <q-dialog v-model="dialog">
      <div class="q-pa-md bg-white q-gutter-sm column" style="width: 100%">
        <span class="text-h5 text-weight-bold q-mt-sm">Data Mahasiswa</span>
        <span class="text-body">NPM</span>
        <span class="text-h6 text-weight-bold">{{ activeData?.npm }}</span>
        <span class="text-body">Nama</span>
        <span class="text-h6 text-weight-bold">{{ activeData?.nama }}</span>
        <span class="text-body">Alamat</span>
        <span class="text-h6 text-weight-bold">{{ activeData?.alamat }}</span>
        <span class="text-body">Universitas</span>
        <span class="text-h6 text-weight-bold">{{ activeData?.universitas }}</span>
        <span class="text-body">Fakultas</span>
        <span class="text-h6 text-weight-bold">{{ activeData?.fakultas }}</span>
        <span class="text-body">Prodi</span>
        <span class="text-h6 text-weight-bold">{{ activeData?.prodi }}</span>
        <span class="text-body">Tanggal Masuk</span>
        <span class="text-h6 text-weight-bold">{{ activeData?.tanggal_masuk }}</span>
        <span class="text-body">Tanggal Selesai</span>
        <span class="text-h6 text-weight-bold">{{ activeData?.tanggal_selesai }}</span>
      </div>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      filter: '',
      upload: false,
      dialog: false,
      universitas: '',
      fakultas: '',
      tahun: '',
      fileImport: null,
      activeData: {},
      optionUniversitas: [],
      optionFakultas: [],
      optionTahun: [],
      rows: [],
      columns: [
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' },
        { name: 'npm', align: 'left', label: 'NPM', field: 'npm' },
        { name: 'nama', align: 'left', label: 'Nama', field: 'nama' },
        { name: 'universitas', align: 'left', label: 'Universitas', field: 'universitas' },
        { name: 'fakultas', align: 'left', label: 'Fakultas', field: 'fakultas' },
        { name: 'prodi', align: 'left', label: 'Prodi', field: 'prodi' },
        { name: 'tanggal_masuk', align: 'left', label: 'Tgl. Masuk', field: 'tanggal_masuk' }
      ],
      pagination: {
        sortBy: 'nik',
        descending: false,
        page: 1,
        rowsPerPage: 50,
        rowsNumber: 0
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    detailPopup (row) {
      this.activeData = row
      this.dialog = !this.dialog
    },
    getData () {
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    onRequest (props) {
      this.loading = true
      const params = {
        filter: this.filter,
        universitas: this.universitas,
        fakultas: this.fakultas,
        tahun: this.tahun
      }
      this.$axios.get('beasiswa/getPenerima', this.$createPaginate(props, params))
        .finally(() => { this.loading = false })
        .then(res => {
          console.log(res)
          if (this.$parseResponse(res.data, false)) {
            this.optionUniversitas = res.data.result.universitas
            this.optionTahun = res.data.result.tahun
            this.rows = res.data.result.data
            this.pagination = res.data.paginate
          } else {
            this.rows = []
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.adaError = false
      this.dataError = []
      this.$showLoading()
      const formData = new FormData()
      formData.append('fileExcel', this.fileImport)
      this.$axios.post('/beasiswa/import-beasiswa', formData, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          if (res.data.status) {
            this.upload = false
            this.fileImport = null
            this.$notif(res.data.message, 'positive')
            this.getData()
          } else {
            this.$notif(res.data.message, 'negative')
          }
        }).catch(() => this.$commonErrorNotif())
    },
    deleteBeasiswa (data) {
      this.$q.dialog({
        title: 'Alert',
        cancel: true,
        message: `Apakah anda yakin menghapus ${data.nama} ?`
      }).onOk(() => {
        // this.$notif('Dalam Tahap Pengembangan', 'positive')
        this.$showLoading()
        this.$axios.delete(`beasiswa/deletePenerima/${data.id}`, this.$createToken())
          .finally(() => this.$hide())
          .then((res) => {
            if (res.data.status) {
              this.getData()
              this.$notif(res.data.message, 'positive')
            } else {
              this.$notif(res.data.message, 'negative')
            }
          })
          .catch(() => this.$commonErrorNotif())
      })
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
    // filterProv (val, update) {
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     console.log(needle)
    //     // this.listProv = listProv.filter(
    //     //   (v) => v.nama.toLowerCase().indexOf(needle) > -1
    //     // )
    //   })
    // }
  }
}
</script>
