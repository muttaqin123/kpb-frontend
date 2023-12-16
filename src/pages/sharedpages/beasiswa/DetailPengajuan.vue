<template>
  <q-page padding style="background: #F2F7F5">
    <div class=" q-pa-sm row">
      <q-btn
        @click="this.$router.go(-1)"
        unelevated
        outline
        no-caps
        color="green-10"
        icon="arrow_back"
        label="Kembali"
      />
      <q-space/>
      <q-btn
        target="_blank"
        :href="`${$baseURL}file-pengajuan/${this.form.file_pengajuan}`"
        :disable="this.form.file_pengajuan === null"
        unelevated
        outline
        no-caps
        color="info"
        icon="description"
        label="Unduh Surat Pengajuan"
      />
    </div>
    <div class="row">
      <div v-if="this.$route.name === 'detailPengajuanAdmin' && this.form.status_pengajuan === 0" class="col-4 q-pa-sm">
        <div class="column q-gutter-sm">
          <q-btn target="_blank" label="Buat Surat Rekomendasi" :to="{ name: 'cetakPengajuanBeasiswa', params: {id: this.$route.params.id}}" icon="file_copy" color="primary" no-caps outline/>
          <div class="q-pa-sm border-shadow column">
            <span class="text-weight-bold text-h6">Konfirmasi Pengajuan</span>
            <span class="">Pastikan data yang anda konfirmasi sudah sesuai</span>
            <div class="column q-pa-sm q-gutter-sm">
              <q-btn @click="this.dialog = !this.dialog" label="Setujui Persetujuan" no-caps color="positive"/>
              <q-btn @click="uploadBukti(2)" label="Tolak Permintaan" no-caps color="negative"/>
            </div>
          </div>
        </div>
      </div>
      <div class="col q-pa-sm">
        <div class="column">
          <span class="text-weight-bold text-h5">Data Pengajuan Rekomendasi</span>
          <div class="column q-gutter-sm">
            <q-input label="Nama Orang Tua" v-model="form.member.ktp.nama" outlined disable dense/>
            <q-input label="Nik Orang Tua" v-model="form.nik_wali" outlined disable dense/>
            <q-input label="Asal Sekolah" v-model="form.asal_sekolah" outlined disable dense/>
            <q-input label="Nama Siswa" v-model="form.nama_siswa" outlined disable dense/>
            <q-input label="NISN" v-model="form.nisn" outlined disable dense/>
            <q-input label="No. SKL / Ijasah" v-model="form.no_sk" outlined disable dense/>
            <q-input label="Tempat Lahir" v-model="form.tempat_lahir" outlined disable dense/>
            <q-input label="Tanggal Lahir" v-model="form.tanggal_lahir" outlined disable dense/>
          </div>
        </div>
        <div class="column">
          <span class="text-weight-bold text-h5 q-mt-sm">Data Universitas dan Beasiswa</span>
          <div class="column q-gutter-sm">
            <q-input label="Nama Beasiswa" v-model="form.beasiswa.nama_beasiswa" outlined disable dense/>
            <q-input label="Nama Universitas" v-model="form.beasiswa.institusi_pendidikan.nama_institusi" outlined disable dense/>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="dialog">
      <q-card class="q-pa-xl">
        <div class="col-12 column flex flex-center">
          <div class="q-pa-sm bg-green-10 q-mb-md" style="border-radius: 1000px">
            <q-icon name="check_circle" color="white" size="xl"/>
          </div>
          <span class="text-h5 text-green-10 text-weight-bold">Setujui Verifikasi</span>
          <span>Upload Surat Rekomendasi sebagai bukti telah diterima</span>
          <br>
          <q-file v-model="file" label="Upload Surat Surat Rekomendasi" style="width: 100%" outlined/>
          <q-btn @click="uploadBukti(1)" label="Setujui Permohonan" no-caps color="green-10" class="q-ma-sm full-width"/>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      file: null,
      dialog: false,
      form: {
        member: {
          ktp: {}
        },
        beasiswa: {
          institusi_pendidikan: {}
        }
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$axios.get(`beasiswa/getRecomendations/${this.$route.params.id}`)
        .finally(() => this.$hide())
        .then((res) => {
          this.form = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    uploadBukti (status) {
      this.$showLoading()
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('status', status)
      this.$axios.put(`beasiswa/updateRecomendation/${this.$route.params.id}`, formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          this.$notif(res.data.message, 'positive')
          this.dialog = false
          this.getData()
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
