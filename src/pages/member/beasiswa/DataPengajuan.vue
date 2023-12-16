<template>
  <q-page padding>
    <q-table
      flat
      :rows="data"
      :columns="columns"
      row-key="nama_beasiswa"
      :filter="filter"
    >
      <template v-slot:top-left>
        <div class="q-ma-xs row">
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Cari Nama Calon Mahasiswa">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="aksi" :props="props">
            <q-btn label="Detail" :to="{ name: 'detailPengajuanBeasiswa', params: { id: props.row.id_master_beasiswa } }" no-caps color="amber" outline/>
          </q-td>
          <q-td key="status" :props="props">
            <q-badge v-if="props.row.status_pengajuan === 0" color="warning">
              Sedang Di Ajukan
            </q-badge>
            <q-badge v-if="props.row.status_pengajuan === 1" color="info">
              Sudah Berhasil
            </q-badge>
            <q-badge v-if="props.row.status_pengajuan === 2" color="negative">
              Gagal Pengajuan
            </q-badge>
          </q-td>
          <q-td key="nama_beasiswa" :props="props">
            {{ props.row.beasiswa.nama_beasiswa }}
          </q-td>
          <q-td key="universitas" :props="props">
            {{ props.row.beasiswa.institusi_pendidikan.nama_institusi }}
          </q-td>
          <q-td key="nama_anak" :props="props">
            {{ props.row.nama_siswa }}
          </q-td>
          <q-td key="nama_ortu" :props="props">
            {{ props.row.member.ktp.nama }}
          </q-td>
          <q-td key="nik_ortu" :props="props">
            {{ props.row.nik_wali }}
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
      columns: [
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'nama_beasiswa', align: 'left', label: 'Nama Beasiswa', field: 'nama_beasiswa' },
        { name: 'universitas', align: 'left', label: 'Nama Universitas', field: 'universitas' },
        { name: 'nama_anak', align: 'left', label: 'Nama Anak', field: 'nama_anak' },
        { name: 'nama_ortu', align: 'left', label: 'Nama Orang Tua', field: 'nama_ortu' },
        { name: 'nik_ortu', align: 'left', label: 'Nik Orang Tua', field: 'nik_ortu' }
      ],
      data: [],
      filter: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$axios.get(`beasiswa/getRecomendationsbyMember/${this.$getProfile().nik}`)
        .finally(() => this.$hide())
        .then((res) => {
          this.data = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
