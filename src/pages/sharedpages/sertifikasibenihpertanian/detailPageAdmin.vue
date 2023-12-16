<template>
  <q-page style="background: #EFF6F1">
    <div class="" style="background: #32573F; height: 80px"></div>
    <div class="q-mx-xl absolute-top" style="margin-top: 50px">
      <div class="q-mb-md q-mx-sm q-pa-md bg-white rounded">
        <span class="text-h6 texts-weight-medium">Detail Pengajuan</span>
      </div>
      <div class="row">
        <div class="col-4 q-px-sm column">
          <q-scroll-area :style="`height: ${this.$q.screen.height - 220}px; width: 100%`">
            <div class="q-pa-sm q-mb-sm bg-blue-7 rounded column text-white">
              <span class="items-center justify-center"> <q-icon name="info"/> Status</span>
              <span v-if="data.status === 0" class="text-h6 text-weight-bold q-mb-sm">Verifikasi Berkas</span>
              <span v-else-if="data.status === 1" class="text-h6 text-weight-bold q-mb-sm">Kunjungan Pendahuluan</span>
              <span v-else-if="data.status === 2" class="text-h6 text-weight-bold q-mb-sm">Pemeriksaan Fase Vegetatif</span>
              <span v-else-if="data.status === 3" class="text-h6 text-weight-bold q-mb-sm">Pemeriksaan Fase Berbunga</span>
              <span v-else-if="data.status === 4" class="text-h6 text-weight-bold q-mb-sm">Pemeriksaan Fase Masak</span>
              <span v-else-if="data.status === 5" class="text-h6 text-weight-bold q-mb-sm">Pengawasan Panen</span>
              <span v-else-if="data.status === 6" class="text-h6 text-weight-bold q-mb-sm">Pengawasan Pengelolaan Benih</span>
              <span v-else-if="data.status === 7" class="text-h6 text-weight-bold q-mb-sm">Pengujian Benih</span>
              <span v-else-if="data.status === 8" class="text-h6 text-weight-bold q-mb-sm">Laporan Pengujian</span>
              <span v-else class="text-h6 text-weight-bold q-mb-sm">Laporan Pengujian</span>
              <div class="column q-gutter-sm q-mb-sm">
                <q-btn v-if="data.status < 8" label="Konfirmasi Pemohonan" class="q-mx-md" no-caps color="yellow-8" rounded/>
                <q-btn v-if="data.status < 8" label="Tolak Permohonan" class="q-mx-md" no-caps color="red-8" rounded/>
              </div>
              <div v-if="data.status === 8" class="column q-gutter-sm q-mb-sm">
                <q-btn label="Upload Sertifikat" class="q-mx-md" no-caps color="yellow-8" rounded/>
              </div>
              <div v-if="data.status === 9" class="column q-gutter-sm q-mb-sm">
                <q-btn label="Unduh Sertifikat" class="q-mx-md" no-caps color="yellow-8" rounded/>
              </div>
            </div>
            <div class="column q-mb-sm q-gutter-sm" >
              <q-btn v-if="data.status > 7"  label="Unduh Hasil Pengujian" no-caps outline />
              <q-btn label="Lihat Bukti Pembayaran" no-caps outline />
            </div>
            <div class="rounded bg-white q-pa-sm q-mb-sm column">
              <span class="text-green-10 text-h6 text-weight-bold">Pengajuan Permohonan</span>
              <span class="text-caption text-weight-light">28 Februari 2023 | 09:03</span>
              <a href="" class="text-info">Lihat Detail Status</a>
              <q-separator class="q-my-sm" color="grey-8"/>
              <div class="row text-grey-8">
                <span class="col-6 text-left">Nama Pemohon</span>
                <span class="col-6 text-right">Andre</span>
                <span class="col-6 text-left">Jenis Komoditi</span>
                <span class="col-6 text-right">Andre</span>
                <span class="col-6 text-left">Total Benih</span>
                <span class="col-6 text-right">Andre</span>
                <span class="col-6 text-left">Nomor Telepon</span>
                <span class="col-6 text-right">Andre</span>
              </div>
            </div>
            <div class="rounded bg-white q-pa-sm q-mb-sm column">
              <span class="text-body1 text-weight-bold q-mb-sm">Tanggal Kunjungan</span>
              <q-list class="rounded-borders">
                <q-expansion-item
                  expand-separator
                  v-if="data.status > 6"
                  label="Pengujian Benih"
                >
                  <q-card>
                    <q-card-section>
                      <span>13 Desember 2023 | 13:03</span>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  expand-separator
                  v-if="data.status > 5"
                  label="Pengawasan Pengolahan Benih"
                >
                  <q-card>
                    <q-card-section>
                      <span>13 Desember 2023 | 13:03</span>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  expand-separator
                  v-if="data.status > 4"
                  label="Pemeriksaan Pengawasan Panen"
                >
                  <q-card>
                    <q-card-section>
                      <span>13 Desember 2023 | 13:03</span>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  expand-separator
                  v-if="data.status > 3"
                  label="Fase Masak"
                >
                  <q-card>
                    <q-card-section>
                      <span>13 Desember 2023 | 13:03</span>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  expand-separator
                  v-if="data.status > 2"
                  label="Fase Berbunga"
                >
                  <q-card>
                    <q-card-section>
                      <span>13 Desember 2023 | 13:03</span>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  v-if="data.status > 1"
                  expand-separator
                  label="Fase Vegetatif"
                >
                  <q-card>
                    <q-card-section>
                      <span>13 Desember 2023 | 13:03</span>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  v-if="data.status > 1"
                  expand-separator
                  label="Fase Pendahuluan"
                >
                  <q-card>
                    <q-card-section>
                      <span>13 Desember 2023 | 13:03</span>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </div>
          </q-scroll-area>
        </div>
        <div class="col-8 q-px-sm">
          <q-scroll-area :style="`height: ${this.$q.screen.height - 220}px; width: 100%`">
            <div class="bg-white q-pa-md column rounded">
              <span class="text-h6 text-weight-bold">Dokumen Berkas</span>
              <span class="text-caption q-mb-md">Berkas-Berkas Yang Harus Diisi Dan Lengkapi</span>
              <div class="q-mx-sm q-mb-sm q-pa-md border bg-white column">
                <span class="text-body1">Dokumen Berkas Pengujian Benih</span>
                <span class="text-caption q-mb-md">Anda Dapat mengedit Berkas Selama Belum Diverifikasi Oleh Admin</span>
                <div class="row">
                  <q-btn class="q-mx-sm" label="Hasil Pemeriksaan" rounded color="info" no-caps/>
                  <q-btn class="q-mx-sm" label="Lihat Berkas" rounded color="green-10" no-caps/>
                </div>
              </div>
              <div class="q-mx-sm q-mb-sm q-pa-md border bg-white column">
                <span class="text-body1">Dokumen Berkas Pengawasan Pengolahan Benih</span>
                <span class="text-caption q-mb-md">Anda Dapat mengedit Berkas Selama Belum Diverifikasi Oleh Admin</span>
                <div class="row">
                  <q-btn class="q-mx-sm" label="Hasil Pemeriksaan" rounded color="info" no-caps/>
                  <q-btn class="q-mx-sm" label="Lihat Berkas" rounded color="green-10" no-caps/>
                </div>
              </div>
              <div class="q-mx-sm q-mb-sm q-pa-md border bg-white column">
                <span class="text-body1">Dokumen Berkas Pengawasan Panen</span>
                <span class="text-caption q-mb-md">Anda Dapat mengedit Berkas Selama Belum Diverifikasi Oleh Admin</span>
                <div class="row">
                  <q-btn class="q-mx-sm" label="Hasil Pemeriksaan" rounded color="info" no-caps/>
                  <q-btn class="q-mx-sm" label="Lihat Berkas" rounded color="green-10" no-caps/>
                </div>
              </div>
              <div class="q-mx-sm q-mb-sm q-pa-md border bg-white column">
                <span class="text-body1">Dokumen Berkas Fase Masak</span>
                <span class="text-caption q-mb-md">Anda Dapat mengedit Berkas Selama Belum Diverifikasi Oleh Admin</span>
                <div class="row">
                  <q-btn class="q-mx-sm" label="Hasil Pemeriksaan" rounded color="info" no-caps/>
                  <q-btn class="q-mx-sm" label="Lihat Berkas" rounded color="green-10" no-caps/>
                </div>
              </div>
              <div class="q-mx-sm q-mb-sm q-pa-md border bg-white column">
                <span class="text-body1">Dokumen Berkas Fase Berbunga</span>
                <span class="text-caption q-mb-md">Anda Dapat mengedit Berkas Selama Belum Diverifikasi Oleh Admin</span>
                <div class="row">
                  <q-btn class="q-mx-sm" label="Hasil Pemeriksaan" rounded color="info" no-caps/>
                  <q-btn class="q-mx-sm" label="Lihat Berkas" rounded color="green-10" no-caps/>
                </div>
              </div>
              <div class="q-mx-sm q-mb-sm q-pa-md border bg-white column">
                <span class="text-body1">Dokumen Berkas Fase Vegetatif</span>
                <span class="text-caption q-mb-md">Anda Dapat mengedit Berkas Selama Belum Diverifikasi Oleh Admin</span>
                <div class="row">
                  <q-btn class="q-mx-sm" label="Hasil Pemeriksaan" rounded color="info" no-caps/>
                  <q-btn class="q-mx-sm" label="Lihat Berkas" rounded color="green-10" no-caps/>
                </div>
              </div>
              <div class="q-mx-sm q-mb-sm q-pa-md border bg-white column">
                <span class="text-body1">Dokumen Berkas Pendahuluan</span>
                <span class="text-caption q-mb-md">Anda Dapat mengedit Berkas Selama Belum Diverifikasi Oleh Admin</span>
                <div class="row">
                  <q-btn class="q-mx-sm" label="Hasil Pemeriksaan" rounded color="info" no-caps/>
                  <q-btn class="q-mx-sm" label="Lihat Berkas" rounded color="green-10" no-caps/>
                </div>
              </div>
              <div class="q-mx-sm q-mb-sm q-pa-md border bg-white column">
                <span class="text-body1">Dokumen Berkas Pengajuan</span>
                <span class="text-caption q-mb-md">Anda Dapat mengedit Berkas Selama Belum Diverifikasi Oleh Admin</span>
                <div class="row">
                  <q-btn class="q-mx-sm" label="Hasil Pemeriksaan" rounded color="info" no-caps/>
                  <q-btn class="q-mx-sm" label="Lihat Berkas" rounded color="green-10" no-caps/>
                </div>
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>
    </div>
    <q-dialog v-model="dialogTanggal" style="width: 50%" persistent>
      <div class="bg-white border q-pa-md column" style="width: 100%;">
        <span class="text-grey-10 text-h5 text-weight-bold">Pengajuan Fase Vegetatif</span>
        <span class="text-body text-grey-6">Kirim Hasil Pemeriksaan</span>
        <q-form class="q-mt-md column">
          <q-input outlined label="Tanggal Kunjungan" class="q-mb-md" />
          <q-btn label="Setujui" color="green-10" no-caps v-close-popup />
        </q-form>
      </div>
    </q-dialog>
    <q-dialog v-model="dialogFile" style="width: 50%" persistent>
      <div class="bg-white border q-pa-md column" style="width: 100%;">
        <span class="text-grey-10 text-h5 text-weight-bold">Pengajuan Fase Vegetatif</span>
        <span class="text-body text-grey-6">Kirim Hasil Pemeriksaan</span>
        <q-form class="q-mt-md column">
          <q-file outlined label="Tanggal Kunjungan" class="q-mb-md">
            <template v-slot:append>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <q-btn label="Setujui" color="green-10" no-caps v-close-popup />
        </q-form>
      </div>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      dialogTanggal: false,
      dialogFile: true,
      data: {
        status: 0
      }
    }
  }
}
</script>
