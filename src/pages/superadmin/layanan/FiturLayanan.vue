<template>
  <q-page padding>
    <q-table
      :title="`Fitur Pada Layanan ${layanan ? layanan.nama_layanan : ''}`"
      flat
      :rows="rows"
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
            {{ props.row.fitur.nama_fitur }}
          </q-td>
          <q-td key="route_name" :props="props">
            {{ props.row.fitur.route_name }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Hapus Fitur Dari Layanan Ini" @click="deleteLayanan(props.row.id)" color="negative" unelevated/>
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
            <q-select
              dense
              v-model="fitur"
              label="Pilih Fitur"
              :options="listFitur"
              use-input
              option-label="nama_fitur"
              option-value="id_fitur"
              @filter="filterFitur"
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
let listFitur = []
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nama_fitur', align: 'left', label: 'Nama Fitur', field: 'nama_fitur' },
        { name: 'route_name', align: 'left', label: 'Route Name', field: 'route_name' },
        { name: 'gambar', align: 'left', label: 'Gambar', field: 'gambar' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      fitur: null,
      editMode: false,
      image: null,
      layanan: null,
      listFitur: listFitur
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    getAll () {
      this.getData()
      this.getDetailLayanan()
      this.getListFitur()
    },
    getData () {
      this.loading = true
      this.$axios.get(`master/layanan-fitur/${this.$route.params.idLayanan}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getDetailLayanan () {
      this.loading = true
      this.$axios.get(`master/get-layanan/${this.$route.params.idLayanan}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.layanan = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getListFitur () {
      this.loading = true
      this.$axios.get(`master/layanan-fitur-belum-relasi/${this.$route.params.idLayanan}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            listFitur = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.$axios.post('master/create-layanan-fitur', {
        id_layanan: Number(this.$route.params.idLayanan),
        id_fitur: this.fitur.id_fitur
      }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.resetForm()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    filterFitur (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.listFitur = listFitur.filter(v => v.nama_fitur.toLowerCase().indexOf(needle) > -1)
      })
    },
    resetForm () {
      this.fitur = null
      this.dialog = false
      this.getAll()
    },
    openDialog (editMode, data) {
      if (editMode) {
        this.editMode = true
        this.form = data
      }
      this.editMode = editMode
      this.dialog = true
    },
    deleteLayanan (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`master/delete-layanan-fitur/${id}`, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getAll()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    }
  }
}
</script>
