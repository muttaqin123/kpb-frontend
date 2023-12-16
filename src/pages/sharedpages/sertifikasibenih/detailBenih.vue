<template>
  <q-page padding>
    <div class="q-pa-md border-shadow q-mx-md q-mt-md">
      <div class="row items-center text-green-10">
        <div class="col-1 q-mr-md flex flex-center">
          <q-img src="img/sertif_benih/icon_sertif.png" style="width: 80%" />
        </div>
        <div class="col q-gutter-xs">
          <div class="text-h5 text-weight-bold">Pengajuan Sertifikasi {{ data.jenis_benih }}</div>
          <span class="text-weight-medium">Sertifikasi Siap Salur</span> <br>
          <q-badge v-if="data.status == 0" class="q-pa-sm" color="yellow-8" label="Sedang Diverifikasi" />
          <q-badge v-if="data.status == 1" class="q-pa-sm" color="blue-8" label="Pengujian Lapangan" />
          <q-badge v-if="data.status == 4" class="q-pa-sm" color="blue-8" label="Re-Schedule" />
          <q-badge v-if="data.status == 2" class="q-pa-sm" color="info" label="Pengujian Laboratorium" />
          <q-badge v-if="data.status == 3" class="q-pa-sm" color="positive" label="Sertifikasi Berhasil" />
          <q-badge v-if="data.status == 5" class="q-pa-sm" color="negative" label="Ditolak" />
        </div>
        <div class="col-auto">
          <div class="column q-gutter-sm justify-end">
            <q-btn
              v-if="data.status == 3"
              type="a"
              target="_blank"
              :href="`${$baseURL}file-sertif/${data.sertifikat}`"
              label="Unduh Sertifikat"
              color="yellow-8"
              padding="xs xl"
              no-caps />
            <q-btn
              v-if="data.status == 3 && data.benih_diajukan !== data.benih_sertifikasi"
              type="a"
              target="_blank"
              :href="`${$baseURL}file-sertif/${data.chld_history_sertifikasi_benih[data.chld_history_sertifikasi_benih.length-1].file}`"
              label="Unduh Keterangan Benih yang gagal"
              color="yellow-8"
              padding="xs xl"
              no-caps />
            <q-btn
              v-if="data.status != 3 && data.chld_history_sertifikasi_benih[data.chld_history_sertifikasi_benih.length - 1].file != null"
              type="a"
              target="_blank"
              :href="`${$baseURL}file-sertif/${data.chld_history_sertifikasi_benih[data.chld_history_sertifikasi_benih.length - 1].file}`"
              label="Keterangan"
              color="blue-8"
              padding="xs xl"
              no-caps />
            <q-btn @click="dialog(1, true)" v-if="isRouteBppmb && (data.status === 0)" label="Verifikasi Berkas" color="positive" padding="xs xl" no-caps/>
            <q-btn @click="dialog(4, true)" v-if="isRouteBppmb && (data.status === 1 || data.status === 4)" label="Re-Schedule Lapangan" color="info" padding="xs xl" no-caps/>
            <q-btn @click="dialog(2, true)" v-if="isRouteBppmb && (data.status === 1 || data.status === 4)" label="Verifikasi Lapangan" color="positive" padding="xs xl" no-caps/>
            <q-btn @click="dialog(3, true)" v-if="isRouteBppmb && (data.status === 2)" label="Verifikasi Laboratorium" color="positive" padding="xs xl" no-caps/>
            <q-btn @click="dialog(5, false)" v-if="isRouteBppmb && (data.status !== 5 && data.status !== 3)" label="Tolak Verifikasi" color="negative" padding="xs xl" no-caps/>
          </div>
        </div>
      </div>
    </div>
    <div class="row text-green-10">
      <div class="col-md-4 col-sm-12 col-xs-12 q-pa-md ">
        <div v-if="data.status === 3" class="q-pa-sm q-mb-sm column bg-white border-shadow">
          <span class="text-h5 text-weight-bold">Benih Yang Diajukan</span>
          <span>{{ data.benih_diajukan }} Benih</span>
          <span class="text-h5 text-weight-bold">Benih Yang Diterima</span>
          <span>{{ data.benih_sertifikasi }} Benih</span>
        </div>
        <div class="column bg-white border-shadow q-pa-sm">
          <div class="text-h5 text-weight-bold">Status Sertifikasi Anda</div>
          <div>Proses Timeline Sertifikasi</div>
          <q-timeline color="secondary" class="q-pa-sm">
            <q-timeline-entry
              v-for="(d,i) in data.chld_history_sertifikasi_benih"
              :key="i"
              :title="d.status === '0' ? 'Pengecekan Berkas' : d.status === '1' ? 'Pengecekan Lapangan' : d.status === '2' ? 'Pengecekan Laboratorium' : d.status === '3' ? 'Sertifikasi Berhasil' :  d.status === '4' ? 'Re-Schedule' : 'Ditolak'"
              :subtitle="this.$parseDate(d.tanggal_perubahan).timeCustom"
              :color="d.status === '5' ? 'negative' : d.status != '3' ? 'yellow-9' : 'positive'"
              :icon="d.status === 5 ? 'close' : d.status != '3' ? 'mdi-cogs' : 'done'"
            >
              <span>
                {{ d.comment != null ? d.comment : '-' }}
              </span>
            </q-timeline-entry>
          </q-timeline>
        </div>
      </div>
      <div class="col-md-8 col-sm-12 q-pa-sm">
        <div class="q-pa-sm">
          <div class="bg-white border-shadow q-pa-sm">
            <div class="text-h5 text-weight-bold ">
              Data Diri Pemohon
            </div>

            <q-input
              outlined
              class="q-pa-sm"
              v-model="data.ktp.nama"
              disable
              label="Nama Pemohon"/>

            <q-input
              outlined
              class="q-pa-sm"
              disable
              v-model="data.namaPerusahaan"
              label="Nama Perusahaan"/>

            <div class="row justify-between">
              <q-input
                class="col-md-3 q-pa-sm"
                outlined
                disable
                v-model="data.ktp.member.reg_provinces.name"
                label="Provinsi"/>
              <q-input
                class="col-md-3 q-pa-sm"
                outlined
                disable
                v-model="data.ktp.member.reg_regencies.name"
                label="Kabupaten"/>
              <q-input
                class="col-md-3 q-pa-sm"
                outlined
                disable
                v-model="data.ktp.member.reg_districts.name"
                label="Kecamatan"/>
              <q-input
                class="col-md-3 q-pa-sm"
                outlined
                disable
                v-model="data.ktp.member.reg_villages.name"
                label="Desa"/>
            </div>
            <q-input
              v-model="data.ktp.alamat"
              label="Lokasi Anda"
              type="textarea"
              class="q-pa-sm"
              outlined
              disable
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <div class="row">
              <q-input class="q-ma-xs col" disable outlined v-model="data.ktp_image" label="Upload KTP"/>
              <div class="flex flex-center">
                <q-btn
                  color="primary"
                  label="Unduh"
                  padding="sm md"
                  no-caps
                  type="a"
                  target="_blank"
                  :href="`${$baseURL}file-sertif/${data.ktp_image}`"/>
              </div>
            </div>
          </div>
        </div>
        <div class="q-pa-sm">
          <div class="column bg-white border-shadow q-pa-sm">
            <div class="text-h6 text-weight-bold  q-mt-sm">
              Data Kebun Pemohon
            </div>

            <div class="row">
              <q-input class="q-ma-xs col" disable outlined v-model="data.desain_kebun" label="Upload Desain Kebun"/>
              <div class="flex flex-center">
                <q-btn
                  color="primary"
                  label="Unduh"
                  padding="sm md"
                  no-caps
                  type="a"
                  target="_blank"
                  :href="`${$baseURL}file-sertif/${data.desain_kebun}`"/>
              </div>
            </div>
            <div class="row">
              <q-input class="q-ma-xs col" disable outlined v-model="data.catatan_pemeliharaan_kebun" label="Upload Catatan Pemeliharaan Kebun"/>
              <div class="flex flex-center">
                <q-btn
                  color="primary"
                  label="Unduh"
                  padding="sm md"
                  no-caps
                  type="a"
                  target="_blank"
                  :href="`${$baseURL}file-sertif/${data.catatan_pemeliharaan_kebun}`"/>
              </div>
            </div>
            <q-input
              v-model="data.alamat"
              label="Lokasi Kebun Anda"
              type="textarea"
              disable
              outlined
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <GoogleMap api-key="AIzaSyCWmOBCzRrPIlgUeBA0RjSwBvHcPsDuxEc" style="height: 50vh" :center="map.center" :zoom="map.zoom">
              <Marker :options="{ position: marker }" />
            </GoogleMap>
          </div>
        </div>
        <div class="q-pa-sm">
          <div class="column bg-white border-shadow q-pa-sm">
            <span class="text-h5 text-weight-bold">File Sertifikasi Anda</span>
            <span>File yang sudah diupload</span>
            <q-input
              class="q-ma-xs"
              outlined
              disable
              v-model="data.jenis_benih"
              label="Jenis Benih"/>
            <q-input
              class="q-ma-xs"
              v-model="data.benih_diajukan"
              label="Jumlah Benih"
              type="number"
              outlined
              disable
            />
            <div class="row">
              <q-input class="q-ma-xs col" disable outlined v-model="data.surat_permohonan" label="Surat Permohonan"/>
              <div class="flex flex-center">
                <q-btn
                  color="primary"
                  label="Unduh"
                  padding="sm md"
                  no-caps
                  type="a"
                  target="_blank"
                  :href="`${$baseURL}file-sertif/${data.surat_permohonan}`"/>
              </div>
            </div>
            <div class="row">
              <q-input class="q-ma-xs col" disable outlined v-model="data.iup" label="IUP"/>
              <div class="flex flex-center">
                <q-btn
                  color="primary"
                  label="Unduh"
                  padding="sm md"
                  no-caps
                  type="a"
                  target="_blank"
                  :href="`${$baseURL}file-sertif/${data.iup}`" />
              </div>
            </div>
            <div class="row">
              <q-input class="q-ma-xs col" disable outlined v-model="data.surat_asal_benih" label="Surat Asal Usul Benih"/>
              <div class="flex flex-center">
                <q-btn
                  color="primary"
                  label="Unduh"
                  padding="sm md"
                  no-caps
                  type="a"
                  target="_blank"
                  :href="`${$baseURL}file-sertif/${data.surat_asal_benih}`" />
              </div>
            </div>
            <div class="row">
              <q-input class="q-ma-xs col" disable outlined v-model="data.do_pengiriman" label="DO Pengiriman"/>
              <div class="flex flex-center">
                <q-btn
                  color="primary"
                  label="Unduh"
                  padding="sm md"
                  no-caps
                  type="a"
                  target="_blank"
                  :href="`${$baseURL}file-sertif/${data.do_pengiriman}`" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <q-dialog v-model="prompt">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="flex flex-center column ">
            <q-icon :name="this.dialogData.stat === 5 ? 'cancel' : 'task_alt'" :color="this.dialogData.stat === 5 ? 'negative' : 'positive'" size="xl"/>
            <div
              v-if="dialogData.stat === 1"
              class="column q-gutter-sm">
              <span class="text-h5 text-weight-bold">Setujui Verifikasi Berkas</span>
              <span>Tentukan Tanggal Pemerikasaan Lapangan</span>
              <q-input label="Masukan tanggal kunjungan" outlined v-model="date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="date" mask="MM/DD/YYYY">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-btn @click="onSubmit(1)" label="Setujui Berkas" no-caps color="green-10"/>
            </div>
            <div
              v-if="dialogData.stat === 4"
              class="column q-gutter-sm">
              <span class="text-h5 text-weight-bold">Re-Scedule Kunjungan Lapangan</span>
              <span>Tentukan Tanggal Pemerikasaan Lapangan yang Baru</span>
              <q-input label="Masukan tanggal kunjungan" outlined v-model="date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="date" mask="MM/DD/YYYY">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-btn @click="onSubmit(4)" label="Re-Schedule" no-caps color="green-10"/>
            </div>
            <div
              v-if="dialogData.stat === 2"
              class="column q-gutter-sm">
              <div class="text-center text-h5 text-weight-bold">Setujui Verifikasi Lapangan</div>
              <div class="text-center">Upload Sertifikasi Atau Lanjut Verifikasi Laboratorium</div>
              <q-input
                label="Jumlah Benih Yang Berhasil Verif"
                outlined
                type="number"
                v-model="benih_diferifikasi"
                :rules="[
                  val => val >= 0 || 'Masukan Jumlah Yang Benar',
                  val => Number(val) <= Number(this.dialogData.benih_sertifikasi) || `Batas (${this.dialogData.benih_sertifikasi})`
                ]"/>
              <q-file v-if="isShowUpload && benih_diferifikasi <= this.dialogData.benih_sertifikasi" :label="`Keterangan untuk ${isShowUpload} Benih gagal`" outlined v-model="keteranganBenihGagal">
                <template v-slot:append>
                  <q-icon name="attach_file" class="cursor-pointer"/>
                </template>
              </q-file>
              <q-file label="Upload Sertifikat" outlined v-model="sertifikat">
                <template v-slot:append>
                  <q-icon name="attach_file" class="cursor-pointer"/>
                </template>
              </q-file>
              <q-btn @click="onSubmit(3)" :disable="benih_diferifikasi > this.dialogData.benih_sertifikasi" label="Upload Sertifikasi" no-caps color="green-10"/>
              <div class="text-center" style="font-size: 10px">atau</div>
              <q-btn @click="onSubmit(2)" label="Verifikasi Laboratorium" outline no-caps color="green-10"/>
            </div>
            <div
              v-if="dialogData.stat === 3"
              class="column q-gutter-sm">
              <div class="text-center text-h5 text-weight-bold">Setujui Verifikasi Laboratorium</div>
              <div class="text-center">Upload Sertifikasi apabila sudah sesuai</div>
              <q-input
                label="Jumlah Benih Yang Berhasil Verif"
                outlined
                type="number"
                v-model="benih_diferifikasi"
                :rules="[
                  val => val >= 0 || 'Masukan Jumlah Yang Benar',
                  val => Number(val) <= Number(this.dialogData.benih_sertifikasi) || `Batas (${this.dialogData.benih_sertifikasi})`
                ]"/>
              <q-file v-if="isShowUpload && benih_diferifikasi <= this.dialogData.benih_sertifikasi" :label="`Keterangan untuk ${isShowUpload} Benih gagal`" outlined v-model="keteranganBenihGagal">
                <template v-slot:append>
                  <q-icon name="attach_file" class="cursor-pointer"/>
                </template>
              </q-file>
              <q-file label="Upload Sertifikat" outlined v-model="sertifikat">
                <template v-slot:append>
                  <q-icon name="attach_file" class="cursor-pointer"/>
                </template>
              </q-file>
              <q-btn @click="onSubmit(3)" :disable="benih_diferifikasi > this.dialogData.benih_sertifikasi" label="Upload Sertifikat" no-caps color="green-10"/>
            </div>
            <div
              v-if="dialogData.stat === 5"
              class="column q-gutter-sm">
              <div class="text-center text-h5 text-weight-bold">Tolak Verifikasi</div>
              <div class="text-center ">Alasan penolakan dari verifikasi Benih</div>
              <q-input label="Keterangan Alasan" type="textarea" outlined v-model="dialogData.alasan"/>
              <q-file class="text-black" label="Upload Surat Keterangan" outlined v-model="keterangan">
                <template v-slot:append>
                  <q-icon name="attach_file" class="cursor-pointer"/>
                </template>
              </q-file>
              <q-btn @click="onSubmit(5)" label="Setujui Berkas" no-caps color="green-10"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { GoogleMap, Marker } from 'vue3-google-map'
