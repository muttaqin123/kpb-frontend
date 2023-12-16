<template>
  <q-page padding>
    <q-table
      title="Data Penyedia Sapras"
      :rows="rows"
      :columns="columns"
      flat
      row-key="nama"
      :loading="loading"
    >
      <template v-slot:top-right>
        <q-btn
          label="Tambah Penyedia"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="username" :props="props">
            {{ props.row.member.ktp.nik }}
          </q-td>
          <q-td key="nama" :props="props">
            {{ props.row.member.ktp.nama }}
          </q-td>
          <q-td key="no_hp" :props="props">
            {{ props.row.member.no_hp }}
          </q-td>
          <q-td key="keterangan" :props="props">
            {{ props.row.keterangan }}
          </q-td>
          <!-- <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Edit" @click="openDialog(true, props.row)" color="warning" unelevated/>
              <q-btn label="Layanan" unelevated color="primary" :to="{name: 'manajemenRoleLayananSuperAdmin', params: {idRole: props.row.id_role}}"/>
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
              v-model="form.nik"
              label="Username"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.nama"
              label="Nama Penyedia"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <area-provinsi />
            <area-kabupaten />
            <area-kecamatan />
            <area-desa />
            <q-input
              dense
              v-model="form.alamat"
              label="Alamat Lengkap"
              type="textarea"
              :rules="[null]"
            />
            <q-input
              dense
              v-model="form.no_hp"
              label="No HP"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.email"
              label="E-Mail"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.kode_pos"
              label="Kode POS"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.keterangan"
              label="Keterangan"
              type="textarea"
              :rules="[null]"
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
    nama: null,
    id_prov: null,
    id_kab: null,
    id_kec: null,
    id_desa: null,
    alamat: null,
    no_hp: null,
    email: null,
    kode_pos: null,
    keterangan: null
  }
}
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'username', align: 'left', label: 'Username', field: 'username' },
        { name: 'nama', align: 'left', label: 'Nama', field: 'nama' },
        { name: 'no_hp', align: 'left', label: 'No Hp', field: 'no_hp' },
        { name: 'keterangan', align: 'left', label: 'Keterangan', field: 'keterangan' }
        // { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: true,
      dialog: false,
      form: model(),
      editMode: false
    }
  },
  created () {
    this.$resetArea()
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get('master/pabrik', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        })
    },
    onSubmit () {
      if (this.editMode) {
        // this.$showLoading()
        // this.$axios.put(`master/update-role/${this.form.id_role}`, this.form, this.$createToken())
        //   .finally(() => this.$hide())
        //   .then(res => {
        //     if (this.$parseResponse(res.data)) {
        //       this.getData()
        //       this.resetForm()
        //     }
        //   }).catch(() => this.$commonErrorNotif())
      } else {
        this.form.id_prov = this.$store.state.area.provinsi.id
        this.form.id_kab = this.$store.state.area.kabupaten.id
        this.form.id_kec = this.$store.state.area.kecamatan.id
        this.form.id_desa = this.$store.state.area.desa.id
        this.$showLoading()
        this.$axios.post('auth/sign-up-pabrik', this.form, this.$createToken())
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
      this.$resetArea()
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
