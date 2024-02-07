<template>
  <q-page style="background: #EFF6F1">
    <div style="background: #32573F; height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} absolute-top`" style="margin-top: 55px">
      <div class="bg-white q-pa-sm ">
        <q-btn class="q-mx-sm" rounded icon="mdi-arrow-left" @click="this.$router.go(-1)" dense flat />
        <span class="text-bold">Riwayat Pengajuan</span>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-sm`">
      <div class="row">
        <div class="col-md-6 q-pa-sm">
          <q-input outlined v-model="textsearch" :dense="dense" bg-color="white" label="Cari Transaksi" @update:model-value="getData()">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="q-pa-sm col-md-3 col-sm-12 col-xs-12">
          <q-select
            label="Jenis Komoditi"
            :options="option_komoditas"
            option-label="komoditas"
            option-value="id"
            v-model="selectkomoditas"
            bg-color="white"
            outlined dense
            @update:model-value="getData()"
            :rules="
              [
                val => (val != '') || 'Pilih Komoditi'
              ]" />
        </div>
        <div class="q-pa-sm col-md-3 col-sm-12 col-xs-12">
          <q-select
            label="Intensitas Serangan"
            :options="option_intensitas"
            option-label="id"
            option-value="value"
            v-model="selectintensitas"
            bg-color="white"
            outlined dense
            @update:model-value="getData()"
            :rules="
              [
                val => (val != '') || 'Pilih Intensitas Serangan'
              ]" />
        </div>
        <div class="q-pa-sm col-md-3 col-sm-12 col-xs-12">
          <q-select
            label="Status"
            :options="option_status"
            option-label="id"
            option-value="value"
            v-model="selectstatus"
            bg-color="white"
            outlined dense
            @update:model-value="getData()"
            :rules="[
              val => (val != '') || 'Pilih Status'
            ]" />
        </div>
        <div class="q-pa-sm col-md-3 col-sm-12 col-xs-12">
          <q-select
            label="Terbaru"
            :options="option_terbaru"
            option-label="id"
            option-value="value"
            v-model="selectterbaru"
            bg-color="white"
            outlined dense
            @update:model-value="getData()"
            :rules="[
              val => (val != '') || 'Pilih Terbaru'
            ]" />
        </div>
      </div>
    </div>

    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} q-my-sm`">
      <div v-for="item in list" :key="item.id" class="row q-mb-md">
        <div class="col-auto" style="background: #32573F; width: 20px; border-radius: 8px 0 0 8px;"></div>
        <div class="column col q-pa-sm" style="background: #FFFFFF">
          <span class="text-bold text-body1">Surat Rekomendasi</span>
          <span>Nama Pemohon: {{ item.nama }}</span>
          <span>Jenis Komoditi: {{ item.komoditas }} </span>
          <span>Intensitas Serangan: {{ item.intensitasserangan }} </span>
          <span>Tanggal Pengajuan: {{ $parseDate(item.created_at).fullDate }} </span>
          <span>Status: {{ item.status }}</span>
          <span v-if="item.tanggal_kunjungan">Tanggal Kunjungan Lapangan: {{ $parseDate(item.tanggal_kunjungan).fullDate }} </span>
          <div style="display: flex; justify-content: end;" class="col q-mt-sm q-gutter-sm">
            <q-btn style="background-color: #FFB800;" no-caps label="Lihat Detail"
              :to="{ name: 'detailPengajuanKlinikPerkebunan', params: { id: item.id } }"></q-btn>
            <q-btn style="background-color: #FFFFFF; color: black; border-radius: 2px;" class="q-mx-sm" no-caps label="Lihat Jawaban"
              @click="onLihatJawabanClick(item.hasil, item.rekomendasi)"></q-btn>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="jawaban">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Lihat Jawaban</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-mb-md">
            <div class="text-h6">Hasil Identifikasi</div>
            <q-input v-model="hasil" label="Hasil Identifikasi" outlined dense disable type="textarea" />
          </div>
          <div class="">
            <div class="text-h6">Rekomendasi</div>
            <q-input v-model="rekomendasi" label="Rekomendasi" outlined dense disable type="textarea" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    return {
      jawaban: ref(false),
      hasil: ref(''),
      rekomendasi: ref('')
    }
  },
  data () {
    return {
      selectkomoditas: null,
      selectintensitas: null,
      selectstatus: null,
      selectterbaru: null,
      textsearch: null,
      option_komoditas: [],
      option_intensitas: [
        { id: 'Ringan', value: 'ringan' },
        { id: 'Sedang', value: 'sedang' },
        { id: 'Berat', value: 'berat' }
      ],
      option_status: [
        { id: 'Terjawab', value: 'terjawab' },
        { id: 'Belum Dijawab', value: 'belum_dijawab' }
      ],
      option_terbaru: [
        { id: 'Ya', value: 'ya' },
        { id: 'Tidak', value: 'Tidak' }
      ],
      list: []
    }
  },
  async created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      console.log('ds')
      this.$axios.get('master/komoditas/2', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.option_komoditas = res.data.result
            console.log('dshiiausduoiadsn', this.option_komoditas)
          }
        }).catch(() => this.$commonErrorNotif())
      this.$axios.get(`klinik/getlistklinikbynik/${this.$getProfile().nik}`, {
        params: {
          komoditas: this.selectkomoditas?.komoditas,
          intensitas: this.selectintensitas?.id,
          status: this.selectstatus?.id,
          terbaru: this.selectterbaru?.id,
          textsearch: this.textsearch
        },
        headers: this.$createToken()
      })
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.list = res.data.result
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    onDetailClick (id) {
      this.$router.push({ name: 'detailPengajuanKlinikPerkebunan', params: { idRole: '6', idLayanan: '34', idFitur: '82', id } })
    },
    onLihatJawabanClick (hasil, rekomendasi) {
      this.jawaban = true
      this.hasil = hasil
      this.rekomendasi = rekomendasi
    }
  }
}
</script>
<style scoped>
.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  background-color: #475D5B
}
</style>
