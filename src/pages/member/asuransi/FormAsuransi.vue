<template>
  <q-page padding>
    <div class="row q-col-gutter-x-sm q-col-gutter-y-sm">
      <div class="col-12" v-for="(d, i) in listType" :key="i">
        <q-card flat>
          <q-card-section>
            <div class="text-h5 text-bold text-primary">{{ d.nama_asuransi }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Tekan Tombol Detail Untuk Melihat Persyarat Asuransi.
          </q-card-section>
          <q-card-section class="q-pt-none row q-col-gutter-y-sm q-col-gutter-x-sm">
            <div class="col-md-3 col-sm-6 col-xs-12">
              <q-btn color="primary" outline class="full-width" unelevated type="a" target="_blank" :href="d.url">
              <!-- <q-btn color="primary" outline class="full-width" unelevated @click="d.opened = !d.opened"> -->
                <div class="text-button text-primary">{{ d.opened ? 'Tutup Detail' : 'Lihat Persyaratan' }}</div>
              </q-btn>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
              <q-btn color="primary" class="full-width" unelevated :to="{name: d.form_routes}">
                <div class="text-button">Form Pengajuan</div>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
        <!-- <q-card flat v-if="d.opened">
          <q-card-section>
            <iframe class="full-width" style="height: 800px;" src="https://www.bpjs-kesehatan.go.id/bpjs/pages/detail/2014/20" frameborder="1"></iframe>
          </q-card-section>
        </q-card> -->
        <!-- <q-card flat>
          <q-card-section>
            <div class="text-h5 text-bold text-primary">{{ m.nama_bank }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ m.alamat }}
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-btn color="primary" unelevated @click="openDialog(m)">
              <div class="text-button">Ajukan Sekarang</div>
            </q-btn>
          </q-card-section>
        </q-card> -->
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      listType: [],
      data: null,
      dialog: false,
      file_rut: null,
      file_lainnya1: null,
      listStatusNasabah: ['Baru', 'Lama'],
      listStatusRumah: ['Sewa', 'Kontrak', 'Milik Orang Tua', 'Milik Sendiri'],
      listSektorUsaha: ['Perdagangan', 'Pertanian', 'Perkebunan', 'Perikanan', 'Peternakan', 'Lainnya'],
      listStatusTempatUsaha: ['Sewa', 'Kontrak', 'Milik Orang Tua', 'Milik Sendiri']
    }
  },
  created () {
    this.getTypeAsuransi()
  },
  methods: {
    getTypeAsuransi () {
      this.$showLoading()
      this.$axios.get('master/asuransi-type', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          if (this.$parseResponse(res.data, false)) {
            this.listType = res.data.result.map(r => {
              return { ...r, opened: false }
            })
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>

<style scoped>

</style>
