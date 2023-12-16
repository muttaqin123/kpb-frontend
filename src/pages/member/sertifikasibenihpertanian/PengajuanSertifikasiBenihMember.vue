<template>
  <q-page class="bg-grey1">
    <div class="bg_green2" style="height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} absolute-top`" style="margin-top: 55px">
      <div class="bg-white q-pa-sm ">
        <q-btn class="q-mx-sm" rounded icon="mdi-arrow-left" @click="this.$router.go(-1)" dense flat/>
        <span class="text-bold">Dashboard Pengajuan Sertifikasi Benih</span>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} q-py-xl`">
      <div class="row q-mx-sm justify-between">
        <div class="col-auto">
          <q-card flat>
            <q-card-section>
              <div class="text-h6 text-bold">Ajukan Rekomendasi</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              Silahkan ajukan permohonan anda
            </q-card-section>
            <q-btn
              class="q-mx-md q-mb-md bg-yellow2 text-bold"
              no-caps
              label="Ajukan Permohonan"
              :to="{ name: 'PengajuanSertifBenihMember' }"
              rounded />
            <q-separator color="grey" inset />
            <q-card-section>
              <div class="text-h6 text-bold">Riwayat Pengajuan Rekomendasi</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              Pengajuan Anda Sebelumnya
            </q-card-section>
            <q-btn
              class="q-mx-md q-mb-md bg-yellow2 text-bold"
              no-caps
              :to="{ name:'ListSertifBenihMember' }"
              label="Pengajuan anda sebelumnya"
              rounded />
          </q-card>
        </div>
        <div :class="`${this.$q.screen.xs ? 'q-mx-sm q-mt-md' : 'q-mx-xl '} col`">
          <div class="row">
            <span class="text-h6 text-weight-medium">Panduan Permohonan</span>
            <q-separator/>
          </div>
          <div class="">
            <q-list>
            <q-expansion-item
            header-class="bg-white text-black"
            class="text-bold"
            icon="all_inbox"
            label="Template Permohonan">
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
              class="text-bold q-py-sm"
              icon="all_inbox"
              label="Template Pendahuluan">
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
              class="text-bold"
              icon="all_inbox"
              label="Template Lapangan">
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
.bg_white{
  background: white;
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
