<template>
  <q-page padding>
    <q-table
      class="my-sticky-header-column-table"
      title="Data Sektor"
      :rows="rows"
      :columns="columns"
      flat
      row-key="sektor"
      :loading="loading"
    >
      <template v-slot:top-right>
        <q-btn
          label="Input Sektor"
          unelevated
          color="primary"
          @click="openDialog()"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="sektor" :props="props">
            {{ props.row.sektor }}
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.status }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Edit" no-caps color="warning" @click="openDialog(props.row, true)" unelevated/>
              <q-btn label="Lihat Daftar Kategori" no-caps :to="{name: 'dataKategoriSektorSuperAdmin', params: {id: props.row.id, name: props.row.sektor}}" color="primary" unelevated/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog
      v-model="dialog"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Form {{ editMode ? 'Edit' : 'Input' }} Sektor</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form ref="formSektor" @submit="onSubmit">
            <q-input
              v-model="form.sektor"
              label="Nama Sektor"
              :rules="$defaultValidation"
            />
            <q-select
              v-model="form.status"
              label="Pilih Status"
              :options="listStatus"
              :rules="$defaultValidation"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Simpan" @click="$refs.formSektor.submit()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import listStatus from './ListStatus'
const model = () => {
  return {
    sektor: null,
    status: null
  }
}
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'sektor', align: 'left', label: 'Sektor', field: 'sektor' },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      pagination: {
        sortBy: 'sektor',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 0
      },
      dialog: false,
      editMode: false,
      idActive: null,
      form: model(),
      loading: false,
      listStatus
    }
  },
  created () {
    this.getData()
  },
  methods: {
    onSubmit () {
      if (this.editMode) {
        this.$showLoading()
        this.$axios.put(`master/sektor/${this.idActive}`, this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.dialog = false
            }
          }).catch(() => this.$commonErrorNotif())
      } else {
        this.$showLoading()
        this.$axios.post('master/sektor', this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.dialog = false
            }
          }).catch(() => this.$commonErrorNotif())
      }
    },
    openDialog (data = null, editMode = false) {
      this.editMode = editMode
      if (editMode) {
        this.idActive = data.id
        delete data.id
        this.form = data
      } else {
        this.resetForm()
      }
      this.dialog = true
    },
    resetForm () {
      this.form = model()
    },
    getData () {
      this.loading = true
      this.$axios.get('/master/sektor', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          // console.log(res)
          this.rows = res.data.result
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
