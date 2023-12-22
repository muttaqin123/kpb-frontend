<template>
  <q-page style="background: #EFF6F1">
    <q-form @submit="onSubmit">
    <div style="background: #32573F; height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  absolute-top`" style="margin-top: 55px">
      <div class="bg-white q-pa-sm row items-center">
        <span class="text-bold col">Formulir Pengajuan</span>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-md bg-white q-pa-sm q-pt-md`">
      <span class="q-ml-md text-h6">1. Pengisian Data Diri</span>
      <div class="q-ma-sm">
        <div class="q-pa-sm">
          <q-input
            v-model="form.nama"
            outlined
            dense
            label="Nama"></q-input>
        </div>
        <div class="q-pa-sm">
          <q-input
            v-model="form.nohp"
            outlined
            dense
            label="Nomor telepon"></q-input>
        </div>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  bg-white q-pa-sm q-pt-md`">
      <span class="q-ml-md text-h6">2. Pengisian Data Tanaman</span>
      <div class="q-ma-sm">
        <div class="q-pa-sm">
            <q-select
                label="Intensitas Serangan"
                :options="option_intensitas"
                v-model="form.intensitasserangan"
                outlined
                dense
                :rules="[
                  val => (val != '')|| 'Pilih Intensitas Serangan'
                ]"/>
        </div>
        <div class="q-pa-sm">
          <q-select
            v-model="form.komoditas"
            label="Pilih Komoditas"
            outlined
            dense
            :rules="$defaultValidation"
            :options="listKomoditas"
            option-label="komoditas"
            option-value="name"
          />
        </div>
        <div class="q-pa-sm">
          <q-file
            v-model="fotodaun"
            outlined
            dense
            accept=".pdf, .png, .jpg, .jpeg"
            label="Foto Daun">
              <template v-slot: append>
                <q-icon name="attach_file"/>
              </template>
          </q-file>
        </div>
        <div class="q-pa-sm">
          <q-file
            v-model="fotobuah"
            outlined
            dense
            accept=".pdf, .png, .jpg, .jpeg"
            label="Foto Buah">
              <template v-slot: append>
                <q-icon name="attach_file"/>
              </template>
          </q-file>
        </div>
        <div class="q-pa-sm">
          <q-file
            v-model="fotobatang"
            outlined
            dense
            accept=".pdf, .png, .jpg, .jpeg"
            label="Foto Batang">
              <template v-slot: append>
                <q-icon name="attach_file"/>
              </template>
          </q-file>
        </div>
        <div class="q-pa-sm">
          <q-file
            v-model="fotoakar"
            outlined
            dense
            accept=".pdf, .png, .jpg, .jpeg"
            label="Foto Akar">
              <template v-slot: append>
                <q-icon name="attach_file"/>
              </template>
          </q-file>
        </div>
        <div class="q-pa-sm">
        <q-input
            v-model="form.deskripsi"
            label="Deskripsi"
            outlined
            dense
            type="textarea"
          />
          </div>
        <div class="q-pa-sm">
          <area-provinsi :outline="true"/>
          </div>

      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-md bg-white q-pa-sm q-pt-md`">
      <span class="q-ml-md text-h6">3. Pengisian Data Lahan</span>
      <div class="q-ma-sm">
        <div class="q-pa-sm">
          <q-input
            v-model="form.luaslahan"
            outlined
            dense
            type="number"
            label="Luas Lahan (Ha)"></q-input>
        </div>
        <div class="q-pa-sm">
          <q-input
            v-model="form.luasserangan"
            outlined
            dense
            type="number"
            label="Luas Serangan (Ha)"></q-input>
        </div>
        <div class="q-pa-sm">
        <q-input
            v-model="form.alamatlahan"
            label="Alamat Lahan"
            outlined
            dense
            type="textarea"
          />
          </div>
          <div class="row">
            <div class="q-pa-sm col-md-6 col-sm-12 col-xs-12">
              <area-provinsi :outline="true"/>
              </div>
              <div class="q-pa-sm col-md-6 col-sm-12 col-xs-12">
              <area-kabupaten :outline="true"/>
              </div>
              </div>
              <div class="row">
            <div class="q-pa-sm col-md-6 col-sm-12 col-xs-12">
              <area-kecamatan :outline="true"/>
              </div>
              <div class="q-pa-sm col-md-6 col-sm-12 col-xs-12">
              <area-desa :outline="true"/>
              </div>
              </div>
      </div>
    </div>
    <div class="q-mx-xl q-mb-xl">
      <q-btn
      type="submit"
        class="full-width text-bold"
        style="background: #1E56E5; color: white"
        label="KIRIM PERMOHONAN">
      </q-btn>
    </div>
  </q-form>
  </q-page>
</template>

<script>
const model = () => {
  return {
    nik: '',
    nama: '',
    nohp: '',
    intensitasserangan: '',
    komoditas: '',
    deskripsi: '',
    luaslahan: '',
    luasserangan: '',
    alamatlahan: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    desa: ''
  }
}
export default {

  data () {
    return {
      fotodaun: null,
      fotobuah: null,
      fotobatang: null,
      fotoakar: null,
      form: model(),
      listKomoditas: [],
      option_intensitas: [
        'Ekonomi', 'Ringan', 'Sedang', 'Berat'
      ]
    }
  },
  async created () {
    this.getKomoditas()
  },
  methods: {
    getKomoditas () {
      this.form.komoditas = null
      this.$axios.get('master/komoditas-opt', this.$createToken())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listKomoditas = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.$showLoading()
      this.form.nik = this.$getProfile().nik
      const formData = new FormData()

      this.form.provinsi = this.$store.state.area.provinsi.nama
      this.form.kabupaten = this.$store.state.area.kabupaten.name
      this.form.kecamatan = this.$store.state.area.kecamatan.name
      this.form.desa = this.$store.state.area.desa.name

      formData.append('fotodaun', this.fotodaun)
      formData.append('fotobuah', this.fotobuah)
      formData.append('fotobatang', this.fotobatang)
      formData.append('fotoakar', this.fotoakar)

      formData.append('data', JSON.stringify(this.form))

      this.$axios.post('klinik/addpengajuanklinik', formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          console.log('res', res)
          if (res.data.status) {
            this.$notif(res.data.message)
            this.form = model()
            this.data = model()
            this.$router.push({ name: 'riwayatPengajuanKlinikPerkebunan', params: { idRole: '6', idLayanan: '34', idFitur: '82' } })
          } else {
            this.$notif(res.data.message, 'negative')
          }
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>

<style scoped>

</style>
