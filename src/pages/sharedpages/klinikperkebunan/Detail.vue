<template>
  <q-page style="background: #EFF6F1">
    <q-form @submit="onSubmit">
    <div style="background: #32573F; height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  absolute-top`" style="margin-top: 55px">
      <div class="bg-white q-pa-sm row items-center">
        <q-btn class="q-mx-sm" rounded icon="mdi-arrow-left" @click="this.$router.go(-1)" dense flat/>
        <span class="text-bold col">Formulir Pengajuan</span>
      </div>
    </div>
    <div v-if="access === 'disbunkabupaten' || access === 'disbunprovinsi'" :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-md bg-white q-pa-sm q-pt-md`">
      <span class="q-ml-md text-h6">Pilih Tindakan</span>
      <div class="q-ma-sm row">
        <div class="q-pa-sm">
          <q-btn label="Jawab Pertanyaan" style="background-color: #153D19; color: #fff;" unelevated @click="onJawawbanOpen('jawab')"/>
        </div>
        <div class="q-pa-sm">
          <q-btn label="Edit Jawaban" style="background-color: #153D19; color: #fff;" unelevated @click="onJawawbanOpen('jawab')"/>
        </div>
        <div class="q-pa-sm" v-if="access === 'disbunkabupaten'">
          <q-btn label="Ajukan Ke UPTD" style="background-color: #153D19; color: #fff;" unelevated @click="onAjukanKeUptd"/>
        </div>
        <div class="q-pa-sm" v-if="access === 'disbunprovinsi'">
          <q-btn label="Kunjungan lapangan" style="background-color: #153D19; color: #fff;" unelevated @click="onJawawbanOpen('tanggal')"/>
        </div>
        <div class="q-pa-sm" v-if="access === 'disbunprovinsi'">
          <q-btn label="Edit Tanggal" style="background-color: #153D19; color: #fff;" unelevated @click="onJawawbanOpen('tanggal')"/>
        </div>
      </div>
      <q-dialog
      v-model="jawaban"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Jawab Pengaduan</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-mb-md" v-if="type === 'tanggal'">
          <div class="text-h6">Hasil Identifikasi</div>
          <q-input  v-model="form.tanggal_kunjungan" label="Tanggal Kunjungan" mask="date" :rules="['form.tanggal_kunjungan']" dense outlined>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.tanggal_kunjungan">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          </div>
          <div class="q-mb-md">
          <div class="text-h6">Hasil Identifikasi</div>
        <q-input
            v-model="form.hasil"
            label="Hasil Identifikasi"
            outlined
            dense
            type="textarea"
          />
          </div>
          <div class="">
          <div class="text-h6">Rekomendasi</div>
        <q-input
            v-model="form.rekomendasi"
            label="Rekomendasi"
            outlined
            dense
            type="textarea"
          />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Batal" outline unelevated v-close-popup/>
          <q-btn label="Kirim jawaban" style="background-color: #153D19; color: #fff;" unelevated @click="onKirimJawaban(form.id)"/>

        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-md bg-white q-pa-sm q-pt-md`">
      <span class="q-ml-md text-h6">1. Pengisian Data Diri</span>
      <div class="q-ma-sm">
        <div class="q-pa-sm">
          <q-input
            v-model="form.nama"
            outlined
            dense
            disable
            label="Nama"></q-input>
        </div>
        <div class="q-pa-sm">
          <q-input
            v-model="form.nohp"
            outlined
            dense
            disable
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
                disable
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
            disable
            :rules="$defaultValidation"
            :options="listKomoditas"
            option-label="komoditas"
            option-value="name"
          />
        </div>
        <div class="q-pa-sm row">
          <q-input
            v-model="form.fotodaun"
            outlined
            dense
            disable
            label="Foto Daun"></q-input>
            <q-btn label="Lihat Foto Daun" outline unelevated :href="`${$baseURL}/file-klinik/${form.fotodaun}`" tag="a" target="_blank"/>

        </div>
        <div class="q-pa-sm row">
          <q-input
            v-model="form.fotobuah"
            outlined
            dense
            disable
            label="Foto Buah"></q-input>
            <q-btn label="Lihat Foto Buah" outline unelevated :href="`${$baseURL}/file-klinik/${form.fotobuah}`" tag="a" target="_blank"/>
        </div>
        <div class="q-pa-sm row">
          <q-input
            v-model="form.fotobatang"
            outlined
            dense
            disable
            label="Foto Batang"></q-input>
            <q-btn label="Lihat Foto Batang" outline unelevated :href="`${$baseURL}/file-klinik/${form.fotobatang}`" tag="a" target="_blank"/>

        </div>
        <div class="q-pa-sm row">
          <q-input
            v-model="form.fotoakar"
            outlined
            dense
            disable
            label="Foto Akar"></q-input>
            <q-btn label="Lihat Foto Akar" outline unelevated :href="`${$baseURL}/file-klinik/${form.fotoakar}`" tag="a" target="_blank"/>

        </div>
        <div class="q-pa-sm">
        <q-input
            v-model="form.deskripsi"
            label="Deskripsi"
            outlined
            dense
            disable
            type="textarea"
          />
          </div>
        <div class="q-pa-sm">
          <q-input
            v-model="form.provinsi"
            label="Alamat Lahan"
            outlined
            dense
            disable
          />
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
            disable
            type="number"
            label="Luas Lahan (Ha)"></q-input>
        </div>
        <div class="q-pa-sm">
          <q-input
            v-model="form.luasserangan"
            outlined
            dense
            disable
            type="number"
            label="Luas Serangan (Ha)"></q-input>
        </div>
        <div class="q-pa-sm">
        <q-input
            v-model="form.alamatlahan"
            label="Alamat Lahan"
            outlined
            dense
            disable
            type="textarea"
          />
          </div>
          <div class="row">
            <div class="q-pa-sm col-md-6 col-sm-12 col-xs-12">
              <q-input
            v-model="form.provinsi"
            label="Alamat Lahan"
            outlined
            dense
            disable
          />
              </div>
              <div class="q-pa-sm col-md-6 col-sm-12 col-xs-12">
              <q-input
            v-model="form.kabupaten"
            label="Alamat Lahan"
            outlined
            dense
            disable
          />
              </div>
              </div>
              <div class="row">
            <div class="q-pa-sm col-md-6 col-sm-12 col-xs-12">
              <q-input
            v-model="form.kecamatan"
            label="Alamat Lahan"
            outlined
            dense
            disable
          />
              </div>
              <div class="q-pa-sm col-md-6 col-sm-12 col-xs-12">
              <q-input
            v-model="form.desa"
            label="Alamat Lahan"
            outlined
            dense
            disable
          />
              </div>
              </div>
      </div>
    </div>
  </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue'
