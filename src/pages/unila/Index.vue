<template>
  <q-page style="background: #EFF6F1">
    <div style="background: #32573F; height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  absolute-top`" style="margin-top: 55px">
      <div class="bg-white q-pa-sm row items-center">
        <span class="text-bold col">Dashboard Universitas Lampung</span>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-md bg-white q-pa-sm q-pt-md`">
      <div class="q-ml-sm text-h6">Data Artikel</div>
      <div  class="q-ml-sm text-body1">Pengelola Artikel Klinik Perkebunan</div>
      <div class="q-pa-sm">
          <q-btn href="unila/tambah" label="Tambah Artikel" style="background-color: #153D19; color: #fff;" unelevated />
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
              <div class="row q-gutter-x-xs">
                <q-btn label="Detail" style="background-color: #153D19; color: #fff;" unelevated :href="`unila/detail/${props.row.id}`"/>
                <q-btn label="Edit" style="background-color: #FFB800; color: #fff;" unelevated :href="`unila/edit/${props.row.id}`"/>
                <q-btn label="Hapus" style="background-color: #FF0000; color: #fff;" unelevated @click="onDelete(props.row.id)" />
              </div>
            </q-td>
            <q-td key="created_at" :props="props">
              {{ $parseDate(props.row.created_at).fullDate }}
            </q-td>
            <q-td key="judul" :props="props">
              {{ props.row.judul }}
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
        { name: 'created_at', align: 'left', label: 'Tanggal Upload', field: 'created_at' },
        { name: 'judul', align: 'left', label: 'Judul', field: 'judul' }
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
      const pathArray = window.location.pathname.split('/')[2]
      this.url = pathArray

      this.$axios.get('klinik/artikels')
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onDelete (id) {
      this.loading = true
      this.$axios.delete(`klinik/artikel/${id}`)
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.removeDeletedItem(id)
          }
        }).catch(() => this.$commonErrorNotif())
    },
    removeDeletedItem (id) {
      this.rows = this.rows.filter(item => item.id !== id)
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
