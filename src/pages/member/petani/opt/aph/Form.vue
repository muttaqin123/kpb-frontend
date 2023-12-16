<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div class="text-h6">Input APH</div>
        <div>Layanan pengajuan APH</div>
        <q-form @submit="onSubmit" class="q-mt-md">
          <q-select
            v-model="masterAPH"
            label="Pilih APH"
            outlined
            :rules="$defaultValidation"
            :options="listAPH"
            option-label="nama_aph"
            option-value="id_aph"
          />
          <q-input
            v-model="form.pemohon"
            label="Nama Pemohon"
            outlined
            :rules="$defaultValidation"
          />
          <q-input
            v-model="form.alamatpemohon"
            label="Alamat Pemohon"
            outlined
            :rules="$defaultValidation"
          />
          <q-input
            v-model="form.telppemohon"
            label="Telp Pemohon"
            type="number"
            outlined
            :rules="$defaultValidation"
          />
          <area-kabupaten auto-load withAction :action="setLPHP" :outline="true"/>
          <area-kecamatan :outline="true"/>
          <q-input
            v-model="form.lphp"
            label="LPHP"
            readonly
            outlined
            :rules="$defaultValidation"
          />
          <q-btn type="submit" label="Simpan Pengaduan" unelevated color="primary"/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import GetLPHP from 'src/helper/GetLPHP'
const model = () => {
  return {
    nik: null,
    pemohon: null,
    alamatpemohon: null,
    kabupatenpemohon: null,
    kecamatanpemohon: null,
    telppemohon: null,
    id_aph: null,
    lphp: null
  }
}
export default {
  data () {
    return {
      GetLPHP,
      masterAPH: null,
      listAPH: [],
      form: model(),
      files: null,
      jenisdpi: null,
      kategoridpi: null
    }
  },
  async created () {
    this.$resetArea()
    this.getKomoditas()
  },
  methods: {
    getKomoditas () {
      this.masterAPH = null
      this.$axios.get('opt/aph', this.$createToken())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listAPH = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    setLPHP () {
      this.form.lphp = GetLPHP[this.$store.state.area.kabupaten.id]
    },
    onSubmit () {
      this.$showLoading()
      this.form.nik = this.$getProfile().nik
      this.form.id_aph = this.masterAPH.id_aph
      this.form.kabupatenpemohon = this.$store.state.area.kabupaten.name
      this.form.kecamatanpemohon = this.$store.state.area.kecamatan.name
      this.$axios.post('opt/permohonan-starter', this.form, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          if (this.$parseResponse(res.data)) {
            this.form = model()
            this.files = null
            this.$router.push({ name: 'permohonanAPHPetani' })
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
