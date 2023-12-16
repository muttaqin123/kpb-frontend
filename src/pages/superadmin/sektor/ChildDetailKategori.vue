<template>
  <q-page padding>
    <q-table
      class="my-sticky-header-column-table"
      :title="`Data Child Detail Kategori ${this.$route.params.name}`"
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
          <q-td key="dtlk_nama" :props="props">
            {{ props.row.child_dtlk_nama }}
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.child_dtlk_status ? 'Aktif' : 'Tidak Aktif' }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Edit" no-caps color="warning" @click="openDialog(props.row, true)" unelevated/>
              <!-- <q-btn label="Lihat Daftar Kategori" no-caps @click="this.$router.push({name: 'dataKategoriSektorSuperAdmin', params: {id: props.row.id, name: props.row.sektor} })" color="primary" unelevated/> -->
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
              label="Detail Kategori"
              disable
              v-model="kategori"
              :rules="$defaultValidation"
            />
            <q-input
              label="Nama Child Detail Kategori"
              v-model="form.child_dtlk_nama"
              :rules="$defaultValidation"
            />
            <q-select
              v-model="status"
              label="Pilih Status"
              :options="listStatus"
              :rules="$defaultValidation"
              option-label="label"
              option-value="value"
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
    child_dtlk_nama: null,
    child_dtlk_status: defaultStatus
  }
}
export default {
  data () {
    return {
      rows: [],
      dialog: false,
      columns: [
        { name: 'dtlk_nama', align: 'left', label: 'Nama Detail Kategori', field: 'dtlk_nama' },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      kategori: this.$route.params.name,
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
      this.resetForm()
      this.editMode = editMode
      if (editMode) {
        this.idActive = data.child_dtlk_id
        this.form.child_dtlk_nama = data.child_dtlk_nama
        this.status = this.listStatus.find(r => r.value === data.child_dtlk_status)
      } else {
        this.resetForm()
      }
      this.dialog = true
    },
    resetForm () {
      this.form = model()
      this.status = defaultStatus
    },
    getData () {
      this.loading = true
      this.$axios.get(`/master/child-detail-kategori/${this.$route.params.id}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          this.rows = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    async onSubmit () {
      if (this.editMode) {
        this.$showLoading()
        this.form.child_dtlk_status = this.status.value
        this.$axios.put(`/master/child-detail-kategori/${this.idActive}`, this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.dialog = false
            }
          }).catch(() => this.$commonErrorNotif())
      } else {
        this.form.dtlk_id = this.$route.params.id
        this.form.child_dtlk_status = this.status.value
        this.$showLoading()
        await this.$axios.post('/master/child-detail-kategori', this.form, this.$createToken())
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
