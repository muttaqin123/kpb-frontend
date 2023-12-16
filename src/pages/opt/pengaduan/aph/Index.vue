<template>
  <q-page padding>
    <q-table
      title="Data Permohonan APH"
      :rows="rows"
      :columns="columns"
      flat
      :loading="loading"
      row-key="nama"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="aph" :props="props">
            {{ props.row.opt_aph.nama_aph }}
          </q-td>
          <q-td key="nik" :props="props">
            {{ props.row.nik }}
          </q-td>
          <q-td key="pemohon" :props="props">
            {{ props.row.pemohon }}
          </q-td>
          <q-td key="alamatpemohon" :props="props">
            {{ props.row.alamatpemohon }}
          </q-td>
          <q-td key="telppemohon" :props="props">
            {{ props.row.telppemohon }}
          </q-td>
          <q-td key="kabupaten" :props="props">
            {{ props.row.kabupatenpemohon }}
          </q-td>
          <q-td key="kecamatan" :props="props">
            {{ props.row.kecamatanpemohon }}
          </q-td>
          <q-td key="lphp" :props="props">
            {{ props.row.lphp }}
          </q-td>
          <q-td key="status" :props="props">
            <q-badge v-if="props.row.statuspersetujuan === 0" color="negative" class="q-pa-xs">
              Belum/Tidak Disetujui
            </q-badge>
            <q-badge v-else color="positive" class="q-pa-xs">
              Disetujui
            </q-badge>
          </q-td>
          <q-td key="aksi" :props="props">
            <q-btn :disable="props.row.statuspersetujuan > 0" @click="openDialog(props.row.id_permohonan_starter)" unelevated color="primary" label="Terima Pengajuan"/>
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
        { name: 'aph', align: 'left', label: 'APH', field: 'aph' },
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'pemohon', align: 'left', label: 'Nama Pemohon', field: 'pemohon' },
        { name: 'alamatpemohon', align: 'left', label: 'Alamat Pemohon', field: 'alamatpemohon' },
        { name: 'telppemohon', align: 'left', label: 'Telp Pemohon', field: 'telppemohon' },
        { name: 'kabupaten', align: 'left', label: 'Kabupaten', field: 'kabupaten' },
        { name: 'kecamatan', align: 'left', label: 'Kecamatan', field: 'kecamatan' },
        { name: 'lphp', align: 'left', label: 'LPHP', field: 'lphp' },
        { name: 'status', align: 'left', label: 'Status Pengajuan', field: 'status' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get('opt/permohonan-starter', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    openDialog (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$showLoading()
        this.$axios.put(`opt/permohonan-starter/${id}`, {
          statuspersetujuan: 1
        }, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data, false)) {
              this.getData()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    }
  }
}
</script>
