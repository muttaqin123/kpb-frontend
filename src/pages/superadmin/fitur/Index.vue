<template>
  <q-page padding>
    <q-table
      title="Fitur"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      row-key="nama"
    >
      <template v-slot:top-right>
        <q-btn
          label="Tambah Fitur"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nama_fitur" :props="props">
            {{ props.row.nama_fitur }}
          </q-td>
          <q-td key="route_name" :props="props">
            {{ props.row.route_name }}
          </q-td>
          <q-td key="icon" :props="props">
            <q-icon :name="props.row.icon"/>
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Edit" @click="openDialog(true, props.row)" color="warning" unelevated/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">{{ editMode ? 'Edit' : 'Tambah' }} Fitur</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="form.nama_fitur"
              label="Nama Fitur"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.route_name"
              label="Nama Route"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              v-model="form.icon"
              label="Icon Layanan"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
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
    nama_fitur: null,
    route_name: null,
    icon: null,
    id_fitur: null
  }
}
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nama_fitur', align: 'left', label: 'Nama', field: 'nama_fitur' },
        { name: 'route_name', align: 'left', label: 'Route Name', field: 'route_name' },
        { name: 'icon', align: 'left', label: 'icon', field: 'icon' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      form: model(),
      editMode: false,
      image: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get('master/get-fitur', this.$createToken())
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
        this.$axios.put(`master/update-fitur/${this.form.id_fitur}`, this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.resetForm()
            }
          })
      } else {
        this.$showLoading()
        delete this.form.id_fitur
        this.$axios.post('master/create-fitur', this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.resetForm()
            }
          })
      }
    },
    resetForm () {
      this.form = model()
      this.dialog = false
      this.image = null
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
