<template>
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
    title="Data Pengajuan KUR Petani"
    flat
    :rows="rows"
    :loading="loading"
    :columns="columns"
    row-key="id"
    @request="onRequest"
    :filter="filter"
    :pagination="pagination"
    v-model:pagination="pagination"
  >
    <template v-slot:top-right>
      <div class="row q-gutter-sm">
        <q-space/>
        <!-- <q-btn label="Import Kur" @click="this.upload = !this.upload" no-caps icon="upload_file" color="primary"/> -->
        <q-btn label="Export Kur" @click="exportKur()" no-caps icon="file_download" color="primary"/>
      </div>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="nama_lengkap" :props="props">
          {{ props.row.nama }}
        </q-td>
        <q-td key="keperluan_kur" :props="props">
          {{ props.row.keperluan_kur }}
        </q-td>
        <q-td key="jumlah" :props="props">
          {{ $formatPrice(props.row.jumlah) }}
        </q-td>
        <q-td key="jangka_waktu" :props="props">
          {{ props.row.jangka_waktu }} Bulan
        </q-td>
        <q-td key="jangka_waktu" :props="props">
          {{ props.row.nama_bank }}
        </q-td>
        <q-td key="jangka_waktu" :props="props">
          {{ props.row.sektor_usaha }}
        </q-td>
        <q-td key="status_pengajuan" :props="props">
          {{ props.row.status }}
        </q-td>
        <q-td key="aksi" :props="props">
          <div class="justify-center q-gutter-x-xs">
            <q-btn label="Riwayat Pengajuan" outline color="dark" unelevated :to="{name: detailRoute, params: { id: props.row.id }}"/>
            <q-btn label="Detail" color="dark" unelevated :to="{name: detailRoute, params: { id: props.row.id }}"/>
            <q-btn label="Tolak" :disable="props.row.status_pengajuan >= statusOn" color="negative" unelevated @click="openDialog(props.row, statusTolak)"/>
            <q-btn label="Konfirmasi" :disable="props.row.status_pengajuan >= statusOn" color="warning" unelevated @click="openDialog(props.row, statusKonfirmasi)"/>
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <q-dialog v-model="dialog" persistent v-if="dialog">
    <q-card style="min-width: 450px">
      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="text-h6">Ubah Status</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            v-model="activeStatus"
            label="Pilih Status"
            :rules="[
              val => val !== null || 'Mohon Pilih'
            ]"
            :options="listStatus"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Batal" v-close-popup />
          <q-btn color="primary" label="Simpan" type="submit"/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script>
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
    },
    historyBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filter: '',
      listSubsektor: [
        'Pertanian', 'Perkebunan', 'Peternakan', 'Perikanan', 'Kehutanan'
      ],
      pagination: {
        sortBy: 'periode_pendaftaran',
        descending: false,
        page: 1,
        rowsPerPage: 50,
        rowsNumber: 0
      },
      subsektor: null,
      rows: [],
      columns: [
        // { name: 'bank', align: 'left', label: 'Nama Bank', field: 'bank' },
        { name: 'nama_lengkap', align: 'left', label: 'Nama Lengkap', field: 'nama_lengkap' },
        { name: 'keperluan_kur', align: 'left', label: 'Keperluan Kur', field: 'keperluan_kur' },
        { name: 'jumlah', align: 'left', label: 'Jumlah', field: 'jumlah' },
        { name: 'jangka_waktu', align: 'left', label: 'Jangka Waktu', field: 'jangka_waktu' },
        { name: 'bank', align: 'left', label: 'Bank', field: 'bank' },
        { name: 'sktor', align: 'left', label: 'Sektor Usaha', field: 'sektor' },
        { name: 'status_pengajuan', align: 'left', label: 'Status Pengajuan', field: 'status_pengajuan' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      activeData: null,
      activeStatus: null
    }
  },
  created () {
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
  },
  methods: {
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
      //     console.log(res)
      //     if (this.$parseResponse(res.data, false)) {
      //       this.rows = res.data.result
      //     }
      //   }).catch(() => this.$commonErrorNotif())
    },
    openDialog (data, status) {
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
        this.$axios.put(`kur/acc/${data.id}`, body, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    },
    exportKur () {
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
      this.$axios.get('kur/get-export', {
        params: params
      })
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          const rows = res.data.result
          const header = ['Nama', 'NIK', 'Nama Bank', 'Jumlah Pengajuan', 'Keperluan Kur', 'Jangka Waktu', 'Sektor Usaha', 'Status Pengajuan']
          const data = rows.map(row => [
        `${row.nama}`,
        `${row.nik}`,
        `${row.nama_bank}`,
        this.$formatPrice(row.jumlah),
        `${row.keperluan_kur ?? '-'}`,
        `${row.jangka_waktu ?? '-'} Bulan`,
        `${row.sektor_usaha ?? '-'}`,
        `${row.status ?? '-'}`
          ])

          const headerRow = header.join(';')
          const dataRows = data.map(row => row.join(';'))

          const csvData = [headerRow, ...dataRows].join('\n')

          this.$exportToCsv('DataPengajuannKur.csv', csvData)
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
