<template>
  <q-page padding>
    <q-card flat>
      <q-card-section class="text-bold text-h6">
        Detail Data Pengajuan Asuransi BPJS
      </q-card-section>
      <q-card-section v-if="data">
        <div class="text-h6">Data Pribadi</div>
        <div class="row q-col-gutter-y-sm">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>NIK</div>
            <div class="text-bold">{{ data.nik }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Nama</div>
            <div class="text-bold">{{ data.nama }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Area</div>
            <div class="text-bold">{{ getArea(data) }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Alamat Lengkap</div>
            <div class="text-bold">{{ data.alamat }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Jenis Kelamin</div>
            <div class="text-bold">{{ data.jenis_kelamin }}</div>
          </div>
        </div>
        <div class="text-h6 q-mt-sm">Data Pengajuan</div>
        <div class="row q-col-gutter-y-sm">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>No Kartu</div>
            <div class="text-bold">{{ data.bpjs_nokartu }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Jenis Peserta</div>
            <div class="text-bold">{{ data.bpjs_jenis_peserta }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Jenis Pekerjaan (Subsektor)</div>
            <div class="text-bold">{{ data.sektor }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Lokasi Pekerjaan</div>
            <div class="text-bold">{{ data.bpjs_lokasi_pekerjaan }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Penghasilan</div>
            <div class="text-bold">{{ $formatPrice(data.bpjs_penghasilan) }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Program</div>
            <div class="text-bold">{{ data.bpjs_program }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Terhitung Mulai Tanggal</div>
            <div class="text-bold">{{ $parseDate(data.bpjs_tmt).fullDate }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Tanggal Berakhir</div>
            <div class="text-bold">{{ $parseDate(data.bpjs_tb).fullDate }}</div>
          </div>
        </div>
        <div class="text-h6 q-mt-sm">Riwayat Status Pengajuan</div>
        <div class="row q-col-gutter-y-sm q-mt-sm">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-list bordered separator>
              <q-item v-for="(d, i) in data.history" :key="i">
                <q-item-section>
                  <q-item-label>{{ d.bpjs_setting.status }}</q-item-label>
                  <q-item-label caption>{{ $parseDate(d.created_at).fullDate }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import getArea from '../../../../helper/ParseArea'
export default {
  data () {
    return {
      data: null
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getArea,
    getDetail () {
      this.$showLoading()
      this.$axios.get(`master/bpjs/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            // console.log(res.data.result)
            this.data = res.data.result
            this.data.kabupaten = this.data.Kabupaten
          }
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
