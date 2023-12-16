<template>
  <q-page class="q-pa-md">
    <q-table
      class="my-sticky-header-column-table"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      flat
      row-key="nik"
      :pagination="initialPagination"
    >
      <template v-slot:top>
        <q-input
          outlined
          dense
          v-model="filter"
          label="Cari Nama / NIK"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn :to="{name: 'listkegiatanDutaMember', params: {nik: props.row.nik}}" no-caps label="Lihat Kegiatan" color="primary" unelevated/>
            </div>
          </q-td>
          <q-td key="jumlah" :props="props">
            {{ props.row.jumlah }}
          </q-td>
          <q-td key="nik" :props="props">
            {{ props.row.nik }}
          </q-td>
          <q-td key="nama" :props="props">
            {{ props.row.nama }}
          </q-td>
          <q-td key="area" :props="props">
            {{ parseArea(props.row) }}
          </q-td>
          <q-td key="alamat" :props="props">
            {{ props.row.alamat }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script>
import parseArea from '../../../helper/ParseArea'
export default {
  data () {
    return {
      initialPagination: {
        rowsPerPage: 20
      },
      filter: '',
      columns: [
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' },
        { name: 'jumlah', align: 'right', label: 'Jumlah Postingan', field: 'jumlah' },
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'nama', align: 'left', label: 'Nama Member', field: 'nama' },
        { name: 'area', align: 'left', label: 'Area', field: 'area' },
        { name: 'alamat', align: 'left', label: 'Alamat', field: 'alamat' }
      ],
      rows: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    parseArea,
    getData () {
      this.$showLoading()
      this.$axios.get('duta/getAllActivity', this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          this.rows = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
