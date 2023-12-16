<template>
  <q-page padding>
    <q-table
      title="Layanan"
      flat
      :rows="rows"
      :columns="columns"
      row-key="nama"
      :loading="loading"
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
            {{ props.row.nama_layanan }}
          </q-td>
          <q-td key="routeIndex" :props="props">
            {{ props.row.routeIndex }}
          </q-td>
          <q-td key="url" :props="props">
            {{ props.row.url }}
          </q-td>
          <q-td key="keterangan" :props="props">
            {{ props.row.keterangan }}
          </q-td>
          <q-td key="gambar" :props="props">
            <q-img
              :src="`${$baseURL}image/layanan/${props.row.gambar}`"
              width="100"
            />
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Edit" @click="openDialog(true, props.row)" color="warning" unelevated/>
              <q-btn label="Fitur" unelevated color="primary" :to="{name: 'manajemenFiturLayananSuperAdmin', params: { idLayanan: props.row.id_layanan }}"/>
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
            <q-input
              dense
              v-model="form.nama_layanan"
              label="Nama Layanan"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.routeIndex"
              label="Route Index Layanan (Di dalem menu)"
              :rules="[null]"
            />
            <q-input
              dense
              v-model="form.url"
              label="URL Layanan (Di Landing Page)"
              :rules="[null]"
            />
            <q-toggle
              v-model="form.showInLandingPage"
              label="Munculkan di Landing Page"
            />
            <q-input
              dense
              v-model="form.keterangan"
              label="Keterangan"
              :rules="[null]"
            />
            <q-file
              v-model="image"
              label="Gambar Layanan"
              accept=".jpg, image/*"
              :rules="[
                editMode ? null : val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-file
              v-model="icon"
              label="Icon Layanan"
              accept=".jpg, image/*"
              :rules="[
                editMode ? null : val => val !== null || 'Mohon Isi'
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
    nama_layanan: null,
    routeIndex: 'indexFitur',
    url: '',
    showInLandingPage: false,
    keterangan: null,
    id_layanan: null
  }
}
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nama_layanan', align: 'left', label: 'Nama', field: 'nama_layanan' },
        { name: 'routeIndex', align: 'left', label: 'Route Index', field: 'routeIndex' },
        { name: 'url', align: 'left', label: 'URL Landing Page', field: 'url' },
        { name: 'keterangan', align: 'left', label: 'Keterangan', field: 'keterangan' },
        { name: 'gambar', align: 'left', label: 'Gambar', field: 'gambar' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      form: model(),
      editMode: false,
      image: null,
      icon: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get('master/get-layanan', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          console.log(res)
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      const formData = new FormData()
      if (this.editMode) {
        this.$showLoading()
        Object.assign(this.form, { adaGambar: false, adaIcon: false })
        if (this.image) {
          Object.assign(this.form, { adaGambar: true })
          formData.append('gambar', this.image)
        }
        if (this.icon) {
          Object.assign(this.form, { adaIcon: true })
          formData.append('icon', this.icon)
        }
        formData.append('data', JSON.stringify(this.form))
        this.$axios.put(`master/update-layanan/${this.form.id_layanan}`, formData, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.resetForm()
            }
          }).catch(() => this.$commonErrorNotif())
      } else {
        this.$showLoading()
        delete this.form.id_layanan
        formData.append('gambar', this.image)
        formData.append('icon', this.icon)
        formData.append('data', JSON.stringify(this.form))
        this.$axios.post('master/create-layanan', formData, this.$createToken())
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
      this.image = null
      this.icon = null
    },
    openDialog (editMode, data) {
      this.form = model()
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
