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
          <q-td key="bpjs_nokartu" :props="props">
            {{ props.row.bpjs_nokartu }}
          </q-td>
          <q-td key="bpjs_jenis_pekerjaan" :props="props">
            {{ props.row.master_sektor.sektor }}
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
            {{ props.row.bpjs_setting.status }}
          </q-td>
          <q-td key="aksi" :props="props">
            <q-btn label="Detail" unelevated color="dark" :to="{ name: 'detailDataPengajuanAsuransiBPJSMember', params: {id: props.row.bpjs_id}}"/>
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
        { name: 'bpjs_nokartu', align: 'left', label: 'No Kartu BPJS', field: 'bpjs_nokartu' },
        { name: 'bpjs_jenis_pekerjaan', align: 'left', label: 'Jenis Pekerjaan', field: 'bpjs_jenis_pekerjaan' },
        { name: 'bpjs_jenis_peserta', align: 'left', label: 'Jenis Peserta', field: 'bpjs_jenis_peserta' },
        { name: 'bpjs_penghasilan', align: 'left', label: 'Penghasilan', field: 'bpjs_penghasilan' },
        { name: 'bpjs_program', align: 'left', label: 'Program', field: 'bpjs_program' },
        { name: 'periode_pendaftaran', align: 'left', label: 'Periode Pendaftaran', field: 'periode_pendaftaran' },
        { name: 'bpjs_tmt', align: 'left', label: 'Terhitung Tanggal', field: 'bpjs_tmt' },
        { name: 'bpjs_lokasi_pekerjaan', align: 'left', label: 'Lokasi Pekerjaan', field: 'bpjs_lokasi_pekerjaan' },
        { name: 'kur_setting', align: 'left', label: 'Status', field: 'kur_setting' },
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
      this.$axios.get(`asuransi/bpjs/${this.$getProfile().member.id_member}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          console.log(res)
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
