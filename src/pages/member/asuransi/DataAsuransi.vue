<template>
  <q-page padding>
    <div class="row q-col-gutter-x-sm q-col-gutter-y-sm">
      <div class="col-12" v-for="(d, i) in listType" :key="i">
        <q-card flat>
          <q-card-section>
            <div class="text-h5 text-bold text-primary">{{ d.nama_asuransi }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Tekan Tombol Detail Untuk Melihat Data Pengajuan Asuransi.
          </q-card-section>
          <q-card-section class="q-pt-none row q-col-gutter-y-sm q-col-gutter-x-sm">
            <div class="col-md-3 col-sm-6 col-xs-12">
              <q-btn color="primary" class="full-width" unelevated :to="{name: d.routes_index}">
                <div class="text-button">Data Pengajuan</div>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
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
    },
    toForm (type) {
      if (type.nama_asuransi === 'BPJS') {
        this.$router.push({ name: 'dataPengajuanAsuransiBPJSMember' })
      } else {
        // Open Dialog AUTSK dan AUTP
        console.log('jasindo')
        // dataJasindoMember
      }
    }
  }
}
</script>

<style scoped>

</style>
