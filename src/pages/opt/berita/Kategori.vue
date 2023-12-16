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
          label="Tambah Kategori"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="isikategori" :props="props">
            {{ props.row.isikategori }}
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
            <div class="text-h6">{{ editMode ? 'Edit' : 'Tambah' }} Kateogori</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="form.isikategori"
              label="Kategori"
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
    isikategori: null,
    id_opt_kategori_informasi: null
  }
}
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'isikategori', align: 'left', label: 'Kategori', field: 'isikategori' },
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
      this.$axios.get('opt/kategori-informasi', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      if (this.editMode) {
        this.$showLoading()
        this.$axios.put(`opt/kategori-informasi/${this.form.id_opt_kategori_informasi}`, this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.resetForm()
            }
          }).catch(() => this.$commonErrorNotif())
      } else {
        this.$showLoading()
        delete this.form.id_opt_kategori
        this.$axios.post('opt/kategori-informasi', this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.resetForm()
              this.getData()
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
