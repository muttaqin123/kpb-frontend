<template>
  <q-page padding>
    <q-card flat>
      <q-card-section class="text-bold text-h6">
        Detail Data Pengajuan KUR
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
            <div>Nama Pasangan</div>
            <div class="text-bold">{{ data.nama_pasangan }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Tempat dan Tanggal Lahir</div>
            <div class="text-bold">{{ data.tempat_lahir }}, {{ data.tanggal_lahir }}</div>
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
            <div>Kode POS</div>
            <div class="text-bold">{{ data.kode_pos }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Pekerjaan</div>
            <div class="text-bold">{{ data.pekerjaan }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>No Hp</div>
            <div class="text-bold">{{ data.no_hp }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Jenis Kelamin</div>
            <div class="text-bold">{{ data.jenis_kelamin }}</div>
          </div>
        </div>
        <div class="text-h6 q-mt-sm">Data Pengajuan</div>
        <div class="row q-col-gutter-y-sm">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Keperluan KUR</div>
            <div class="text-bold">{{ data.keperluan_kur }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Status Tempat Usaha</div>
            <div class="text-bold">{{ data.status_tempat_usaha }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Alamat Usaha</div>
            <div class="text-bold">{{ data.alamat_usaha }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Status Rumah</div>
            <div class="text-bold">{{ data.status_rumah }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Jumlah Tenaga Kerja</div>
            <div class="text-bold">{{ data.jumlah_tenaga_kerja }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Sektor Usaha</div>
            <div class="text-bold">{{ data.sektor_usaha }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Jumlah pengajuan</div>
            <div class="text-bold">{{ $formatPrice(data.jumlah) }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Jangka Waktu</div>
            <div class="text-bold">{{ data.jangka_waktu }} Bulan</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Status Pengajuan</div>
            <div class="text-bold">{{ data.status_pengajuan }} Bulan</div>
          </div>
        </div>
        <div class="text-h6 q-mt-sm">Riwayat Status Pengajuan</div>
        <div class="row q-col-gutter-y-sm q-mt-sm">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-list bordered separator>
              <q-item v-for="(d, i) in data.history" :key="i">
                <q-item-section>
                  <q-item-label>{{ d.kur_setting.status }}</q-item-label>
                  <q-item-label caption>{{ $parseDate(d.created_at).fullDate }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="data">
        <div class="text-h6 q-mt-sm">File Lampiran</div>
        <q-btn
          label="Lihat Lampiran RUT"
          unelevated
          color="primary"
          :href="`${$baseURL}file-rut/${data.file_rut}`"
          target="_blank"
          class="q-mr-sm"
          outline
          v-if="data.file_rut"
          type="a"
        />
        <div v-else>Tidak Ada File RUT</div>
        <q-btn
          label="Lihat Lampiran Lainya"
          unelevated
          color="primary"
          :href="`${$baseURL}file-rut/${data.file_lainnya1}`"
          target="_blank"
          v-if="data.file_lainnya1"
          type="a"
        />
        <div v-else>Tidak Ada File Lainya</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import getArea from '../../../helper/ParseArea'
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
      this.$axios.get(`kur/pengajuan-detail/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.data = res.data.result
            this.data.kabupaten = this.data.Kabupaten
          }
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
