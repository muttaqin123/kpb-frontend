<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div class="text-h6">Input Pengaduan DPI</div>
        <div>Layanan pengaduan dampak perubahan iklim atau bencana alam.</div>
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
            v-model="jenisdpi"
            label="Jenis"
            outlined
            :rules="$defaultValidation"
            option-label="val"
            option-value="val"
            :options="listJenis"
            @update:model-value="kategoridpi = null"
          />
          <q-select
            v-model="form.kategoridpi"
            label="Intesitas Serangan"
            outlined
            :rules="$defaultValidation"
            :options="jenisdpi ? jenisdpi.listKategori : []"
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
            type="number"
          />
          <q-input
            v-model="form.keterangandpi"
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
            v-model="files"
            class="q-mt-md"
            label="Gambar Lampiran"
            accept=".jpg, image/*"
            multiple
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
import { listSatuan } from '../ListSatuan'

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
    namapemiliklahan: null,
    tlppemiliklahan: null,
    jenisdpi: null,
    kategoridpi: null,
    keterangandpi: null
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
      listJenis: [
        {
          val: 'Banjir',
          listKategori: ['Terkena', 'Puso']
        },
        {
          val: 'Kekeringan',
          listKategori: ['Ringan', 'Sedang', 'Berat', 'Puso']
        },
        {
          val: 'Bencana Alam',
          listKategori: ['Terkena', 'Puso']
        }
      ],
      zoom: 2,
      marker: null,
      map: {
        zoom: 12,
        center: { lat: -5.4170269, lng: 105.2689625 }
      },
      form: model(),
      files: null,
      jenisdpi: null,
      kategoridpi: null
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
      this.form.jenisdpi = this.jenisdpi.val
      const formData = new FormData()
      formData.append('data', JSON.stringify(this.form))
      for (const f of this.files) {
        formData.append('namafile', f)
      }
      this.$axios.post('opt/pengaduan-dpi', formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          if (this.$parseResponse(res.data)) {
            this.form = model()
            this.files = null
            this.$router.push({ name: 'pengaduanDPIPetani' })
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
