<template>
  <q-page class="bg_green3">
    <div class="row justify-center flex flex-center items-center" :style="`height:${this.$q.screen.height - 80}px`">
      <div class="col-md-5 col-xs-11 column q-gutter-sm flex flex-center">
        <q-img src="img/sertif_benih/logo_lampung.png" style="width: 20%"/>
        <span class="text-h6 text-white text-center">BALAI PENGAWASAN DAN SERTIFIKASI BENIH TANAMAN PANGAN DAN HORTIKULTURA</span>
        <span class="text-white text-center">BPSB TPH mempunyai tugas melaksanakan kegiatan pengawasan peredaran benih di pasaran,
          bertanggung jawab terhadap proses sertifikasi benih tanaman pangan dan hortikultura,
          pengujian adaptasi varietas, serta pelaksanaan perencanaan dan pembinaan terhadap petani penangkar benih
          </span>
          <div class="row q-py-md q-gutter-md flex-center" >
            <q-btn class="bg-yellow2 text-bold" no-caps label="Rekomendasi Pengedar Benih" :to="{ name: 'RekomendasiPengedarMember', params: { idFitur: 80 } }"/>
            <q-btn class="bg-yellow2 text-bold" no-caps label="Sertifikasi Benih Pertanian" :to="{ name: 'SertifBenihPertanianMember', params: {idFitur: 81} }"/>
          </div>
          <div class="text-center">
            <q-btn class="text-white text-bold"  @click="this.$router.push({ name: 'indexLayanan'})"  outline no-caps label="Kembali Ke Menu Utama"/>
          </div>
      </div>
    </div>
    <div class="bg-yellow2 text-bold text-black flex flex-center absolute-bottom">
      <span>Copyright © 2023 Kartu Petani Berjaya. All Right Reserved</span>
    </div>
  </q-page>
</template>

<script>
export default {
  setup () {

  }
}
</script>

<style scoped>
.bg_green3 {
  background: #32573F;
}
.bg_green2 {
  background: #32573F;
}
.green2 {
  color: #32573F;
}
.bg_white{
  background: white;
}
.bg-yellow1 {
  background: #FFF051;
}
.bg-yellow2 {
  background: #FFBB16;
}
.yellow2 {
  color: #FFBB16;
}
.bg-grey1 {
  background: #EFF6F1;
}
</style>
