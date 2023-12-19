<template>
  <q-page style="background: #EFF6F1">
    <div style="background: #32573F; height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  absolute-top`" style="margin-top: 55px">
      <div class="bg-white q-pa-sm row items-center">
        <q-btn class="q-mx-sm col-auto" rounded icon="mdi-arrow-left" @click="this.$router.go(-1)" dense flat/>
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
          <q-input  v-model="tanggal" label="Tanggal" mask="date" :rules="['tanggal']" dense outlined>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="tanggal">
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
          <area-kecamatan dense outline />
        </div>
        <div class="q-pa-sm col-4">
          <q-select
              label="Komoditas"
              :options="option_intensitas"
              v-model="komoditas"
              outlined
              dense
              :rules="[
                val => (val != '')|| 'Pilih Intensitas Serangan'
              ]"/>
        </div>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-md bg-white `">
      <q-table
        class="my-table"
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
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="aksi" :props="props">
              <div class="justify-center q-gutter-x-xs">
                <q-btn label="Detail" style="background-color: #153D19; color: #fff;" unelevated :href="`${segment}/${props.row.id}`"/>
              </div>
            </q-td>
            <q-td key="status" :props="props">
              <q-badge class="q-pa-sm" :color="getBackgroundColor(props.row.status)" :label="`${props.row.status}`" />
            </q-td>
            <q-td key="tanggal_permohonan" :props="props">
              {{ props.row.tanggal_permohonan }}
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
export default {
  data () {
    return {
      columns: [
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'tanggal_permohonan', align: 'left', label: 'Tanggal Permohonan', field: 'tanggal_permohonan' },
        { name: 'nama', align: 'left', label: 'Nama', field: 'nama' },
        { name: 'kabupaten', align: 'left', label: 'Kabupaten', field: 'kabupaten' },
        { name: 'kecamatan', align: 'left', label: 'Kecamatan', field: 'kecamatan' },
        { name: 'komoditas', align: 'left', label: 'Komoditas', field: 'komoditas' }
      ],
      rows: [],
      tanggal: '2023/01/01',
      komoditas: '',
      access: '',
      segment: '',
      loading: false,
      url: ''
    }
  },
  async created () {
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
    async getData () {
      this.loading = true
      this.access = this.$getProfile().member.users_login.access
      const terbaruEndpoint = `klinik/getlistklinik/${this.access}/terbaru`
      const riwayatEndpoint = `klinik/getlistklinik/${this.access}/riwayat`
      const pathArray = window.location.pathname.split('/')[2]
      this.url = pathArray

      this.$axios.get(pathArray === 'klinik-riwayat' ? riwayatEndpoint : terbaruEndpoint, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
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
