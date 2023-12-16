<template>
  <q-page padding>
    <q-table
      :title="`Data Anggota ${this.$route.params.nama}`"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      row-key="nik_petani"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          v-model="filter"
          label="Cari Petani"
          borderless
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nik_petani" :props="props">
            {{ props.row.nik_petani }}
          </q-td>
          <q-td key="nama_petani" :props="props">
            {{ props.row.nama_petani }}
          </q-td>
          <q-td key="area" :props="props">
            {{ `${props.row?.kabupaten_petani} - ${props.row?.kecamatan_petani} - ${props.row?.desa_petani}` }}
          </q-td>
          <q-td key="aksi" :props="props">
            -
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- <q-dialog v-model="dialogBayar" persistent v-if="dialogBayar">
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmitPembayaran">
          <q-card-section>
            <div class="text-h6">Konfirmasi Sudah Bayar</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-file
              outlined
              bottom-slots
              accept=".jpg, image/*, .pdf"
              v-model="buktiBayar"
              label="Upload Bukti Bayar"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
              <template v-slot:hint>
                Upload File Bila Ada
              </template>
            </q-file>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Batal" v-close-popup />
            <q-btn color="primary" label="Konfirmasikan" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog> -->
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
      filter: '',
      columns: [
        { name: 'nik_petani', align: 'left', label: 'NIK', field: 'nik_petani' },
        { name: 'nama_petani', align: 'left', label: 'Nama', field: 'nama_petani' },
        { name: 'area', align: 'left', label: 'Area', field: 'area' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get(`master/anggota-poktan/${this.$route.params.nik}`, this.$createToken())
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
