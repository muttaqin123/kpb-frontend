<template>
  <q-page padding>
    <q-table
      title="Data Distributor"
      :rows="rows"
      :columns="columns"
      flat
      :loading="loading"
      row-key="nama"
    >
      <template v-slot:top-right>
        <q-btn
          label="Tambah Dinas"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nik" :props="props">
            {{ props.row.nik }}
          </q-td>
          <q-td key="kode_distributor" :props="props">
            {{ props.row.kode_distributor }}
          </q-td>
          <q-td key="nama_distributor" :props="props">
            {{ props.row.nama_distributor }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="List Kios" :to="{name: 'listKiosDistriSuperAdmin', params: { nik: props.row.nik, kode: props.row.kode_distributor }}" color="warning" unelevated/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script>
const model = () => {
  return {
    nik: null,
    nama: null,
    id_prov: '18',
    id_kab: '1871',
    id_kec: '187101',
    id_desa: '1871011003',
    id: null,
    access: null
  }
}
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'kode_distributor', align: 'left', label: 'Kode Distributor', field: 'kode_distributor' },
        { name: 'nama_distributor', align: 'left', label: 'Nama Distributor', field: 'nama_distributor' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      form: model(),
      editMode: false,
      tipeDinas: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getKab () {
      this.$showLoading()
      this.$axios
        .get('/areas/kabupaten/18')
        .finally(() => this.$hide())
        .then((res) => {
          if (this.$parseResponse(res.data, false)) {
            this.$store.commit('area/updateListKabupaten', res.data.result)
            this.$store.commit('area/updateKabupaten', null)
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    getData () {
      this.loading = true
      this.$axios.get('master/pubers-distri', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
