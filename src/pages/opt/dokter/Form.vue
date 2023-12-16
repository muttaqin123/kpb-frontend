<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div class="text-h6">{{ editMode ? "Edit" : "Input" }} Dokter</div>
        <div>Mohon isi form berikut ini.</div>
        <q-form @submit="onSubmit" class="q-mt-md">
          <q-input
            v-model="form.nik"
            label="NIK (Pastikan NIK sudah terdaftar)"
            :rules="$defaultValidation"
            :disable="editMode"
          />
          <q-input
            v-model="form.keahlian"
            label="Keahlian"
            :rules="$defaultValidation"
          />
          <q-input
            v-model="form.alamattugas"
            label="Alamat Tugas"
            :rules="$defaultValidation"
          />
          <q-input
            v-model="form.email"
            label="E-Mail"
            :rules="$defaultValidation"
          />
          <q-input
            v-model="form.tlpkantor"
            label="Telephone Kantor"
            :rules="$defaultValidation"
          />
          <q-input
            v-model="form.tlp"
            label="Telephone Pribadi"
            :rules="$defaultValidation"
          />
          <q-select
            v-model="form.jenis"
            :options="listJenis"
            label="Jenis"
            :rules="$defaultValidation"
          />
          <q-file
            v-model="foto"
            label="Unggah Foto Profile"
            accept=".jpg, image/*"
            :rules="[
              editMode ? [...$defaultValidation] : []
            ]"
          />
          <q-btn
            label="Batal"
            :to="{ name: 'dataDokterOpt' }"
            color="primary"
            unelevated
            outline
            class="q-mr-md"
          />
          <q-btn label="Simpan" color="primary" unelevated type="submit" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
const model = () => {
  return {
    nik: null,
    keahlian: null,
    alamattugas: null,
    email: null,
    tlpkantor: null,
    tlp: null,
    jenis: null
  }
}
export default {
  props: {
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: model(),
      foto: null,
      listJenis: ['Petugas POPT', 'Laboran']
    }
  },
  async created () {
    if (this.editMode) {
      this.$showLoading()
      this.$axios.get(`opt/dokter/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.form = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    }
  },
  methods: {
    onSubmit () {
      if (this.editMode) {
        this.edit()
      } else {
        this.input()
      }
    },
    input () {
      this.$showLoading()
      const formData = new FormData()
      formData.append('fotoprofil', this.foto)
      formData.append('data', JSON.stringify(this.form))
      this.$axios
        .post('opt/dokter', formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          if (this.$parseResponse(res.data)) {
            this.form = model()
            this.foto = null
            this.$router.push({ name: 'dataDokterOpt' })
          }
        }).catch(() => this.$commonErrorNotif())
    },
    edit () {
      this.$showLoading()
      const formData = new FormData()
      formData.append('fotoprofil', this.foto)
      formData.append('data', JSON.stringify(this.form))
      this.$axios
        .put(`opt/dokter/${this.$route.params.id}`, formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          if (this.$parseResponse(res.data)) {
            this.form = model()
            this.foto = null
            this.$router.push({ name: 'dataDokterOpt' })
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
