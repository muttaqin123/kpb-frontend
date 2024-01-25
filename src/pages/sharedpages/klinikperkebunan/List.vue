<template>
  <q-page style="background: #EFF6F1">
    <div style="background: #32573F; height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  absolute-top`" style="margin-top: 55px">
      <div class="bg-white q-pa-sm row items-center">
        <q-btn class="q-mx-sm col-auto" rounded icon="mdi-arrow-left" @click="this.$router.go(-1)" dense flat />
        <span v-if="access === 'disbunprovinsi'" class="text-bold col">Dashboard Admin Provinsi (UPTD)</span>
        <span v-if="access === 'disbunkabupaten'" class="text-bold col">Dashboard Admin Kabupaten (UPTT)</span>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-md bg-white q-pa-sm q-pt-md`">
      <span v-if="url === 'klinik'" class="q-ml-sm text-h6">Data Permohonan Terbaru</span>
      <span v-if="url === 'klinik-riwayat'" class="q-ml-sm text-h6">Data Permohonan</span>
      <div v-if="url === 'klinik'" class="q-ml-sm text-body1">Silahkan tinjau permohonan</div>
      <div v-if="url === 'klinik-riwayat'" class="q-ml-sm text-body1">Riwayat Pengajuan</div>
      <div class="row">
        <div class="q-pa-sm col-4">
          <q-input v-model="tanggal" label="Tanggal" dense outlined>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                  <!-- <q-date v-model="tanggal"> -->
                  <q-date v-model="tanggal" mask="YYYY-MM-DD" @update:model-value="getData()">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="q-pa-sm col-4">
          <q-select v-if="kecamatan.items.length > 0" :class="type" v-model="selectedKecamatan" outlined @update:model-value="getData()" :options="kecamatan.items" label="Pilih Kecamatan" use-input dense clearable />
        </div>
        <div class="q-pa-sm col-4">
          <q-select v-if="komoditas.items.length > 0" label="Pilih Komoditas" :options="komoditas.items" use-input v-model="selectedKomoditas" outlined dense clearable @update:model-value="getData()"/>
        </div>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-md bg-white `">
      <q-table class="my-table" flat :rows="rows" :loading="loading" :columns="columns" row-key="id" @request="onRequest"
        :filter="filter" :pagination="pagination" v-model:pagination="pagination">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="aksi" :props="props">
              <div class="justify-center q-gutter-x-xs">
                <q-btn label="Detail" style="background-color: #153D19; color: #fff;" unelevated
                  :href="`${segment}/${props.row.id}`" />
              </div>
            </q-td>
            <q-td key="status" :props="props">
              <q-badge class="q-pa-sm" :color="getBackgroundColor(props.row.status)" :label="`${props.row.status}`" />
            </q-td>
            <q-td key="tanggal_kunjungan" :props="props">
              {{ props.row.tanggal_kunjungan }}
            </q-td>
            <q-td key="nama" :props="props">
              {{ props.row.nama }}
            </q-td>
            <q-td key="kabupaten" :props="props">
              {{ props.row.kabupaten }}
            </q-td>
            <q-td key="kecamatan" :props="props">
              {{ props.row.kecamatan }}
            </q-td>
            <q-td key="komoditas" :props="props">
              {{ props.row.komoditas }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { createToken } from '../../../boot/Token'
import { LocalStorage } from 'quasar'
export default {
  props: {
  },
  data () {
    return {
      columns: [
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'tanggal_kunjungan', align: 'left', label: 'Tanggal Permohonan', field: 'tanggal_kunjungan' },
        { name: 'nama', align: 'left', label: 'Nama', field: 'nama' },
        { name: 'kabupaten', align: 'left', label: 'Kabupaten', field: 'kabupaten' },
        { name: 'kecamatan', align: 'left', label: 'Kecamatan', field: 'kecamatan' },
        { name: 'komoditas', align: 'left', label: 'Komoditas', field: 'komoditas' }
      ],
      rows: [],
      tanggal: '',
      komoditas: {
        items: []
      },
      selectedKomoditas: null,
      access: '',
      segment: '',
      loading: false,
      url: '',
      kecamatan: {
        items: [] // Inisialisasi sebagai array kosong
      },
      selectedKecamatan: null,
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    }
  },
  async created () {
    this.$axios
      .get('/master/komoditas-opt/', createToken())
      .finally(() => this.$hide())
      .then((res) => {
        this.komoditas.items = res.data.result.map(item => ({
          label: item.komoditas,
          value: item.id
        }))
      })
      .catch(() => this.$commonErrorNotif())
    this.$axios
      .get('/areas/kecamatan/' + LocalStorage.getItem('datauser').member.reg_regencies.id)
      .finally(() => this.$hide())
      .then((res) => {
        console.log(res.data.result)
        this.kecamatan.items = res.data.result.map(item => ({
          label: item.name,
          value: item.id
        }))
      })
      .catch(() => this.$commonErrorNotif())
    this.getData()
    this.getURLSegment()
  },
  watch: {
    // Watch for changes in the route
    '$route' () {
      // Call getData when the route changes
      this.getData()
      // Call getURLSegment if it depends on the route as well
      this.getURLSegment()
    }
  },
  methods: {
    getURLSegment () {
      const pathArray = window.location.pathname.split('/')
      // Assuming the structure is always like /disbun-kabupaten/klinik
      // and you want to get the second segment (index 1, as arrays are zero-indexed)
      this.segment = `${pathArray[1]}/${pathArray[2]}`
    },
    onRequest (props) {
      this.loading = true
      this.access = this.$getProfile().member.users_login.access
      const pathArray = window.location.pathname.split('/')[2]
      this.url = pathArray
      const params = {
        tanggal_kunjungan: this.tanggal,
        kecamatan: this.selectedKecamatan ? this.selectedKecamatan.label : '',
        komoditas: this.selectedKomoditas ? this.selectedKomoditas.label : ''
      }
      const terbaruEndpoint = `klinik/getlistklinik/${this.access}/terbaru`
      const riwayatEndpoint = `klinik/getlistklinik/${this.access}/riwayat`

      this.$axios.get(pathArray === 'klinik-riwayat' ? riwayatEndpoint : terbaruEndpoint, this.$createPaginate(props, params))
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
            this.pagination = res.data.paginate
          }
        }).catch(() => this.$commonErrorNotif())
    },
    async getData () {
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    toDetail (id) {
      this.$router.push({ name: `klinikDetail${this.access}`, params: { id } })
    },
    getBackgroundColor (status) {
      switch (status) {
        case 'Belum Dijawab':
          return 'negative'
        case 'Terjawab':
          return 'positive'
        case 'Verifikasi UPTD':
          return 'yellow-8'
        default:
          return '' // Default class or no class
      }
    }
  }
}
</script>
<style lang="sass">
.my-table
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #153D19
    color: #fff
</style>
