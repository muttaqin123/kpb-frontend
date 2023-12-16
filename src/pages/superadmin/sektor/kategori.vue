<template>
  <q-page padding>
    <q-table
      class="my-sticky-header-column-table"
      :title="`Data Kategori ${this.$route.params.name}`"
      :rows="rows"
      :columns="columns"
      flat
      :loading="loading"
    >
      <template v-slot:top-right>
        <q-btn label="Tambah Kategori" @click="openDialog()" no-caps icon="add" color="primary"/>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="kategori" :props="props">
            {{ props.row.kategori_nama }}
          </q-td>
          <q-td key="isHewan" :props="props">
            {{ props.row.ishewan ? 'Ya' : 'Bukan' }}
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.kategori_status ? 'Aktif' : 'Tidak Aktif' }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Edit" no-caps color="warning" @click="openDialog(props.row, true)" unelevated/>
              <q-btn label="Lihat Detail Kategori" no-caps :to="{name: 'dataDetailKategoriSektorSuperAdmin', params: {id: props.row.kategori_id, name: props.row.kategori_nama}}" color="primary" unelevated/>
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
              label="Sektor"
              disable
              v-model="sektor"
              :rules="$defaultValidation"
            />
            <q-input
              label="Nama Kategori"
              v-model="form.kategori_nama"
              :rules="$defaultValidation"
            />
            <q-checkbox v-model="form.ishewan" label="Apakah Kategori ini berbentuk hewan ?" />
            <q-select
              v-model="status"
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
const defaultStatus = {
  label: 'Aktif',
  value: true
}
const model = () => {
  return {
    kategori_sektor_id: null,
    ishewan: false,
    kategori_nama: null,
    kategori_status: defaultStatus
  }
}
export default {
  data () {
    return {
      rows: [],
      dialog: false,
      columns: [
        { name: 'kategori', align: 'left', label: 'Kategori', field: 'kategori' },
        { name: 'isHewan', align: 'left', label: 'Apakah Hewan ?', field: 'isHewan' },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      sektor: this.$route.params.name,
      form: model(),
      pagination: {
        sortBy: 'kategori',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      listStatus: [
        defaultStatus,
        {
          label: 'Tidak Aktif',
          value: false
        }
      ],
      editMode: false,
      loading: false,
      idActive: null,
      status: defaultStatus
    }
  },
  created () {
    this.getData()
  },
  methods: {
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
      this.$axios.get(`/master/kategori/${this.$route.params.id}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          this.rows = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      if (this.editMode) {
        this.$showLoading()
        delete this.form.kategori_sektor_id
        this.$axios.put(`/master/update-sektor-kategori/${this.idActive}`, this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.dialog = false
            }
          }).catch(() => this.$commonErrorNotif())
      } else {
        this.$showLoading()
        this.form.kategori_sektor_id = this.$route.params.id
        this.form.kategori_status = this.status.value
        this.$axios.post('/master/create-sektor-kategori', this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.dialog = false
            }
          }).catch(() => this.$commonErrorNotif())
      }
    }
  }
}
</script>
