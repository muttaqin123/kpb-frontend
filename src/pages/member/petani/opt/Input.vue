<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div class="text-h6">Input OPT</div>
        <div>Layanan pengaduan serangan organisme pengganggu tanaman.</div>
        <q-form @submit="onSubmit" class="q-mt-md">
          <q-select
            v-model="komoditas"
            label="Pilih Komoditas"
            outlined
            :rules="$defaultValidation"
            :options="listKomoditas"
            option-label="komoditas"
            option-value="id"
          />
          <q-input
            v-model="form.alamatlahan"
            label="Alamat Lahan"
            outlined
            :rules="$defaultValidation"
          />
          <q-input
            v-model="form.luaslahan"
            label="Luas Lahan (Ha)"
            outlined
            type="number"
            :rules="$defaultValidation"
          />
          <q-input
            v-model="form.umurtanaman"
            label="Umur Tanaman"
            outlined
            type="number"
            :rules="$defaultValidation"
          />
          <q-select
            v-model="form.satuanumurtanaman"
            label="Pilih Satuan Umur Tanaman"
            outlined
            :rules="$defaultValidation"
            :options="listSatuan"
          />
          <q-select
            v-model="form.intensitasserangan"
            label="Intesitas Serangan"
            outlined
            :rules="$defaultValidation"
            :options="listIntensitas"
          />
          <q-input
            v-model="form.namapemiliklahan"
            label="Nama Pemilik Lahan"
            outlined
            :rules="$defaultValidation"
          />
          <q-input
            v-model="form.tlppemiliklahan"
            label="Telp. Pemilik Lahan"
            outlined
            :rules="$defaultValidation"
          />
          <q-input
            v-model="form.keteranganserangan"
            label="Keterangan"
            outlined
            type="textarea"
            :rules="$defaultValidation"
          />
          <GoogleMap @click="getLatLong" :api-key="this.$mapsApiKey" style="height: 50vh" :center="map.center" :zoom="map.zoom">
            <Marker :options="{ position: marker }" />
          </GoogleMap>
          <q-file
            outlined
            v-model="gambarDaun"
            class="q-mt-md"
            label="Gambar Daun"
            accept=".jpg, image/*"
            :rules="$defaultValidation"
            clearable
          />
          <q-file
            outlined
            v-model="gambarBuah"
            class="q-mt-md"
            label="Gambar Buah"
            accept=".jpg, image/*"
            :rules="$defaultValidation"
            clearable
          />
          <q-file
            outlined
            v-model="gambarBatang"
            class="q-mt-md"
            label="Gambar Batang"
            accept=".jpg, image/*"
            :rules="$defaultValidation"
            clearable
          />
          <q-file
            outlined
            v-model="gambarAkar"
            class="q-mt-md"
            label="Gambar Akar"
            accept=".jpg, image/*"
            :rules="$defaultValidation"
            clearable
          />
          <q-btn type="submit" label="Simpan Pengaduan" unelevated color="primary"/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import { GoogleMap, Marker } from 'vue3-google-map'
// import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { listSatuan } from './ListSatuan'
const model = () => {
  return {
    nik: null,
    alamatlahan: null,
    lat: null,
    long: null,
    jeniskomoditi: null,
    luaslahan: null,
    umurtanaman: null,
    satuanumurtanaman: null,
    intensitasserangan: null,
    namapemiliklahan: null,
    tlppemiliklahan: null,
    keteranganserangan: null
  }
}
export default {
  components: {
    GoogleMap,
    Marker
  },
  data () {
    return {
      komoditas: null,
      listKomoditas: [],
      listSatuan: listSatuan,
      listIntensitas: [
        'Ringan', 'Sedang', 'Berat', 'Puso'
      ],
      zoom: 2,
      marker: null,
      map: {
        zoom: 12,
        center: { lat: -5.4170269, lng: 105.2689625 }
      },
      form: model(),
      files: null,
      gambarDaun: null,
      gambarBuah: null,
      gambarBatang: null,
      gambarAkar: null
    }
  },
  async created () {
    this.getLocation()
    this.getKomoditas()
  },
  methods: {
    getKomoditas () {
      this.komoditas = null
      this.$axios.get('master/komoditas-opt', this.$createToken())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listKomoditas = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getLocation () {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setMarker(position.coords.latitude, position.coords.longitude)
        }
      )
    },
    filterLokasi (val, update) {
      // this.optionMapLoad = true
      // update(() => {
      //   const provider = new OpenStreetMapProvider()
      //   const keyword = val || 'indonesia'
      //   provider
      //     .search({ query: keyword })
      //     .finally(() => {
      //       this.optionMapLoad = false
      //     })
      //     .then((res) => {
      //       this.listLokasi = res
      //     })
      // })
    },
    getLatLong (e) {
      this.map.zoom = 12
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()
      this.setMarker(lat, lng)
      // this.lokasi = `${lat}, ${lng}`
    },
    setMarker (lat, long) {
      this.map.loaded = false
      this.map.zoom = 12
      this.marker = { lat: lat, lng: long }
      this.map.center = { lat: lat, lng: long }
      this.form.lat = lat
      this.form.long = long
    },
    onSubmit () {
      this.$showLoading()
      this.form.nik = this.$getProfile().nik
      this.form.jeniskomoditi = this.komoditas.id
      const formData = new FormData()
      formData.append('data', JSON.stringify(this.form))
      // for (const f of this.files) {
      //   formData.append('namafile', f)
      // }
      formData.append('gambarDaun', this.gambarDaun)
      formData.append('gambarBuah', this.gambarBuah)
      formData.append('gambarBatang', this.gambarBatang)
      formData.append('gambarAkar', this.gambarAkar)
      this.$axios.post('opt/pengaduan', formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          if (this.$parseResponse(res.data)) {
            // this.form = model()
            // this.files = null
            // this.$router.push({ name: 'indexOPTPetani' })
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