import { date } from 'quasar'
const model = () => {
  return {
    form: null,
    chld_history_sertifikasi_benih: [
      {
        file: null
      }
    ],
    ktp: {
      member: {
        reg_provinces: {},
        reg_regencies: {},
        reg_districts: {},
        reg_villages: {}
      }
    },
    location: {
      lat: 0,
      lng: 0
    },
    alamatLengkap: null
  }
}
export default {
  components: {
    GoogleMap,
    Marker
  },
  created () {
    this.getData()
  },
  data () {
    return {
      alasan: null,
      keteranganBenihGagal: null,
      benih_diferifikasi: 0,
      date: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      dialogData: {
        stat: null,
        isTrue: null
      },
      prompt: false,
      sertifikat: null,
      data: model(),
      optionMapLoad: false,
      center: { lat: -5.4170269, lng: 105.2689625 },
      marker: null,
      lokasi: null,
      keterangan: null,
      map: {
        loaded: false,
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: 'E-KPB',
        zoom: 12,
        center: { lat: -5.4170269, lng: 105.2689625 },
        markerLatLng: [-5.4170269, 105.2689625]
      },
      options: ['Kelapa Sawit', 'Kopi', 'Kelapa', 'Kakao', 'Kopi']
    }
  },
  methods: {
    download (fileDownload) {
      // this.$axios.get('data/download/' + id)
      this.$axios({
        url: `${this.$baseURL}file-sertif/${fileDownload}`,
        method: 'GET',
        responseType: 'blob' // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('x')
        link.href = url
        link.setAttribute('download', `${fileDownload}`) // or any other extension
        document.body.appendChild(link)
        link.click()
      })
    },
    onSubmit (l) {
      this.$showLoading()
      if (l === 1) {
        this.dialogData.comment = `Kunjungan ke tanggal ${this.date}`
        const formData = new FormData()
        formData.append('status', l)
        formData.append('comment', this.dialogData.comment)
        this.$axios.put(`sertif/updateStatus/${this.$route.params.id}`, formData)
          .finally(() => this.$hide())
          .then((res) => {
            this.$notif(res.data.message, 'positive')
            this.prompt = false
            this.getData()
          })
          .catch(() => this.$commonErrorNotif())
      } else if (l === 2) {
        this.dialogData.comment = 'Sampel benih sedang diuji dilaboratorium'
        const formData = new FormData()
        formData.append('status', l)
        formData.append('comment', this.dialogData.comment)
        this.$axios.put(`sertif/updateStatus/${this.$route.params.id}`, formData)
          .finally(() => this.$hide())
          .then((res) => {
            this.$notif(res.data.message, 'positive')
            this.prompt = false
            this.getData()
          })
          .catch(() => this.$commonErrorNotif())
      } else if (l === 3) {
        this.dialogData.comment = 'Sertifikasi Berhasil'
        const formData = new FormData()
        formData.append('status', l)
        formData.append('jumlah_benih_sertif', this.benih_diferifikasi)
        formData.append('comment', this.dialogData.comment)
        formData.append('sertifikat', this.sertifikat)
        formData.append('file', this.keteranganBenihGagal)
        this.$axios.put(`sertif/updateStatus/${this.$route.params.id}`, formData)
          .finally(() => this.$hide())
          .then((res) => {
            this.$notif(res.data.message, 'positive')
            this.prompt = false
            this.getData()
          })
          .catch(() => this.$commonErrorNotif())
      } else if (l === 4) {
        this.dialogData.comment = `Re-Schedule Kunjungan Lapangan ${this.date}`
        const formData = new FormData()
        formData.append('status', l)
        formData.append('comment', this.dialogData.comment)
        this.$axios.put(`sertif/updateStatus/${this.$route.params.id}`, formData)
          .finally(() => this.$hide())
          .then((res) => {
            this.$notif(res.data.message, 'positive')
            this.prompt = false
            this.getData()
          })
          .catch(() => this.$commonErrorNotif())
      } else {
        const formData = new FormData()
        formData.append('status', this.dialogData.stat)
        formData.append('comment', this.dialogData.alasan)
        formData.append('file', this.keterangan)
        this.$axios.put(`sertif/updateStatus/${this.$route.params.id}`, formData)
          .finally(() => this.$hide())
          .then((res) => {
            this.$notif(res.data.message, 'positive')
            this.prompt = false
            this.getData()
          })
          .catch(() => this.$commonErrorNotif())
      }
      this.keterangan = null
      this.sertifikat = null
    },
    dialog (stat, isTrue) {
      this.dialogData.benih_sertifikasi = this.data.benih_diajukan
      this.dialogData.stat = stat
      this.dialogData.isTrue = isTrue
      this.prompt = true
    },
    getData () {
      this.$showLoading()
      this.$axios.get(`sertif/detailSertifikasi/${this.$route.params.id}`)
        .then((res) => {
          this.$hide()
          this.data = res.data.result
          this.benih_diferifikasi = this.data.benih_diajukan
          this.map.loaded = false
          this.map.zoom = 12
          this.center.lat = res.data.result.lat
          this.center.lng = res.data.result.lon
          this.marker = { lat: res.data.result.lat, lng: res.data.result.lon }
          this.map.center = { lat: res.data.result.lat, lng: res.data.result.lon }
        })
        .catch(() => {
          this.$hide()
          this.$commonErrorNotif()
        })
    }
  },
  computed: {
    isShowUpload () {
      return Number(this.data.benih_diajukan) - Number(this.benih_diferifikasi)
      // if (this.data.benih_diajukan - this.benih_diferifikasi !== 0) {
      //   return false
      // } else {
      //   return true
      // }
    },
    isRouteBppmb () {
      return this.$route.name === 'detailSertifikasiBenihBPPMB'
    }
  }
}
</script>
