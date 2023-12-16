<template>
  <q-page padding>
    <q-table
      title="Data Asuransi AUTP"
      :rows="rows"
      :columns="columns"
      flat
      row-key="nama"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
      v-model:pagination="pagination"
    >
      <!-- <template v-slot:top-right>
        <q-btn
          label="Tambah Status"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template> -->
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nik" :props="props">
            {{ props.row.nik }}
          </q-td>
          <q-td key="nama" :props="props">
            {{ props.row.nama_petani }}
          </q-td>
          <q-td key="luas_lahan" :props="props">
            {{ props.row.luas_lahan }} Ha
          </q-td>
          <q-td key="tahun" :props="props">
            {{ props.row.tahun }}
          </q-td>
          <q-td key="area" :props="props">
            {{ props.row.desa }} - {{ props.row.kec }} - {{ props.row.kab }} - {{ props.row.prov }}
          </q-td>
          <q-td key="alamat_lahan" :props="props">
            {{ props.row.alamat_lahan }}
          </q-td>
          <q-td key="sumber_bayar" :props="props">
            {{ props.row.sumber_bayar }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">{{ editMode ? 'Edit' : 'Tambah' }} Status</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="form.status"
              label="Nama Role"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.keterangan"
              label="Keterangan"
              :rules="[]"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Batal" v-close-popup />
            <q-btn color="primary" label="Simpan" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'nama', align: 'left', label: 'Nama', field: 'nama' },
        { name: 'luas_lahan', align: 'left', label: 'Luas lahan', field: 'luas_lahan' },
        { name: 'tahun', align: 'left', label: 'Tahun', field: 'tahun' },
        { name: 'area', align: 'left', label: 'Area', field: 'area' },
        { name: 'alamat_lahan', align: 'left', label: 'Alamat', field: 'alamat_lahan' },
        { name: 'sumber_bayar', align: 'left', label: 'Sumber Bayar', field: 'sumber_bayar' }
      ],
      loading: true,
      dialog: false,
      editMode: false,
      pagination: {
        sortBy: 'nik',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    onRequest (props) {
      this.loading = true
      this.$axios.get('asuransi/autp', this.$createPaginate(props))
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
            this.pagination = res.data.paginate
          }
        })
    },
    onSubmit () {
      // if (this.editMode) {
      //   const id = this.form.id
      //   delete this.form.id
      //   this.$showLoading()
      //   this.$axios.put(`kur/status-kur/${id}`, this.form, this.$createToken())
      //     .finally(() => this.$hide())
      //     .then(res => {
      //       if (this.$parseResponse(res.data)) {
      //         this.getData()
      //         this.resetForm()
      //       }
      //     }).catch(() => this.$commonErrorNotif())
      // } else {
      //   // delete this.form.id
      //   // this.$showLoading()
      //   // this.$axios.post('master/create-role', this.form, this.$createToken())
      //   //   .finally(() => this.$hide())
      //   //   .then(res => {
      //   //     if (this.$parseResponse(res.data)) {
      //   //       this.getData()
      //   //       this.resetForm()
      //   //     }
      //   //   }).catch(() => this.$commonErrorNotif())
      // }
    },
    resetForm () {
      this.dialog = false
    },
    openDialog (editMode, data) {
      if (editMode) {
        this.editMode = true
        this.form = data
      }
      this.editMode = editMode
      this.dialog = true
    }
  }
}
</script>
