<template>
  <q-page padding>
    <q-table
      title="Data Asuransi BPJS"
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
          <q-td key="no_kartu" :props="props">
            {{ props.row.no_kartu }}
          </q-td>
          <q-td key="nama" :props="props">
            {{ props.row.nama }}
          </q-td>
          <q-td key="bulan_kepesertaan" :props="props">
            {{ props.row.bulan_kepesertaan }}
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
        { name: 'no_kartu', align: 'left', label: 'No Kartu', field: 'no_kartu' },
        { name: 'nama', align: 'left', label: 'Nama', field: 'nama' },
        { name: 'bulan_kepesertaan', align: 'left', label: 'Bulan Kepesertaan', field: 'bulan_kepesertaan' }
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
      this.$axios.get('asuransi/bpjs', this.$createPaginate(props))
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