const model = () => {
  return {
    id: '',
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
    desa: '',
    fotodaun: null,
    fotobuah: null,
    fotobatang: null,
    fotoakar: null,
    hasil: '',
    rekomendasi: '',
    tanggal_kunjungan: ''
  }
}
export default {
  setup () {
    return {
      jawaban: ref(false),
      type: ref('')
    }
  },
  data () {
    return {
      form: model(),
      listKomoditas: [],
      option_intensitas: ['anjing', 'babi'],
      listIntensitas: [
        'Ringan', 'Sedang', 'Berat', 'Puso'
      ],
      access: ''
    }
  },
  async created () {
    this.getData()
  },
  methods: {
    getData () {
      this.access = this.$getProfile().member.users_login.access
      console.log('this', this.$getProfile())
      this.form.komoditas = null
      this.$axios.get(`klinik/detailklinik/${this.$route.params.id}`, this.$createToken())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.form = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onKirimJawaban () {
      this.$showLoading()

      const newData = {
        hasil: this.form.hasil,
        rekomendasi: this.form.rekomendasi,
        status: 'Terjawab',
        tanggal_kunjungan: this.form.tanggal_kunjungan
      }

      this.$axios.put(`klinik/jawabpengajuan/${this.form.id}`, newData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          if (res.data.status) {
            this.$notif(res.data.message)
            this.jawaban = false
          } else {
            this.$notif(res.data.message, 'negative')
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    onAjukanKeUptd () {
      this.$showLoading()

      const newData = {
        status: 'Verifikasi UPTD'
      }

      this.$axios.put(`klinik/keuptd/${this.form.id}`, newData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          if (res.data.status) {
            this.$notif(res.data.message)
            this.jawaban = false
          } else {
            this.$notif(res.data.message, 'negative')
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    onJawawbanOpen (type) {
      this.jawaban = true
      this.type = type
    }
  }
}
</script>

<style scoped>

</style>
