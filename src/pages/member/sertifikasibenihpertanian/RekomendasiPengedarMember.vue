<template>
  <q-page style="background: #EFF6F1">
    <div class="bg_green2" style="height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} absolute-top`" style="margin-top: 55px">
      <div class="bg-white q-pa-sm ">
        <q-btn class="q-mx-sm" rounded icon="mdi-arrow-left" @click="this.$router.go(-1)" dense flat/>
        <span class="text-bold">Dashboard Pengedar Benih</span>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} q-py-xl`">
      <div class="row q-mx-sm justify-between">
        <div class="col-xs-12 col-md-auto">
          <q-card flat>
            <q-card-section>
              <div class="text-h6 text-bold">Ajukan Rekomendasi</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              Silahkan ajukan permohonan anda
            </q-card-section>
            <q-btn
              :to="{ name: 'PengajuanPengedarPageMember' }"
              class="q-mx-md q-mb-md bg-yellow2 text-bold"
              no-caps
              label="Ajukan Permohonan"
              rounded />
            <q-separator color="grey" inset />
            <q-card-section>
              <div class="text-h6 text-bold">Riwayat Pengajuan Rekomendasi</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              Anda Memiliki .... Pengajuan
            </q-card-section>
            <q-btn
              :to="{ name: 'ListPengedarPageMember'}"
              class="q-mx-md q-mb-md bg-yellow2 text-bold"
              no-caps
              label="Pengajuan anda sebelumnya"
              rounded />
          </q-card>
        </div>
        <div :class="`${this.$q.screen.xs ? 'q-mt-md' : '' } col q-px-lg`">
          <div class="row">
            <span class="text-h6 text-weight-medium">Panduan Permohonan</span>
            <q-separator/>
          </div>
          <div class="">
            <q-list>
              <q-expansion-item
              header-class="bg-white text-black"
              icon="all_inbox"
              label="Template Permohonan">
                <q-card class="q-pa-sm">
                  <q-card-section>
                    <span>
                    a. Surat Permohonan <br>
                    b. KTP <br>
                    c. Foto 4 x 6 (2 lembar) <br>
                    d. Akte Pendirian Perusahaan, SITU/ SIUP. (Bagi Badan Usaha)<br>
                    e. NPWP<br>
                    f. Nomor Induk Berusaha (NIB) dari OSS<br>
                    g. Keterangan Rencana Kerja Tahunan Benih yang akan diproduksi (Jenis, varietas, kelas benih, jumlah benih)<br>
                    h. Keterangan penguasaan lahan (luas dan status lahan)<br>
                    i. Keterangan penguasaan sarana pengolahan benih (jenis, jumlah, Kapasitas)<br>
                    j. Keterangan sarana penunjang (gudang, alat transportasi, tempat penyimpanan benih)<br>
                    k. Keterangan mempunyai jumlah dan kompetensi tenaga kerja dibidang (perbenihan)<br>
                    </span>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item
                header-class="bg-white text-black"
                class="q-py-sm"
                icon="all_inbox"
                label="Penilaian Lapangan">
                <q-card class="q-pa-sm">
                  <q-card-section>
                    <span>a. Surat Rekomendasi |
                      <a href="url">(Unduh PDF)</a>
                      <a href="url">(Unduh Word)</a>
                    </span>
                  </q-card-section>
                  <q-card-section>
                    <span>b. Denah Lokasi Penangkar |
                      <a href="url">(Unduh PDF)</a>
                      <a href="url">(Unduh Word)</a>
                    </span>
                  </q-card-section>
                  <q-card-section>
                    <span>c. Label Benih Sumber |
                      <a href="url">(Unduh PDF)</a>
                      <a href="url">(Unduh Word)</a>
                    </span>
                  </q-card-section>
                  <q-card-section>
                    <span>d. Formulir Pendaftar |
                      <a href="url">(Unduh PDF)</a>
                      <a href="url">(Unduh Word)</a>
                    </span>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item
                header-class="bg-white text-black"
                icon="all_inbox"
                label="Alur Permohonan Sebagai Produsen">
                <q-card class="q-pa-sm">
                  <q-card-section>
                    <span>a. Surat Rekomendasi |
                      <a href="url">(Unduh PDF)</a>
                      <a href="url">(Unduh Word)</a>
                    </span>
                  </q-card-section>
                  <q-card-section>
                    <span>b. Denah Lokasi Penangkar |
                      <a href="url">(Unduh PDF)</a>
                      <a href="url">(Unduh Word)</a>
                    </span>
                  </q-card-section>
                  <q-card-section>
                    <span>c. Label Benih Sumber |
                      <a href="url">(Unduh PDF)</a>
                      <a href="url">(Unduh Word)</a>
                    </span>
                  </q-card-section>
                  <q-card-section>
                    <span>d. Formulir Pendaftar |
                      <a href="url">(Unduh PDF)</a>
                      <a href="url">(Unduh Word)</a>
                    </span>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
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
.bg_green2 {
  background: #32573F;
}
.green2 {
  color: #32573F;
}
.bg-yellow1 {
  background: #FFF051;
}
.bg-yellow2 {
  background: #FFBB16;
}
.bg-grey1 {
  background: #EFF6F1;
}
</style>
