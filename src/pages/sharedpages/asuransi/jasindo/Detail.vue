<template>
  <q-page padding>
    <q-card flat>
      <q-card-section class="text-bold text-h6">
        Detail Data Pengajuan Asuransi Jasindo
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
            <div>Nama Kelompok</div>
            <div class="text-bold">{{ data.nama_kelompok }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Nama Ketua Kelompok</div>
            <div class="text-bold">{{ data.nama_ketua_kelompok }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Jenis Asuransi</div>
            <div class="text-bold">{{ data.jenis_asuransi }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Jalur Distribusi</div>
            <div class="text-bold">{{ data.jalur_distribusi }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Musim Tanam</div>
            <div class="text-bold">{{ data.musim_tanam ?? '-' }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Metode Tanam</div>
            <div class="text-bold">{{ data.metode_tanam ?? '-' }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Prakiraan Tanam</div>
            <div class="text-bold">{{ data.prakiraan_tanam ? $parseDate(data.prakiraan_tanam).fullDate : '-' }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Prakiraan Panen</div>
            <div class="text-bold">{{ data.prakiraan_panen ? $parseDate(data.prakiraan_panen).fullDate : '-' }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>File Anggota</div>
            <q-btn
              label="Lihat File"
              unelevated
              outline
              color="dark"
              type="a"
              target="_blank"
              :href="`${$baseURL}file-anggota/${data.file_anggota}`"
            />
          </div>
        </div>
        <!-- <div class="text-h6 q-mt-sm">Riwayat Status Pengajuan</div>
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
        </div> -->
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
      this.$axios.get(`master/asuransis-detail/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.data = res.data.result
          }
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
