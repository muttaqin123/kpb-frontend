<template>
  <q-page padding>
    <q-table
      title="Data Dinas"
      :rows="rows"
      :columns="columns"
      flat
      :loading="loading"
      row-key="nama"
    >
      <template v-slot:top-right>
        <q-btn
          label="Tambah Dinas"
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
          <q-td key="nama" :props="props">
            {{ props.row.member.ktp.nama }}
          </q-td>
          <q-td key="kabupaten" :props="props">
            {{ props.row.member.users_login.access.includes('provinsi') ? '-' :  props.row.member.reg_regencies.name }}
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
            <div class="text-h6">{{ editMode ? 'Edit' : 'Tambah' }} Dinas</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-select
              v-model="tipeDinas"
              :options="listDinas"
              label="Pilih Dinas"
              :rules="[
                val => val !== null || 'Mohon Pilih'
              ]"
              @update:model-value="() => form.nama = tipeDinas.label"
            />
            <div v-if="tipeDinas">
              <area-kabupaten v-if="tipeDinas.level === 1 || tipeDinas.label === 'BPP Kecamatan'"/>
              <area-kecamatan v-if="tipeDinas.label === 'BPP Kecamatan'"/>
            </div>
            <q-input
              v-model="form.nik"
              label="Username"
              :disable="editMode"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              v-model="form.nama"
              label="Nama"
              readonly
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
import { listDinas } from '../../../helper/ListAkses'
const model = () => {
  return {
    nik: null,
    nama: null,
    id_prov: '18',
    id_kab: '1871',
    id_kec: '187101',
    id_desa: '1871011003',
    id: null,
    access: null
  }
}
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nik', align: 'left', label: 'Username', field: 'nik' },
        { name: 'nama', align: 'left', label: 'Nama', field: 'nama' },
        { name: 'kabupaten', align: 'left', label: 'Kabupaten', field: 'kabupaten' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      form: model(),
      editMode: false,
      listDinas,
      tipeDinas: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getKab () {
      this.$showLoading()
      this.$axios
        .get('/areas/kabupaten/18')
        .finally(() => this.$hide())
        .then((res) => {
          if (this.$parseResponse(res.data, false)) {
            this.$store.commit('area/updateListKabupaten', res.data.result)
            this.$store.commit('area/updateKabupaten', null)
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    getData () {
      this.loading = true
      this.$axios.get('master/dinas', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      if (this.editMode) {
        // this.$showLoading()
        // let adaFile = false
        // if (this.fileSyarat) {
        //   formData.append('file_syarat', this.fileSyarat)
        //   adaFile = true
        // }
        // formData.append('data', JSON.stringify({ ...this.form, adaFile }))
        // this.$axios.put(`master/bank/${this.form.id}`, formData, this.$createToken())
        //   .finally(() => this.$hide())
        //   .then(res => {
        //     if (this.$parseResponse(res.data)) {
        //       this.getData()
        //       this.resetForm()
        //     }
        //   }).catch(() => this.$commonErrorNotif())
      } else {
        delete this.form.id
        console.log(this.tipeDinas.label)
        if (this.tipeDinas.level === 1 || this.tipeDinas.label === 'BPP Kecamatan') {
          this.form.id_kab = this.$store.state.area.kabupaten.id
        }
        if (this.tipeDinas.label === 'BPP Kecamatan') {
          this.form.id_kec = this.$store.state.area.kecamatan.id
        }
        this.form.access = this.tipeDinas.value
        this.$showLoading()
        this.$axios.post('auth/sign-up-dinas', this.form, this.$createToken())
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
      this.tipeDinas = null
      this.$resetArea()
    },
    openDialog (editMode, data) {
      this.resetForm()
      this.$resetArea()
      this.getKab()
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
