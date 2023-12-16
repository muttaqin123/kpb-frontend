<template>
  <q-page padding>
    <q-table
      title="Data Dokter"
      :rows="rows"
      :columns="columns"
      flat
      :loading="loading"
      row-key="nama"
    >
      <template v-slot:top-right>
        <q-btn
          label="Tambah Dokter"
          unelevated
          color="primary"
          :to="{name: 'inputDataDokterOpt'}"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="fotoProfile" :props="props">
            <q-img
              :src="`${$baseURL}file-dokter/${props.row.fotoprofil}`"
              width="10"
            />
          </q-td>
          <q-td key="jenis" :props="props">
            {{ props.row.jenis }}
          </q-td>
          <q-td key="nik" :props="props">
            {{ props.row.nik }}
          </q-td>
          <q-td key="nama" :props="props">
            {{ props.row.ktp.nama }}
          </q-td>
          <q-td key="keahlian" :props="props">
            {{ props.row.keahlian }}
          </q-td>
          <q-td key="tlp" :props="props">
            {{ props.row.tlp }}
          </q-td>
          <q-td key="tlpkantor" :props="props">
            {{ props.row.tlpkantor }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Edit" :to="{name: 'editDataDokterOpt', params: {id: props.row.id_opt_dokter}}" color="warning" outline/>
              <q-btn label="Hapus" @click="hapusData(props.row.id_opt_dokter)" color="negative" outline/>
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
    nik: null
  }
}
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'fotoProfile', align: 'left', label: 'Foto Profile', field: 'fotoProfile' },
        { name: 'jenis', align: 'left', label: 'Jenis', field: 'jenis' },
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'nama', align: 'left', label: 'Nama', field: 'nama' },
        { name: 'keahlian', align: 'left', label: 'Keahlian', field: 'keahlian' },
        { name: 'tlp', align: 'left', label: 'Telephone', field: 'tlp' },
        { name: 'tlpkantor', align: 'left', label: 'Telephone Kantor', field: 'tlpkantor' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      form: model()
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get('opt/dokter', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    hapusData (id) {
      this.$q.dialog({
        title: 'Peringatan',
        message: 'Apakah Anda Yakin ?',
        persistent: true,
        cancel: true
      }).onOk(() => {
        this.$showLoading()
        this.$axios.delete(`opt/dokter/${id}`, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    }
  }
}
</script>
