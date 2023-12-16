<template>
  <q-page padding>
    <q-table
      :title="`Layanan Pada Role ${role ? role.role.nama_role : ''}`"
      flat
      :rows="rows"
      :columns="columns"
      row-key="nama"
    >
      <template v-slot:top-right>
        <q-btn
          label="Tambah Layanan"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nama_layanan" :props="props">
            {{ props.row.layanan.nama_layanan }}
          </q-td>
          <q-td key="keterangan" :props="props">
            {{ props.row.layanan.keterangan }}
          </q-td>
          <q-td key="gambar" :props="props">
            <q-img
              :src="`${$baseURL}image/layanan/${props.row.layanan.gambar}`"
              width="100"
            />
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Hapus Layanan Dari Role Ini" @click="deleteLayanan(props.row.id_role_layanan)" color="negative" unelevated/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">{{ editMode ? 'Edit' : 'Tambah' }} Layanan</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-select
              dense
              v-model="layanan"
              label="Pilih Layanan Layanan"
              :options="listLayanan"
              use-input
              option-label="nama_layanan"
              option-value="id_layanan"
              @filter="filterLayanan"
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
let listLayanan = []
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nama_layanan', align: 'left', label: 'Nama', field: 'nama_layanan' },
        { name: 'keterangan', align: 'left', label: 'Keterangan', field: 'keterangan' },
        { name: 'gambar', align: 'left', label: 'Gambar', field: 'gambar' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      layanan: null,
      editMode: false,
      image: null,
      role: null,
      listLayanan: listLayanan
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    getAll () {
      this.getData()
      this.getDetailRole()
      this.getListLayanan()
    },
    getData () {
      this.loading = true
      this.$axios.get(`users/layanan/${this.$route.params.idRole}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getDetailRole () {
      this.loading = true
      this.$axios.get(`master/role-layanan/${this.$route.params.idRole}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.role = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getListLayanan () {
      this.loading = true
      this.$axios.get(`master/role-layanan-belum-relasi/${this.$route.params.idRole}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            listLayanan = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.$axios.post('master/create-role-layanan', {
        id_role: Number(this.$route.params.idRole),
        id_layanan: this.layanan.id_layanan
      }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.resetForm()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    filterLayanan (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.listLayanan = listLayanan.filter(v => v.nama_layanan.toLowerCase().indexOf(needle) > -1)
      })
    },
    resetForm () {
      this.layanan = null
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
        this.$axios.delete(`master/delete-role-layanan/${id}`, this.$createToken())
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
