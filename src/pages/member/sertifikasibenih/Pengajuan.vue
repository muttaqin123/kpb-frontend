<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <q-card flat>
        <q-card-section class="q-gutter-sm text-green-10">
          <div class="text-h5 text-weight-bold">
            Formulir Pengajuan
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

          <q-input
            outlined
            v-model="form.namaPerusahaan"
            label="Nama Perusahaan"/>

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
          <q-input
            v-model="form.alamat"
            label="Lokasi Kebun Anda"
            type="textarea"
            outlined
            disable
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"
          />
          <q-file
            v-model="ktp"
            label="Upload KTP"
            accept=".pdf, .png, .jpg, .jpeg"
            outlined
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"
          >
            <template v-slot:append>
              <q-icon name="attach_file" />
            </template>
          </q-file>

          <div class="text-h6 text-weight-bold  q-mt-sm">
            Data Kebun Pemohon
          </div>

          <q-file
            v-model="desainKebun"
            label="Upload Desain Kebun"
            accept=".pdf, .png, .jpg, .jpeg"
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
            v-model="Catatan"
            label="Upload Catatan Pemeliharaan Kebun"
            accept=".pdf, .png, .jpg, .jpeg"
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
            v-model="alamat"
            label="Lokasi Kebun Anda"
            type="textarea"
            outlined
            :rules="[
              val => val !== '' || 'Mohon Isi'
            ]"
          />
          <q-select
            :options="listLokasi"
            v-model="lokasi"
            label="Cari Lokasi Kebun/Pilih Titik Pada Peta"
            use-input
            outlined
            :loading="optionMapLoad"
            option-label="label"
            option-value="label"
            @filter="filterLokasi"
            @update:model-value="setLatlong()"
          />
          <GoogleMap @click="getLatLong" :api-key="this.$mapsApiKey" style="height: 50vh" :center="map.center" :zoom="map.zoom">
            <Marker :options="{ position: marker }" />
          </GoogleMap>

          <div class="text-h6 text-weight-bold q-mt-md">
            Data Benih Pemohon
          </div>
          <q-select
            outlined
            v-model="form.jenis_benih "
            :options="options"
            label="Jenis Benih"
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]" />
          <q-input
            v-model="jumlah_benih"
            label="Jumlah Benih"
            type="number"
            outlined
            :rules="[
              val => val > 0 || 'Mohon Isi'
            ]"
          />
          <q-file
            v-model="suratPermohonan"
            label="Surat Permohonan"
            accept=".pdf, .png, .jpg, .jpeg"
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
            v-model="IUP"
            label="IUP"
            accept=".pdf, .png, .jpg, .jpeg"
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
            v-model="suratAsalUsulBenih"
            label="Surat Asal Usul Benih"
            accept=".pdf, .png, .jpg, .jpeg"
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
            v-model="doPengiriman"
            label="DO Pengiriman"
            accept=".pdf, .png, .jpg, .jpeg"
            outlined
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"
          >
            <template v-slot:append>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <q-btn type="submit" label="Kirim Pengajuan" color="green-10" class="full-width" no-caps/>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>
<script>
import { GoogleMap, Marker } from 'vue3-google-map'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
const model = () => {
  return {
    location: {
      lat: 0,
      lng: 0
    },
    jenis_benih: null,
    alamatLengkap: null
  }
}
export default {
  components: {
    GoogleMap,
    Marker
  },
  data () {
    return {
      options: ['Kelapa Sawit', 'Kopi', 'Kelapa', 'Kakao', 'Kopi'],
      listLokasi: [],
      optionMapLoad: false,
      center: { lat: -5.4170269, lng: 105.2689625 },
      map: {
        loaded: false,
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: 'E-KPB',
        zoom: 12,
        center: { lat: -5.4170269, lng: 105.2689625 },
        markerLatLng: [-5.4170269, 105.2689625]
      },
      form: model(),
      lokasi: null,
      marker: null,
      alamat: '',
      jumlah_benih: null,

      // file
      suratPermohonan: null,
      IUP: null,
      suratAsalUsulBenih: null,
      doPengiriman: null,
      Catatan: null,
      desainKebun: null,
      ktp: null
    }
  },
  created () {
    this.getLocation()
    this.getProfile()
    this.getList()
  },
  methods: {
    getProfile () {
      this.form.nama = this.$getProfile().nama
      this.form.provinsi = this.$getProfile().member.reg_provinces.name
      this.form.kabupaten = this.$getProfile().member.reg_regencies.name
      this.form.kecamatan = this.$getProfile().member.reg_districts.name
      this.form.desa = this.$getProfile().member.reg_villages.name
      this.form.alamat = this.$getProfile().alamat
    },
    getList () {
    },
    getLocation () {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setMarker(position.coords.latitude, position.coords.longitude)
        }
      )
    },
    onSubmit () {
      this.$showLoading()
      if (this.form.namaPerusahaan == null || this.form.namaPerusahaan === '') {
        this.form.namaPerusahaan = '-'
      }
      this.form.alamat = this.alamat
      this.form.jumlah_benih = this.jumlah_benih
      this.form.nik = this.$getProfile().nik
      const formData = new FormData()
      formData.append('suratPermohonan', this.suratPermohonan)
      formData.append('suratIUP', this.IUP)
      formData.append('suratAsalBenih', this.suratAsalUsulBenih)
      formData.append('suratDO', this.doPengiriman)
      formData.append('ktp', this.ktp)
      formData.append('desainKebun', this.desainKebun)
      formData.append('Catatan', this.Catatan)
      formData.append('data', JSON.stringify(this.form))
      this.$axios.post('sertif/addSertifikasiBenih', formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          if (res.data.status) {
            this.$notif(res.data.message)
            this.form = model()
            this.data = model()
            this.getProfile()
            this.getLocation()
            this.$router.push({ name: 'detailSertifikasi', params: { id: res.data.result.id } })
          } else {
            this.$notif(res.data.message, 'negative')
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    getLatLong (e) {
      this.map.zoom = 12
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()
      this.setMarker(lat, lng)
      // this.lokasi = `${lat}, ${lng}`
    },
    filterLokasi (val, update) {
      this.optionMapLoad = true
      update(() => {
        const provider = new OpenStreetMapProvider()
        const keyword = val || 'indonesia'
        provider
          .search({ query: keyword })
          .finally(() => {
            this.optionMapLoad = false
          })
          .then((res) => {
            this.listLokasi = res
          })
      })
    },
    setMarker (lat, long) {
      this.map.loaded = false
      this.map.zoom = 12
      this.marker = { lat: lat, lng: long }
      this.map.center = { lat: lat, lng: long }
      this.form.location.lat = lat
      this.form.location.lng = long
    },
    setLatlong () {
      this.setMarker(this.lokasi.y, this.lokasi.x)
    }
  }
}
</script>
