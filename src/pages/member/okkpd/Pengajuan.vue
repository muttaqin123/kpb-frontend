<template>
  <q-page padding style="background: #F2F7F5">
    <div class="row">
      <div class="col-md-3 col-xs-12 col-sm-12 column q-pa-sm">
        <div class="column border-shadow q-py-sm flex flex-center" >
          <span>Unduh Template Berkas</span>
          <div class="bg-green-2 column q-pa-sm text-center q-ma-xs" style="width: 90%">
            <span style="font-size: 12.2px">Surat Permohonan pengambilan sampel</span>
            <div class="row">
              <div class="col flex flex-center">
                <a target="_blank" :href="`${$baseURL}file-okkpd/pengambilan_sample.pdf`" style="font-size: 12.2px">(Unduh PDF)</a>
              </div>
              <div class="col flex flex-center">
                <a target="_blank" :href="`${$baseURL}file-okkpd/pengambilan_sample.docx`" style="font-size: 12.2px">(Unduh Word)</a>
              </div>
            </div>
          </div>
          <div class="bg-green-2 column q-pa-sm text-center q-ma-xs" style="width: 90%">
            <span style="font-size: 12.2px; ">Informasi Produk</span>
            <div class="row">
              <div class="col flex flex-center">
                <a target="_blank" :href="`${$baseURL}file-okkpd/informasi_produk.pdf`" style="font-size: 12.2px">(Unduh PDF)</a>
              </div>
              <div class="col flex flex-center">
                <a target="_blank" :href="`${$baseURL}file-okkpd/informasi_produk.docx`" style="font-size: 12.2px">(Unduh Word)</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9 col-xs-12 col-sm-12">
        <q-form @submit="onSubmit">
          <q-card flat>
            <q-card-section class="q-gutter-sm text-green-10">
              <div class="text-h5 text-weight-bold">
                Formulir Pengajuan Pengambilan Sampel
              </div>
              <span>Isi formulir pengajuan ini dengan data yang sesuai dan pastikan tidak ada data yang salah </span>
              <div class="text-h6 text-weight-bold  q-mt-sm">
                Data Diri Pemohon
              </div>
              <q-input
                outlined
                v-model="form.nama"
                disable
                label="Nama Pemohon"/>

              <div class="row justify-between">
                <q-input
                  class="col-md-3 q-pa-sm"
                  outlined
                  disable
                  v-model="form.provinsi"
                  label="Provinsi"/>
                <q-input
                  class="col-md-3 q-pa-sm"
                  outlined
                  disable
                  v-model="form.kabupaten"
                  label="Kabupaten"/>
                <q-input
                  class="col-md-3 q-pa-sm"
                  outlined
                  disable
                  v-model="form.kecamatan"
                  label="Kecamatan"/>
                <q-input
                  class="col-md-3 q-pa-sm"
                  outlined
                  disable
                  v-model="form.desa"
                  label="Desa"/>
              </div>

              <div v-if="!isResult" class="">
                <q-input
                  outlined
                  v-model="form.namaPerusahaan"
                  label="Nama Perusahaan"
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"/>

                <q-input
                  v-model="form.alamatPerusahaan"
                  label="Alamat Perusahaan Anda"
                  type="textarea"
                  outlined
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                />
                <q-file
                  v-model="shm"
                  label="Upload Data Kepemilikan Gudang (Milik Sendiri/Sewa)"
                  accept=".pdf, .png, .jpg, .jpeg, .doc, .docx"
                  outlined
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>

                <q-file
                  v-model="ktpfile"
                  label="Upload KTP"
                  accept=".pdf, .png, .jpg, .jpeg, .doc, .docx"
                  outlined
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>

                <q-file
                  v-model="npwp"
                  label="Upload NPWP"
                  accept=".pdf, .png, .jpg, .jpeg, .doc, .docx"
                  outlined
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>

                <q-file
                  v-model="nib"
                  label="Upload NIB"
                  accept=".pdf, .png, .jpg, .jpeg, .doc, .docx"
                  outlined
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>
              <div v-else class="">
                <q-input
                  outlined
                  disable
                  v-model="form.namaPerusahaan"
                  label="Nama Perusahaan"
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"/>

                <q-input
                  v-model="form.alamatPerusahaan"
                  label="Alamat Perusahaan Anda"
                  type="textarea"
                  outlined
                  disable
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                />
                <q-input
                  v-model="shm"
                  label="Upload Data Kepemilikan Gudang (Milik Sendiri/Sewa)"
                  disable
                  outlined
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-input>

                <q-input
                  v-model="ktpfile"
                  label="Upload KTP"
                  disable
                  outlined
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-input>

                <q-input
                  v-model="npwp"
                  label="Upload NPWP"
                  disable
                  outlined
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-input>

                <q-input
                  v-model="nib"
                  label="Upload NIB"
                  disable
                  outlined
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-input>
              </div>

              <div class="text-h6 text-weight-bold q-mt-md">
                Data Berkas Permohonan
              </div>
              <q-select
                outlined
                v-model="form.jenis_komoditi"
                use-input
                label="Jenis Komoditi"
                :options="options"
                @filter="filterBrand"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]">
                <template v-slot:no-option>
                  <q-item @click="createBrand">
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <div class="row justify-between">
                <q-input
                  class="col-4 q-pa-xs"
                  label="Jumlah Lot"
                  type="number"
                  placeholder="0"
                  v-model="form.jumlah_lot"
                  outlined
                  :rules="[
                    val => (val > 0 || val == null) || 'Mohon Isi'
                  ]"/>
                <q-input
                  class="col-4 q-pa-xs"
                  label="Berat Bersih(Kg)"
                  type="number"
                  placeholder="0"
                  outlined
                  v-model="form.berat_bersih"
                  :rules="[
                    val => (val > 0 || val == null) || 'Mohon Isi'
                  ]"/>
                <q-input
                  class="col-4 q-pa-xs"
                  label="Berat Kotor(Kg)"
                  type="number"
                  placeholder="0"
                  outlined
                  v-model="form.berat_kotor"
                  :rules="[
                    val => (val > 0 || val == null) || 'Mohon Isi'
                  ]"/>
              </div>
              <q-select
                outlined
                v-model="form.negara_tujuan"
                use-input
                input-debounce="0"
                label="Negara Tujuan"
                :options="arrayNegara"
                @filter="filterNegara"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]">
                <template v-slot:no-option>
                  <q-item @click="createBrand">
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-file
                v-model="suratPermohonan"
                label="Surat Permohonan pengambilan sampel"
                accept=".pdf, .png, .jpg, .jpeg, .doc, .docx"
                outlined
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              >
                <template v-slot:append>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              <q-file
                v-model="informasiProduk"
                label="Upload Informasi Produk"
                accept=".pdf, .png, .jpg, .jpeg, .doc, .docx"
                outlined
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              >
                <template v-slot:append>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              <q-file
                v-model="si"
                label="Upload Dokumen eksport /Shipping Instruction (SI)"
                accept=".pdf, .png, .jpg, .jpeg, .doc, .docx"
                outlined
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              >
                <template v-slot:append>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              <q-input
                v-model="form.nomor_si"
                label="Nomor Shipping Instruction (SI)"
                outlined
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
              <q-btn type="submit" label="Kirim Pengajuan" color="green-10" class="full-width" no-caps/>
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<script>
import utils from '../../sharedpages/okkpd/utilsOkkpd'
let originalOptions = ['Kopi']
const listNegara = utils.listNegara
export default {
  data () {
    return {
      arrayNegara: listNegara,
      options: originalOptions,
      form: {
        namaPerusahaan: '',
        alamatPerusahaan: '',
        jenis_komoditi: '',
        jumlah_lot: null,
        berat_bersih: null,
        berat_kotor: null,
        negara_tujuan: '',
        nomor_si: ''
      },
      isResult: false,
      // file
      shm: null,
      ktpfile: null,
      npwp: null,
      nib: null,
      suratPermohonan: null,
      informasiProduk: null,
      si: null

    }
  },
  created () {
    this.getData()
    this.getProfile()
  },
  methods: {
    reset () {
      this.form = {
        namaPerusahaan: '',
        alamatPerusahaan: '',
        jenis_komoditi: '',
        jumlah_lot: 0,
        berat_bersih: 0,
        berat_kotor: 0,
        negara_tujuan: '',
        nomor_si: ''
      }
    },
    getData () {
      this.$showLoading()
      this.$axios.get(`okkpd/getForm/${this.$getProfile().nik}`, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          const data = res.data.result
          if (data.jenis.length > 0) {
            const listJenis = data.jenis
            listJenis.push(originalOptions[0])
            const arrTanpaDuplikat = listJenis.filter((nilai, indeks) => listJenis.indexOf(nilai) === indeks && nilai !== '')
            originalOptions = this.options = arrTanpaDuplikat
          }
          if (data.data) {
            this.form.namaPerusahaan = data.data.nama_perusahaan
            this.form.alamatPerusahaan = data.data.alamat
            this.shm = data.data.shm
            this.ktpfile = data.data.ktpfile
            this.npwp = data.data.npwp
            this.nib = data.data.nib
            this.isResult = true
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    getProfile () {
      this.form.nama = this.$getProfile().nama
      this.form.provinsi = this.$getProfile().member.reg_provinces.name
      this.form.kabupaten = this.$getProfile().member.reg_regencies.name
      this.form.kecamatan = this.$getProfile().member.reg_districts.name
      this.form.desa = this.$getProfile().member.reg_villages.name
    },
    onSubmit () {
      this.$showLoading()
      this.form.nik = this.$getProfile().nik
      const formData = new FormData()
      formData.append('shm', this.shm)
      formData.append('ktp', this.ktpfile)
      formData.append('npwp', this.npwp)
      formData.append('nib', this.nib)
      formData.append('suratPermohonan', this.suratPermohonan)
      formData.append('informasiProduk', this.informasiProduk)
      formData.append('si', this.si)
      formData.append('data', JSON.stringify(this.form))
      // console.log(formData.get('data'))
      this.$axios.post('okkpd/createOkkpd', formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          if (res.data.status) {
            this.$notif(res.data.message)
            // this.getProfile()
            this.$router.push({ name: 'detailPermohonanOkkpd', params: { id: res.data.result.id } })
          } else {
            this.$notif(res.data.message, 'negative')
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    createBrand (val, done) {
      if (val.length > 0) {
        if (!originalOptions.includes(val)) {
          originalOptions.push(val)
        }
        done(val, 'toggle')
      }
    },
    filterBrand (val, update, abort) {
      if (val === '') {
        update(() => {
          this.options = originalOptions
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options = originalOptions.filter(v => String(v).toLowerCase().indexOf(needle) > -1)
      })
    },
    filterNegara (val, update, abort) {
      if (val === '') {
        update(() => {
          this.arrayNegara = listNegara
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.arrayNegara = listNegara.filter(v => String(v).toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
