<template>
  <q-page padding>
    <q-card class="q-mb-md" flat>
      <q-card-section>
        Filter Data
        <div class="row q-col-gutter-x-md">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model="filter"
              label="Cari Nama / NIK"
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-kabupaten
              :auto-load="!kab"
              :withAction="!kec"
              :action="getData"
              :readonly="kab"
              :kec="$getProfile()?.member?.reg_regencies"
              :loadKec="!kec"
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-kecamatan
              :auto-load="kec"
              :action="getData"
              :readonly="kec"
              :desa="$getProfile()?.member?.reg_districts"
              :loadDesa="kec"
              withAction
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-desa
              :action="getData"
              withAction
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-select
                :options="listSubsektor"
                v-model="subsektor"
                label="Sektor"
                option-label="sektor"
                option-value="id"
                @update:model-value="this.getData()"
                :readonly="sektor"
              />
          </div>
          <!-- <div class="col-md-4 col-sm-6 col-xs-12">
            <q-input v-model="date" label="Filter Tanggal">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" mask="YYYY-MM-DD" @update:model-value="getData()">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div> -->
        </div>
      </q-card-section>
    </q-card>
    <q-table
      title="Ada yang gagal nih tolong diperbaiki yaa....."
      flat
      class="q-mb-md"
      :rows="dataError"
      :columns="columnsError"
      row-key="nik"
      v-if="adaError"
    >
      <template v-slot:top-right>
        <div class="q-gutter-x-sm">
          <q-btn
            label="Export"
            unelevated
            outline
            no-caps
            color="primary"
            @click="exportData()"
          />
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nik" :props="props">
            {{ props.row.nik }}
          </q-td>
          <q-td key="keterangan" :props="props">
            {{ props.row.keterangan }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      class="my-sticky-header-column-table"
      title="Data Pengajuan Asuransi BPJS"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      @request="onRequest"
      row-key="nama"
      :filter="filter"
      :pagination="pagination"
      v-model:pagination="pagination"
    >
      <template v-slot:top-right>
        <div class="row q-gutter-sm">
          <q-space/>
          <q-btn label="Import BPJS" @click="this.upload = !this.upload" no-caps icon="upload_file" color="primary"/>
          <q-btn label="Export BPJS" @click="exportBPJS()" no-caps icon="file_download" color="primary"/>
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nama" :props="props">
            {{ props.row.nama }}
          </q-td>
          <q-td key="nik" :props="props">
            {{ props.row.nik }}
          </q-td>
          <q-td key="bpjs_nokartu" :props="props">
            {{ props.row.bpjs_nokartu }}
          </q-td>
          <q-td key="bpjs_jenis_pekerjaan" :props="props">
            {{ props.row.sektor ?? '-' }}
          </q-td>
          <q-td key="bpjs_jenis_peserta" :props="props">
            {{ props.row.bpjs_jenis_peserta }}
          </q-td>
          <q-td key="bpjs_penghasilan" :props="props">
            {{ props.row.bpjs_penghasilan }}
          </q-td>
          <q-td key="bpjs_program" :props="props">
            {{ props.row.bpjs_program }}
          </q-td>
          <q-td key="periode_pendaftaran" :props="props">
            {{ props.row.periode_pendaftaran }}
          </q-td>
          <q-td key="bpjs_tmt" :props="props">
            {{ $parseDate(props.row.bpjs_tmt).fullDate }}
          </q-td>
          <q-td key="bpjs_lokasi_pekerjaan" :props="props">
            {{ props.row.bpjs_lokasi_pekerjaan }}
          </q-td>
          <q-td key="kur_setting" :props="props">
            {{ props.row.status }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Detail" unelevated color="dark" :to="{ name: detailRoute, params: {id: props.row.bpjs_id}}"/>
              <q-btn label="Tolak" :disable="props.row.bpjs_status >= statusOn" color="negative" unelevated @click="openDialog(props.row.bpjs_id, statusTolak)"/>
              <q-btn label="Konfirmasi" :disable="props.row.bpjs_status >= statusOn" unelevated @click="openDialog(props.row.bpjs_id, statusKonfirmasi)" color="warning"/>
            </div>
          </q-td>
        </q-tr>
      </template>

    </q-table>
    <q-dialog v-model="upload">
      <div class="q-pa-md bg-white" style="width: 100%">
        <q-form class="q-gutter-sm" @submit="onSubmit">
          <span class="text-h5 q-mt-sm">Upload BPJS</span>
          <q-file outlined v-model="fileImport" class="q-mt-sm" label="File BPJS">
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
  </q-page>
</template>
<script>
import getStatus from 'src/helper/GetStatusPuber'
// import * as helper from 'src/helper/service/SubsektorKomoditas'
import parseArea from 'src/helper/ParseArea'
export default {
  props: {
    detailRoute: String,
    statusKonfirmasi: String,
    statusTolak: String,
    endPoint: String,
    statusOn: Number,
    kab: {
      type: Boolean,
      default: false
    },
    kec: {
      type: Boolean,
      default: false
    },
    sektor: {
      type: Boolean,
      default: false
    }
    // historyBtn: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      rows: [],
      date: '',
      listSubsektor: [
        'Pertanian', 'Perkebunan', 'Peternakan', 'Perikanan', 'Kehutanan'
      ],
      dataError: [],
      subsektor: null,
      model: null,
      parseArea,
      fileImport: null,
      upload: false,
      columns: [
        { name: 'nama', align: 'left', label: 'Nama', field: 'nama' },
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'bpjs_nokartu', align: 'left', label: 'No Kartu BPJS', field: 'bpjs_nokartu' },
        { name: 'bpjs_jenis_pekerjaan', align: 'left', label: 'Jenis Sektor', field: 'bpjs_jenis_pekerjaan' },
        { name: 'bpjs_jenis_peserta', align: 'left', label: 'Jenis Peserta', field: 'bpjs_jenis_peserta' },
        { name: 'bpjs_penghasilan', align: 'left', label: 'Penghasilan', field: 'bpjs_penghasilan' },
        { name: 'bpjs_program', align: 'left', label: 'Program', field: 'bpjs_program' },
        { name: 'periode_pendaftaran', align: 'left', label: 'Periode Pendaftaran', field: 'periode_pendaftaran' },
        { name: 'bpjs_tmt', align: 'left', label: 'Terhitung Tanggal', field: 'bpjs_tmt' },
        { name: 'bpjs_lokasi_pekerjaan', align: 'left', label: 'Lokasi Pekerjaan', field: 'bpjs_lokasi_pekerjaan' },
        { name: 'kur_setting', align: 'left', label: 'Status', field: 'kur_setting' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      pagination: {
        sortBy: 'periode_pendaftaran',
        descending: false,
        page: 1,
        rowsPerPage: 50,
        rowsNumber: 0
      },
      loading: false,
      dialog: false,
      editMode: false,
      adaError: false,
      image: null,
      filter: '',
      show_filter: false
    }
  },
  async created () {
    // await this.$resetArea()
    if (this.kab) {
      this.$store.commit('area/updateKabupaten', this.$getProfile()?.member?.reg_regencies)
    }
    if (this.kec) {
      this.$store.commit('area/updateKecamatan', this.$getProfile()?.member?.reg_districts)
    }
    const akses = this.$getProfile().member.users_login.access
    if (this.sektor) {
      if (akses.match('/tph/')) {
        this.subsektor.sektor = 'Pertanian'
      } else if (akses.match('/disbun/')) {
        this.subsektor.sektor = 'Perkebunan'
      }
    }
    this.getData()
    // this.getSubsektor()
  },
  methods: {
    getStatus,
    onRequest (props) {
      // console.log(props)
      this.loading = true
      const params = {
        kab: this.$store.state.area.kabupaten ? this.$store.state.area.kabupaten.name : '',
        kec: this.$store.state.area.kecamatan ? this.$store.state.area.kecamatan.name : '',
        desa: this.$store.state.area.desa ? this.$store.state.area.desa.name : '',
        sektor: this.subsektor ? this.subsektor : ''
        // tanggal: this.date
      }
      this.$axios.get(this.endPoint, this.$createPaginate(props, params))
        .finally(() => { this.loading = false })
        .then(res => {
          // console.log(res)
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
            this.pagination = res.data.paginate
            // // console.log(this.pagination)
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getData () {
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter
      })
      // this.loading = true
      // this.$axios.get(this.endPoint, this.$createToken())
      //   .finally(() => { this.loading = false })
      //   .then(res => {
      //     // console.log(res)
      //     if (this.$parseResponse(res.data, false)) {
      //       this.rows = res.data.result
      //     }
      // }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.adaError = false
      this.dataError = []
      this.$showLoading()
      const formData = new FormData()
      formData.append('fileExcel', this.fileImport)
      this.$axios.post('/asuransi/export-bpjs', formData, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          if (res.data.status) {
            if (res.data.dataError.length > 0) {
              this.adaError = true
              this.dataError = res.data.dataError
            }
            this.upload = false
            this.$notif(res.data.message, 'positive')
            this.getData()
          } else {
            this.$notif(res.data.message, 'negative')
          }
        }).catch(() => this.$commonErrorNotif())
    },
    openDialog (id, status) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin?',
        cancel: true,
        prompt: {
          model: '',
          label: 'Tambahkan Keterangan',
          type: 'text' // optional
        },
        persistent: true
      }).onOk(ket => {
        const body = {
          id_status: status,
          keterangan: ket,
          id_user: this.$getProfile().member.users_login.id_users
        }
        this.$showLoading()
        this.$axios.put(`asuransi/acc-bpjs/${id}`, body, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    },
    exportBPJS () {
      this.$showLoading()
      const params = {
        filter: this.filter,
        kab: this.$store.state.area.kabupaten ? this.$store.state.area.kabupaten.name : '',
        kec: this.$store.state.area.kecamatan ? this.$store.state.area.kecamatan.name : '',
        desa: this.$store.state.area.desa ? this.$store.state.area.desa.name : '',
        sektor: this.subsektor ? this.subsektor : ''
        // tanggal: this.date
      }
      // console.log(params)
      this.$axios.get('asuransi/fullbpjs', {
        params: params
      })
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          const rows = res.data.result
          const header = ['Nama', 'NIK', 'No. Kartu BPJS', 'Jenis Sektor', 'Jenis Peserta', 'Penghasilan', 'Program', 'Periode', 'Terhitung Tanggal', 'Lokasi Pekerjaan', 'Status']
          const data = rows.map(row => [
        `${row.nama}`,
        `${row.nik}`,
        `${row.bpjs_nokartu}`,
        `${row.sektor ?? '-'}`,
        `${row.bpjs_jenis_peserta ?? '-'}`,
        `${row.bpjs_penghasilan ?? '-'}`,
        `${row.bpjs_program ?? '-'}`,
        `${row.periode_pendaftaran ?? '-'}`,
        this.$parseDate(row.bpjs_tmt).fullDate,
        `${row.bpjs_lokasi_pekerjaan ?? '-'}`,
        `${row.status ?? '-'}`
          ])

          const headerRow = header.join(';')
          const dataRows = data.map(row => row.join(';'))

          const csvData = [headerRow, ...dataRows].join('\n')

          this.$exportToCsv('DataPengajuannAsuransi.csv', csvData)
        }).catch(() => this.$commonErrorNotif())
    },
    exportData () {
      const content = [
        'NIK;Keterangan'
      ].concat(
        this.dataError.map(row => {
          return `'${row.nik};${row.keterangan}`
        })
      ).join('\r\n')

      this.$exportToCsv('DataPengajuannAsuransi.csv', content)
    }
    // getSubsektor () {
    //   helper.getSubsektor(this.$createToken())
    //     .then(res => {
    //       if (this.$parseResponse(res.data, false)) {
    //         this.listSubsektor = res.data.result
    //       }
    //     }).catch(() => this.$commonErrorNotif())
    // }
  }
}
</script>

<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 500px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 100%

  td:first-child
    background: #fff
    /* bg color is important for td; just specify one */

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    left: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
