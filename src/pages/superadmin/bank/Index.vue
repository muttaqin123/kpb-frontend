<template>
  <q-page padding>
    <q-table
      title="Data Bank"
      :rows="rows"
      :columns="columns"
      flat
      :loading="loading"
      row-key="nama"
    >
      <template v-slot:top-right>
        <q-btn
          label="Tambah Bank"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nik" :props="props">
            {{ props.row.member.nik }}
          </q-td>
          <q-td key="nama_bank" :props="props">
            {{ props.row.nama_bank }}
          </q-td>
          <q-td key="file_syarat" :props="props">
            <q-btn
              type="a"
              target="_blank"
              :href="`${$baseURL}/${props.row.file_syarat}`"
              label="Lihat File"
              unelevated
              color="dark"
            />
          </q-td>
          <q-td key="keterangan" :props="props">
            {{ props.row.keterangan }}
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
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">{{ editMode ? 'Edit' : 'Tambah' }} Bank</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="form.nik"
              label="Username"
              :disable="editMode"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.nama_bank"
              label="Nama Bank"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.alamat"
              label="Alama Bank"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.nama_pic"
              label="Nama PIC"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.jabatan_pic"
              label="Jabatan PIC"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.url"
              label="URL KUR"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-file
              v-model="fileSyarat"
              label="File Syarat"
              accept=".pdf, pdf/*"
              :rules="[
                editMode ? null : val => val !== null || 'Mohon Isi'
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
    nik: null,
    nama_bank: null,
    keterangan: null,
    alamat: null,
    nama_pic: null,
    jabatan_pic: null,
    url: null,
    file: null,
    id_prov: '18',
    id_kab: '1871',
    id_kec: '187101',
    id_desa: '1871011003',
    id: null
  }
}
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nik', align: 'left', label: 'Username', field: 'nik' },
        { name: 'nama_bank', align: 'left', label: 'Nama', field: 'nama_bank' },
        { name: 'file_syarat', align: 'left', label: 'File Syarat', field: 'file_syarat' },
        { name: 'keterangan', align: 'left', label: 'Keterangan', field: 'keterangan' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      form: model(),
      editMode: false,
      fileSyarat: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get('master/bank', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      const formData = new FormData()
      if (this.editMode) {
        this.$showLoading()
        let adaFile = false
        if (this.fileSyarat) {
          formData.append('file_syarat', this.fileSyarat)
          adaFile = true
        }
        formData.append('data', JSON.stringify({ ...this.form, adaFile }))
        this.$axios.put(`master/bank/${this.form.id}`, formData, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.resetForm()
            }
          }).catch(() => this.$commonErrorNotif())
      } else {
        delete this.form.id
        this.$showLoading()
        formData.append('data', JSON.stringify(this.form))
        formData.append('file_syarat', this.fileSyarat)
        this.$axios.post('auth/sign-up-bank', formData, this.$createToken())
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
      this.fileSyarat = null
    },
    openDialog (editMode, data) {
      this.resetForm()
      this.editMode = editMode
      if (editMode) {
        this.editMode = true
        this.$showLoading()
        this.$axios.get(`master/bank/${data.id}`, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data, false)) {
              this.form.nama_bank = data.nama_bank
              this.form.keterangan = data.keterangan
              this.form.nik = data.member.nik
              this.form.id = data.id
              this.form.jabatan_pic = data.jabatan_pic
              this.form.nama_pic = data.nama_pic
              this.form.alamat = data.alamat
              this.form.url = data.url
              this.dialog = true
            }
          }).catch(() => this.$commonErrorNotif())
      } else {
        this.form = model()
        this.dialog = true
      }
    }
  }
}
</script>
