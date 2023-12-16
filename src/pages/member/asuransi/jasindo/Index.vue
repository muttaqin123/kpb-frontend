<template>
  <q-page padding>
    <q-table
      title="Data Pengajuan Asuransi BPJS Anda"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="jenis_asuransi" :props="props">
            {{ props.row.jenis_asuransi }}
          </q-td>
          <q-td key="nama_kelompok" :props="props">
            {{ props.row.nama_kelompok }}
          </q-td>
          <q-td key="nama_ketua_kelompok" :props="props">
            {{ props.row.nama_ketua_kelompok }}
          </q-td>
          <q-td key="jalur_distribusi" :props="props">
            {{ props.row.jalur_distribusi }}
          </q-td>
          <q-td key="musim_tanam" :props="props">
            {{ props.row.musim_tanam ?? '-' }}
          </q-td>
          <q-td key="musim_tanam" :props="props">
            {{ props.row.metode_tanam ?? '-' }}
          </q-td>
          <q-td key="musim_tanam" :props="props">
            {{ props.row.prakiraan_tanam ? $parseDate(props.row.prakiraan_tanam).fullDate : '-' }}
          </q-td>
          <q-td key="prakiraan_panen" :props="props">
            {{ props.row.prakiraan_panen ? $parseDate(props.row.prakiraan_panen).fullDate : '-' }}
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.statuspengajuan }}
          </q-td>
          <q-td key="anggota" :props="props">
            <q-btn
              type="a"
              target="_blank"
              :href="`${$baseURL}file-anggota/${props.row.file_anggota}`"
              label="Lihat File"
              unelevated
              outline
              color="dark"
            />
          </q-td>
          <q-td key="aksi" :props="props">
            <q-btn label="Detail" unelevated color="dark" :to="{ name: 'detailDataJasindoMember', params: {id: props.row.id}}"/>
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
      rows: [],
      columns: [
        { name: 'jenis_asuransi', align: 'left', label: 'Jenis', field: 'jenis_asuransi' },
        { name: 'nama_kelompok', align: 'left', label: 'Nama Kelompok', field: 'nama_kelompok' },
        { name: 'nama_ketua_kelompok', align: 'left', label: 'Nama Ketua Kelompok', field: 'nama_ketua_kelompok' },
        { name: 'jalur_distribusi', align: 'left', label: 'Jalur Distribusi', field: 'jalur_distribusi' },
        { name: 'musim_tanam', align: 'left', label: 'musim_tanam', field: 'musim_tanam' },
        { name: 'metode_tanam', align: 'left', label: 'Metode Tanam', field: 'metode_tanam' },
        { name: 'prakiraan_tanam', align: 'left', label: 'Prakiraan Tanam', field: 'prakiraan_tanam' },
        { name: 'prakiraan_panen', align: 'left', label: 'Prakiraan Panen', field: 'prakiraan_panen' },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'anggota', align: 'left', label: 'Data Anggota', field: 'anggota' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      editMode: false,
      image: null,
      filter: '',
      show_filter: false
    }
  },
  created () {
    this.getDataBPJS()
  },
  methods: {
    getDataBPJS () {
      this.loading = true
      this.$axios.get(`master/asuransis/${this.$getProfile().member.id_member}`, this.$createToken())
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
