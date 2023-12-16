<template>
  <q-page style="background-color: #FAFAFA;">
    <div class="column">
      <div class="row justify-between items-center" :style="`background: #024830; ${this.$q.screen.sm || this.$q.screen.xs ? 'padding: 20px' : 'padding: 40px 200px;'}`">
        <div class="col">
          <div class="text-h4 text-weight-medium text-grey-1 q-mb-sm">{{ dataBeasiswa.nama_beasiswa }}</div>
          <div class="text-body1 text-grey-1">{{ dataBeasiswa.institusi_pendidikan.nama_institusi }}</div>
          <q-separator class="q-mt-md q-mb-md" style="background: #FFBB16;" />
          <div v-if="isShow" class="q-gutter-xs">
            <div class="row text-grey-1 text-body">Penanggung Jawab: {{ dataBeasiswa.penanggung_jawab }} </div>
            <div class="row text-grey-1 text-body">Kuota Penerima: {{ dataBeasiswa.kuota_penerima }} Peserta</div>
            <div class="row text-grey-1 text-body">Tanggal Mulai: {{ this.$parseDate(dataBeasiswa.tanggal_dimulai).fullDate }} </div>
            <div class="row text-grey-1 text-body">Tanggal Akhir: {{ this.$parseDate(dataBeasiswa.tanggal_selesai).fullDate }} </div>
          </div>
          <div v-if="this.$route.name === 'detailbeasiswaAdmin' || this.$route.name === 'detailbeasiswaInstitut' " class="row q-gutter-sm q-py-sm">
            <q-btn @click="showEdit" label="Edit Beasiswa" no-caps color="amber"/>
            <q-btn @click="deleteItem" label="Hapus Beasiswa" no-caps color="negative"/>
          </div>
          <div v-else class="row q-gutter-sm q-py-sm">
            <q-btn @click="alertAccept(dataBeasiswa.url_pendaftaran)" label="Ajukan Pendaftaran" no-caps :color="isOpen(dataBeasiswa.tanggal_dimulai, dataBeasiswa.tanggal_selesai) ? 'amber' : 'grey'" :disable="!isOpen(dataBeasiswa.tanggal_dimulai, dataBeasiswa.tanggal_selesai)"/>
            <q-btn @click="dialog = !dialog" label="Ajukan Surat Rekomendasi e-KPB" no-caps color="amber" :disable="!isOpen(dataBeasiswa.tanggal_dimulai, dataBeasiswa.tanggal_selesai)"/>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-sm q-pt-xl">
      <iframe class="full-width" style="height: 800px;" :src="dataBeasiswa.url_persyaratan" frameborder="1"></iframe>
    </div>
    <q-dialog
      v-model="dialog"
      persistent
      full-height>
      <q-card>
        <q-card-section>
          <div class="text-h6">Ajukan Surat Rekomendasi</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md">
            <q-form
              @submit="onCreateRecomendation"
              class="q-gutter-xs">
              <div class="row justify-between">
                <q-input
                  label="Nik Orang Tua"
                  v-model="form.nik_wali"
                  disable
                  outlined
                  style="width: 48%"
                  :rules="[val => !!val || 'Isi Nama Orang Tua']"/>
                <q-input
                  label="Nama Orang Tua"
                  v-model="this.$getProfile().nama"
                  disable
                  outlined
                  style="width: 48%"
                  :rules="[val => !!val || 'Isi Nama Orang Tua']"/>
              </div>
              <q-input
                label="Nama Siswa"
                v-model="form.nama_siswa"
                outlined
                :rules="[val => !!val || 'Isi Nama Siswa']" />
              <q-input
                label="Asal Sekolah"
                v-model="form.asal_sekolah"
                outlined
                :rules="[val => !!val || 'Isi Asal Sekolah']"/>
              <q-input
                label="No. SKL / Ijasah"
                v-model="form.no_sk"
                outlined
                :rules="[val => !!val || 'Isi No. SKL / Ijasah']"/>
              <q-input
                label="No. NISN"
                v-model="form.nisn"
                outlined
                :rules="[val => !!val || 'Isi No. NISN']"/>
              <q-input
                label="Nilai UN"
                v-model="form.nilai_un"
                outlined
                :rules="[val => !!val || 'Isi Nilai UN']"/>
              <div class="row">
                <q-input
                  label="Tempat Lahir"
                  v-model="form.tempat_lahir"
                  class="q-mr-xs"
                  outlined
                  :rules="[val => !!val || 'Isi Tempat Lahir']"/>
                <q-input outlined class="q-ml-xs" v-model="form.tanggal_lahir" label="Tanggal Lahir">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date landscape v-model="form.tanggal_lahir" mask="dddd, D MMM YYYY">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <!-- <q-input label="Tanggal Lahir" class="q-ml-xs" outlined/> -->
              </div>
              <hr>
              <div class="row q-gutter-sm q-mt-sm">
                <q-space/>
                <q-btn flat label="Batal" color="primary" no-caps v-close-popup />
                <q-btn type="submit" label="Lanjutkan" color="primary"  no-caps />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="dialogEdit"
      full-height
      full-width
      persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Form Pengisian</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" class="q-gutter-sm">
            <q-input
              outlined
              v-model="editData.nama_beasiswa"
              label="Nama Beasiswa"/>
            <q-input
              outlined
              v-model="editData.institusi_pendidikan.nama_institusi"
              label="Nama Universitas"
              disable
            />
            <q-input
              outlined
              v-model="editData.penanggung_jawab"
              label="Nama Penanggung Jawab"/>
            <q-input
              outlined
              type="number"
              v-model="editData.kuota_penerima"
              label="Kuota Penerima"/>
            <div class="row justify-between">
              <q-input outlined style="width: 49%" v-model="editData.tanggal_dimulai" label="Tanggal Mulai">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date landscape v-model="editData.tanggal_dimulai" mask="dddd, D MMM YYYY">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input outlined style="width: 49%" v-model="editData.tanggal_selesai" label="Tanggal Akhir">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date landscape v-model="editData.tanggal_selesai" mask="dddd, D MMM YYYY">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <q-input
              outlined
              type="textarea"
              v-model="editData.keterangan"
              label="Keterangan"/>
            <q-input
              outlined
              v-model="editData.url_persyaratan"
              label="Url Persyaratan"/>
            <q-input
              outlined
              v-model="editData.url_pendaftaran"
              label="Url Pendaftaran"/>
            <div class="row" align="right">
              <q-space/>
              <q-btn @click="hideEdit" flat label="Cancel"/>
              <q-btn color="primary" type="submit" label="OK" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      isShow: true,
      dialog: false,
      dialogEdit: false,
      form: {
        nik_wali: this.$getProfile().nik,
        nama_siswa: '',
        asal_sekolah: '',
        no_sk: null,
        nisn: null,
        nilai_un: 0.0,
        status_pengajuan: 0,
        tempat_lahir: '',
        tanggal_lahir: date.formatDate(Date.now(), 'dddd, D MMM YYYY'),
        id_beasiswa: this.$route.params.id
      },
      editData: {},
      dataBeasiswa: {
        nama_beasiswa: '',
        institusi_pendidikan: {
          nama_institusi: ''
        }
      },
      option: []
    }
  },
  created () {
    this.getData()
    this.getUniv()
  },
  methods: {
    resetData () {
      this.form = {
        nik_wali: this.$getProfile().nik,
        nama_siswa: '',
        asal_sekolah: '',
        no_sk: null,
        nilai_un: 0.0,
        tempat_lahir: '',
        tanggal_lahir: date.formatDate(Date.now(), 'dddd, D MMM YYYY'),
        id_beasiswa: this.$route.params.id
      }
    },
    deleteItem () {
      this.$q.dialog({
        title: 'Yakin Ingin Menghapus ?',
        message: 'Segala bentuk penghapusan data ini tidak dapat dikembalikan',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$showLoading()
        this.$axios.delete(`beasiswa/deleteBeasiswa/${this.$route.params.id}`, this.$createToken())
          .finally(() => this.$hide())
          .then((res) => {
            if (res.data.status) {
              this.$router.go(-1)
              this.$notif(res.data.message, 'positive')
            } else {
              this.$notif(res.data.message, 'negative')
            }
          })
          .catch(() => this.$commonErrorNotif())
      }).onCancel(() => {
      })
    },
    showEdit () {
      this.editData = this.dataBeasiswa
      this.editData.tanggal_dimulai = date.formatDate(this.dataBeasiswa.tanggal_dimulai, 'dddd, D MMM YYYY')
      this.editData.tanggal_selesai = date.formatDate(this.dataBeasiswa.tanggal_selesai, 'dddd, D MMM YYYY')
      this.dialogEdit = true
    },
    hideEdit () {
      this.dialogEdit = false
    },
    getUniv () {
      this.$showLoading()
      this.$axios.get('beasiswa/getAllUniv', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          this.stringOptions = res.data.result
          this.option = this.stringOptions
        })
        .catch(() => this.$commonErrorNotif())
    },
    getData () {
      this.$showLoading()
      this.$axios.get(`beasiswa/getBeasiswa/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          this.dataBeasiswa = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.option = this.stringOptions.filter(v => v.nama_institusi.toLowerCase().indexOf(needle) > -1)
      })
    },
    onCreateRecomendation () {
      this.$showLoading()
      this.$axios.post('beasiswa/createRecomendation', this.form)
        .finally(() => this.$hide())
        .then((res) => {
          if (res.data.status) {
            this.dialog = !this.dialog
            this.resetData()
            this.$notif(res.data.message, 'positive')
          } else {
            this.$notif(res.data.message, 'negative')
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.$showLoading()
      this.$axios.put(`beasiswa/updateBeasiswa/${this.$route.params.id}`, {
        nama_beasiswa: this.editData.nama_beasiswa,
        penanggung_jawab: this.editData.penanggung_jawab,
        kuota_penerima: this.editData.kuota_penerima,
        tanggal_dimulai: this.editData.tanggal_dimulai,
        tanggal_selesai: this.editData.tanggal_selesai,
        keterangan: this.editData.keterangan,
        url_persyaratan: this.editData.url_persyaratan,
        url_pendaftaran: this.editData.url_pendaftaran
      }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (res.data.status) {
            this.getData()
            this.hideEdit()
            this.$notif(res.data.message, 'positive')
          } else {
            this.$notif(res.data.message, 'negative')
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    alertAccept (url) {
      this.$q.dialog({
        title: 'Setuju Untuk Mendaftar ?',
        message: 'Segala bentuk uang pendaftaran tidak dapat dikembalikan dan harus mengikuti segala persyaratan yang berlaku',
        // options: {
        //   type: 'checkbox',
        //   model: [],
        //   isValid: model => model.includes('opt2'),
        //   items: [
        //     { label: 'Saya terima persyaratan tersebut', value: 'opt2', color: 'primary' }
        //   ]
        // },
        cancel: true,
        persistent: true
      }).onOk(() => {
        window.open(url, '_blank')
      }).onCancel(() => {
      })
    },
    isOpen (masuk, selesai) {
      const tanggalMasuk = Date.parse(masuk)
      const tanggalSelesai = Date.parse(selesai) // Konversi created_at menjadi nilai timestamp
      const tangalIni = Date.now() // Waktu saat ini

      const selisihMasuk = Math.floor((tangalIni - tanggalMasuk) / (1000 * 60 * 60 * 24))
      const selisihSelesai = Math.floor((tangalIni - tanggalSelesai) / (1000 * 60 * 60 * 24))
      return selisihMasuk >= 0 && selisihSelesai <= 0
    }
  }
}
</script>
