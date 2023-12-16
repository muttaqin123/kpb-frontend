<template>
  <q-page padding>
    <div class="absolute-top bg-yellow-15" style="height: 100px"></div>
    <q-table
      class="q-mt-lg"
      title="Data Pengajuan KUR Anda"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      row-key="nama"
    >
      <!-- <template v-slot:top-right>
        <q-btn
          label="Tambah Fitur"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template> -->
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="status_pengajuan" :props="props">
            {{ props.row.kur_setting.status }}
          </q-td>
          <q-td key="namaBank" :props="props">
            {{ props.row.master_bank.nama_bank }}
          </q-td>
          <q-td key="keperluan_kur" :props="props">
            {{ props.row.keperluan_kur }}
          </q-td>
          <q-td key="jumlah" :props="props">
            {{ $formatPrice(props.row.jumlah) }}
          </q-td>
          <q-td key="jangka_waktu" :props="props">
            {{ props.row.jangka_waktu }} Bulan
          </q-td>
          <!-- <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Edit" @click="openDialog(true, props.row)" color="warning" unelevated/>
            </div>
          </q-td> -->
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">{{ editMode ? 'Edit' : 'Tambah' }} Role</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="form.nama_fitur"
              label="Nama Layanan"
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
        { name: 'status_pengajuan', align: 'left', label: 'Status Pengajuan', field: 'status_pengajuan' },
        { name: 'namaBank', align: 'left', label: 'Nama Bank', field: 'namaBank' },
        { name: 'keperluan_kur', align: 'left', label: 'Keperluan Kur', field: 'keperluan_kur' },
        { name: 'jumlah', align: 'left', label: 'Jumlah', field: 'jumlah' },
        { name: 'jangka_waktu', align: 'left', label: 'Jangka Waktu', field: 'jangka_waktu' }
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
      this.$axios.get(`kur/pengajuan-member/${this.$getProfile().member.id_member}`, this.$createToken())
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
        this.$axios.put(`master/update-fitur/${this.form.id_fitur}`, this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.resetForm()
            }
          }).catch(() => this.$commonErrorNotif())
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
          }).catch(() => this.$commonErrorNotif())
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
