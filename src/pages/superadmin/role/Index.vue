<template>
  <q-page padding>
    <q-table
      title="Data Role"
      :rows="rows"
      :columns="columns"
      flat
      row-key="nama"
      :loading="loading"
    >
      <template v-slot:top-right>
        <q-btn
          label="Tambah Role"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nama" :props="props">
            {{ props.row.nama_role }}
          </q-td>
          <q-td key="keterangan" :props="props">
            {{ props.row.keterangan }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Edit" @click="openDialog(true, props.row)" color="warning" unelevated/>
              <q-btn label="Layanan" unelevated color="primary" :to="{name: 'manajemenRoleLayananSuperAdmin', params: {idRole: props.row.id_role}}"/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">{{ editMode ? 'Edit' : 'Tambah' }} Role</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="form.nama_role"
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
const model = () => {
  return {
    nama_role: null,
    keterangan: null,
    id_role: null
  }
}
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nama', align: 'left', label: 'Nama', field: 'nama' },
        { name: 'keterangan', align: 'left', label: 'Keterangan', field: 'keterangan' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: true,
      dialog: false,
      form: model(),
      editMode: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get('master/get-role', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        })
    },
    onSubmit () {
      if (this.editMode) {
        this.$showLoading()
        this.$axios.put(`master/update-role/${this.form.id_role}`, this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.resetForm()
            }
          }).catch(() => this.$commonErrorNotif())
      } else {
        delete this.form.id_role
        this.$showLoading()
        this.$axios.post('master/create-role', this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.resetForm()
            }
          }).catch(() => this.$commonErrorNotif())
      }
    },
    resetForm () {
      this.form = model()
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
