<template>
  <q-page v-if="show" padding style="background: #F2F7F5">
    <div class="row">
      <!-- Row Samping -->
      <div class="col-md-3 col-sm-12 col-xs-12 column q-px-sm">
        <div v-if="this.data.status === 4 || this.data.status === 5 " class="column border-shadow bg-blue-9 text-white q-pa-sm">
          <div class="row">
            <q-icon name="info_outline" size="xs"/>
            <span class="q-ml-sm text-weight-medium">Pemberitahuan</span>
            <span v-if="this.data.status === 5 && this.data.file_blanko">Pastikan data pada blanko sertifikat sudah anda isi dengan tepat</span>
            <span v-if="this.data.status === 4">Sebelum anda mengambil sertifikat silahkan isi Rating kepuasan terlebih dahulu</span>
          </div>
        </div>
        <!-- Tampilan Admin -->
        <div v-if="(this.$route.name === 'permohonanOkkpd' && this.data.status <= 3) || (this.$route.name === 'permohonanOkkpd' && this.data.status == 10)"
          class="">
          <div
            class="column border-shadow q-pa-sm q-mt-sm text-green-10">
            <span v-if="this.data.status === 0" class="text-h6 text-weight-bold">Konfirmasi Verifikasi Berkas</span>
            <span v-if="this.data.status === 1" class="text-h6 text-weight-bold">Konfirmasi Verifikasi Lapangan</span>
            <span v-if="this.data.status === 2 || this.data.status === 3" class="text-h6 text-weight-bold">Konfirmasi Verifikasi Lab</span>
            <span v-if="this.data.status === 10" class="text-h6 text-weight-bold">Konfirmasi Revisi Berkas</span>
            <span>Pastikan data yang anda konfirmasi sudah sesuai</span>
            <div
              v-if="this.data.status !== 2"
              class="column q-gutter-sm q-mt-sm">
              <q-btn v-if="this.data.status === 0" label="Konfirmasi" @click="updateStatus(this.data.status + 1, true)" color="green-10" no-caps/>
              <q-btn v-else-if="this.data.status === 10 && !containshasilLab" label="Konfirmasi" @click="updateStatus(1, true)" color="green-10" no-caps/>
              <q-btn v-else-if="this.data.status === 3 || containshasilLab" label="Konfirmasi" @click="addBlanko(4)" color="green-10" no-caps/>
              <q-btn v-else label="Konfirmasi" @click="updateStatus(this.data.status + 1, false)" color="green-10" no-caps/>
              <!-- <q-btn label="Tolak" @click="dialogError = !dialogError" color="negative" no-caps/> -->
              <q-btn label="Revisi" @click="dialogRevisiPermohonan = !dialogRevisiPermohonan" color="negative" no-caps/>
              <!-- <q-btn v-if="this.data.status === 1" label="Reschedule" @click="dialogReSchedule = !dialogReSchedule" color="negative" no-caps/> -->
            </div>
            <div v-else class="q-mt-md">
              <span>Pemohon Belum Mengirimkan Hasil Lab</span>
            </div>
            <div class="column" v-if="this.data.status === 9 || this.data.status === 10">
              <span class="q-mt-sm">Alasan:</span>
              <span>{{ data.okkpd_chld_berkas_permohonan[data.okkpd_chld_berkas_permohonan.length - 1].keterangan }}</span>
            </div>
          </div>
        </div>
        <!-- Akhir Tampilan Admin -->
        <div class="column border-shadow q-pa-sm q-mt-sm text-green-10" >
          <span class="text-h6 text-weight-bold">Pengajuan Permohonan</span>
          <span>{{ this.$parseDate(data.tanggal_pengajuan).timeStap }}</span>
          <div class="">
            <q-badge v-if="data.status !== 4" class="q-pa-xs" :color="array[getIndexByKey(String(data.status))].color">{{ array[getIndexByKey(String(data.status))].label }}</q-badge>
            <q-badge v-else class="q-pa-xs" color="positive">Berhasil Uji Lab</q-badge>
          </div>
          <q-btn v-if="this.data.status === 2 && this.$route.name !== 'permohonanOkkpd'" :to="{ name: 'pengajuanSCHC', params: { idDetail: data.id_berkas_permohonan ,id: data.id_berkas_pengujian_lab}}" label="Unggah Berkas Pengajuan Lab" class="q-mt-sm" color="green-10" no-caps/>
          <q-btn v-if="this.data.status === 4 && this.$route.name !== 'permohonanOkkpd'" :to="{ name: 'ratingKepuasan', params: { idDetail: data.id_berkas_permohonan ,id: data.id_form_penilaian }}" label="Beri Rating Kepuasan" class="q-mt-sm" color="green-10" no-caps/>
          <div class="q-mt-md q-pa-xs" v-if="this.data.status === 8 || this.data.status === 9">
            <span class="text-body1 text-weight-bold">Alasan: </span> <br>
            <span>{{ data.okkpd_chld_berkas_permohonan[data.okkpd_chld_berkas_permohonan.length - 1].keterangan }}</span>
          </div>
          <q-btn
            v-if="this.data.status === 8"
            label="Lihat Alasan Gagal"
            class="q-mt-sm"
            color="negative"
            no-caps
            type="a"
            target="_blank"
            :href="`${$baseURL}file-okkpd/${data.okkpd_chld_berkas_permohonan[data.okkpd_chld_berkas_permohonan.length - 1].file}`"/>
          <div v-if="(this.data.status === 5 && this.$route.name === 'detailPermohonanOkkpd') && this.data.file_blanko !== null" class="column q-mt-md">
            <span>
              1.Silahkan download template blanko sertifikat disini
            </span>
            <q-btn
              label="Download Blanko Sertifikat"
              no-caps
              color="green-10"
              class="q-ma-sm"
              type="a"
              target="_blank"
              :href="`${$baseURL}file-okkpd/${data.file_blanko}`"/>
            <span>
              2.Pastikan data sudah sesuai,apabila sudah sesuai maka kirim kembali blanko yang sudah diisi tersebut
            </span>
            <q-btn @click="addBlanko(6)" label="Upload Blanko Sertifikat" no-caps color="green-10" class="q-ma-sm"/>
          </div>
          <div v-if="this.data.status >= 5 && this.data.status !== 8 && this.data.status !== 9 && this.data.status !== 10"  class="column q-gutter-sm q-mt-sm">
            <q-btn
              v-if="this.$route.name === 'permohonanOkkpd' && this.data.status !== 9"
              label="Lihat Ulasan"
              color="green-10"
              no-caps
              :to="{ name: 'ratingKepuasanOkkpd', params: { idDetail: data.id_berkas_permohonan ,id: data.id_form_penilaian }}" />
            <q-btn
              v-else
              label="Lihat Ulasan"
              color="green-10"
              no-caps
              :to="{ name: 'ratingKepuasan', params: { idDetail: data.id_berkas_permohonan ,id: data.id_form_penilaian }}" />
            <q-btn
              v-if="(this.$route.name !== 'permohonanOkkpd' || this.data.status === 7) && this.data.file_blanko !== null"
              :label="this.data.okkpd_chld_berkas_permohonan[data.okkpd_chld_berkas_permohonan.length -1].keterangan === 'Selesai' ? 'Download Sertifikat' : 'Lihat blanko sertifikat'"
              color="green-10"
              no-caps
              type="a"
              target="_blank"
              :href="`${$baseURL}file-okkpd/${data.file_blanko}`" />
          </div>
        </div>
        <div
          v-if="(this.data.status === 6 && this.$route.name === 'permohonanOkkpd')"
          class="column border-shadow q-pa-sm q-mt-sm text-green-10">
          <span class="text-h6 text-weight-bold">Blanko sertifikat</span>
          <span>Blanko yang sudah diisi oleh pemohon</span>
          <div class="row">
            <q-input outlined label="File" v-model="data.file_blanko" class="col"/>
            <q-btn
              class="col-1 q-ml-sm"
              icon="download"
              no-caps
              color="green-10"
              type="a"
              target="_blank"
              :href="`${$baseURL}file-okkpd/${data.file_blanko}`"  />
          </div>
          <q-btn
            class="q-mt-sm"
            @click="updateStatus(7, true)"
            label="Tentukan Tanggal Pengambilan"
            no-caps
            color="green-10" />
        </div>
        <div v-if="this.data.status > 0 && this.data.status < 5 " class="column border-shadow q-mt-sm q-pa-sm text-green-10">
          <div class="row items-center">
            <q-icon name="date_range" size="xs"/>
            <span class="q-ml-sm">Tanggal Kunjungan</span>
          </div>
          <span class="q-ml-sm text-h6 text-weight-bold">{{ arrayHistory[getIndexByStatus(1)].keterangan }}</span>
          <q-btn v-if="this.$route.name === 'permohonanOkkpd' && this.data.status === 1" class="q-mt-sm" label="Ubah Jadwal" no-caps color="green-10" @click="dialogReSchedule = !dialogReSchedule"/>
        </div>
        <div v-if="this.data.tanggal_pengambilan !== null " class="column border-shadow q-mt-sm q-pa-sm text-green-10">
          <div class="row items-center">
            <q-icon name="date_range" size="xs"/>
            <span class="q-ml-sm">Tanggal Pengambilan</span>
          </div>
          <span class="q-ml-sm text-h6 text-weight-bold">{{ data.tanggal_pengambilan }}</span>
        </div>
        <div v-if="this.data.tanggal_penerbitan !== null " class="column border-shadow q-mt-sm q-pa-sm text-green-10">
          <div class="row items-center">
            <q-icon name="date_range" size="xs"/>
            <span class="q-ml-sm">Tanggal Penerbitan</span>
          </div>
          <span class="q-ml-sm text-h6 text-weight-bold">{{ data.tanggal_penerbitan }}</span>
        </div>
        <div v-if="this.data.tanggal_berakhir !== null " class="column border-shadow q-mt-sm q-pa-sm text-green-10">
          <div class="row items-center">
            <q-icon name="date_range" size="xs"/>
            <span class="q-ml-sm">Tanggal Berakhir</span>
          </div>
          <span class="q-ml-sm text-h6 text-weight-bold">{{ data.tanggal_berakhir }}</span>
        </div>
        <!-- Btn Untuk Melihat Berkas Pengajuan Lab -->
        <div v-if="this.data.status >= 3 && containshasilLab" class="q-pa-sm border-shadow q-ma-sm column">
          <q-btn
            :to="{ name: 'editpengajuanSCHC', params: { idDetail: data.id_berkas_permohonan, id: data.id_berkas_pengujian_lab } }"
            v-if="(this.data.status < 4 || this.data.status === 9) && this.$route.name === 'detailPermohonanOkkpd' && containshasilLab "
            label="Edit Berkas Pengajuan Lab"
            no-caps
            color="info"
            outline
            class="q-ma-sm" />
          <q-btn
            :to="{ name: 'pengajuanSCHC', params: { idDetail: data.id_berkas_permohonan, id: data.id_berkas_pengujian_lab } }"
            v-if="this.$route.name === 'detailPermohonanOkkpd'"
            color="green-10"
            class="bg-white q-ma-sm"
            label="Lihat Berkas Pengajuan Lab"
            no-caps
            icon="file_copy"
            outline />
          <q-btn
            :to="{ name: 'pengajuanSCHCOkkpd', params: { idDetail: data.id_berkas_permohonan, id: data.id_berkas_pengujian_lab } }"
            v-else
            color="green-10"
            class="bg-white q-ma-sm"
            label="Lihat Berkas Pengajuan Lab"
            no-caps
            icon="file_copy"
            outline />
        </div>
        <!-- Awal Timeline -->
        <div class="column border-shadow q-mt-sm q-pa-sm text-green-10 ">
          <div class="text-h6 text-weight-bold">Status Permohonan</div>
          <div>Proses Timeline</div>
          <q-timeline color="secondary" class="q-pa-sm">
            <q-timeline-entry
              v-for="(d,i) in data.okkpd_chld_berkas_permohonan"
              :key="i"
              :title="`${d.status === 4 ? 'Selesai Uji Lab' : array[getIndexByKey(String(d.status))].label}`"
              :subtitle="this.$parseDate(d.tanggal).timeCustom"
              :color="(d.status === 8 || d.status === 9) ? 'negative' : (d.status <= '3' || d.status === 10) ? 'yellow-9' : 'positive'"
              :icon="(d.status === 8 || d.status === 9) ? 'close' : (d.status <= '3' || d.status === 10) ? 'mdi-cogs' : 'done'"
            >
              <span>
                {{ d.status === 9 ? `Alasan : ${d.keterangan}` : d.status === 4 ? 'Selesai di tahap uji Lab' : `${d.keterangan}` }}
              </span>
            </q-timeline-entry>
          </q-timeline>
        </div>
        <!-- Akhir Timeline -->
        <div class="border-shadow bg-info q-mt-sm">
          <div class="column q-pa-sm">
            <div class="row items-center">
              <q-icon name="info_outline" color="white" size="sm"/>
              <span class="q-ml-sm text-white" style="font-size: 18px">Pemberitahuan</span>
            </div>
            <span class="text-white q-pa-sm" style="font-size: 12px">
              Data yang sudah Diupload dapat diedit selama proses verifikasi berkas,apabila berkas sudah diverifikasi maka anda tidak dapat mengedit berkas kembali
            </span>
          </div>
        </div>
      </div>
      <!-- Akhir Row Samping -->
      <!-- Formulir -->
      <div class="col-md-9 col-sm-12 q-pa-sm">
        <div class="border-shadow q-gutter-sm text-green-10">
          <div class="" v-if="(data.status == 0 || data.status == 9  && !containshasilLab) && this.$route.name === 'detailPermohonanOkkpd'">
            <q-btn label="Edit Permohonan" @click="dataPopup" no-caps class="full-width" color="info" outline />
          </div>
          <div class="text-h5 text-weight-bold">
            Formulir Pengajuan Pengambilan Sampel
          </div>
          <span>Isi formulir pengajuan ini dengan data yang sesuai dan pastikan tidak ada data yang salah </span>
          <div class="text-h6 text-weight-bold  q-mt-sm">
            Data Diri Pemohon
          </div>
          <q-input
            outlined
            disable
            v-model="data.okkpd_form_permohonan.nama_pemohon"
            class="q-mr-sm"
            label="Nama Pemohon"/>

          <div class="row justify-between">
            <q-input
              class="col-md-3 col-xs-12 col-sm-12 q-pa-sm"
              outlined
              disable
              v-model="data.member.member.reg_provinces.name"
              label="Provinsi"/>
            <q-input
              class="col-md-3 col-xs-12 col-sm-12 q-pa-sm"
              outlined
              disable
              v-model="data.member.member.reg_regencies.name"
              label="Kabupaten"/>
            <q-input
              class="col-md-3 col-xs-12 col-sm-12 q-pa-sm"
              outlined
              disable
              v-model="data.member.member.reg_districts.name"
              label="Kecamatan"/>
            <q-input
              class="col-md-3 col-xs-12 col-sm-12 q-pa-sm"
              outlined
              disable
              v-model="data.member.member.reg_villages.name"
              label="Desa"/>
          </div>

          <q-input
            outlined
            disable
            v-model="data.okkpd_form_permohonan.nama_perusahaan"
            label="Nama Perusahaan"
            class="q-mr-sm"
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"/>

          <q-input
            disable
            v-model="data.okkpd_form_permohonan.alamat"
            label="Alamat Perusahaan Anda"
            type="textarea"
            class="q-mr-sm"
            outlined
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"
          />

          <div class="row">
            <q-input
              class="col"
              disable
              v-model="data.okkpd_form_permohonan.shm"
              label="Upload Data Kepemilikan Gudang (Milik Sendiri/Sewa)"
              outlined
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-input>
            <div class="flex flex-center q-pa-sm">
              <q-btn
                color="primary"
                label="Unduh"
                padding="sm md"
                no-caps
                type="a"
                target="_blank"
                :href="`${$baseURL}file-okkpd/${data.okkpd_form_permohonan.shm}`"/>
            </div>
          </div>

          <div class="row">
            <q-input
              disable
              class="col"
              v-model="data.okkpd_form_permohonan.ktpfile"
              label="Upload KTP"
              outlined
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-input>
            <div class="flex flex-center q-pa-sm">
              <q-btn
                color="primary"
                label="Unduh"
                padding="sm md"
                no-caps
                type="a"
                target="_blank"
                :href="`${$baseURL}file-okkpd/${data.okkpd_form_permohonan.ktpfile}`"/>
            </div>
          </div>

          <div class="row">
            <q-input
              disable
              class="col"
              v-model="data.okkpd_form_permohonan.npwp"
              label="Upload NPWP"
              outlined
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-input>
            <div class="flex flex-center q-pa-sm">
              <q-btn
                color="primary"
                label="Unduh"
                padding="sm md"
                no-caps
                type="a"
                target="_blank"
                :href="`${$baseURL}file-okkpd/${data.okkpd_form_permohonan.npwp}`"/>
            </div>
          </div>

          <div class="row">
            <q-input
              disable
              class="col"
              v-model="data.okkpd_form_permohonan.nib"
              label="Upload NIB"
              outlined
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-input>
            <div class="flex flex-center q-pa-sm">
              <q-btn
                color="primary"
                label="Unduh"
                padding="sm md"
                no-caps
                type="a"
                target="_blank"
                :href="`${$baseURL}file-okkpd/${data.okkpd_form_permohonan.nib}`"/>
            </div>
          </div>

          <div class="text-h6 text-weight-bold q-mt-md">
            Data Berkas Permohonan
          </div>
          <q-select
            outlined
            disable
            v-model="data.jenis_komoditi"
            use-input
            input-debounce="0"
            label="Jenis Komoditi"
            class="q-mr-sm"
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <div class="row justify-between">
            <q-input
              class="col-4 q-pa-xs"
              label="Jumlah Lot"
              type="number"
              disable
              v-model="data.jumlah_lot"
              outlined
              :rules="[
                val => val !== 0 || 'Mohon Isi'
              ]"/>
            <q-input
              class="col-4 q-pa-xs"
              label="Berat Bersih(Kg)"
              type="number"
              outlined
              disable
              v-model="data.berat_bersih"
              :rules="[
                val => val !== 0 || 'Mohon Isi'
              ]"/>
            <q-input
              class="col-4 q-pa-xs"
              label="Berat Kotor(Kg)"
              type="number"
              outlined
              disable
              v-model="data.berat_kotor"
              :rules="[
                val => val !== 0 || 'Mohon Isi'
              ]"/>
          </div>
          <q-input
            disable
            v-model="data.negara_tujuan"
            label="Negara Tujuan"
            class="q-mr-sm"
            outlined
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"
          />

          <div class="row">
            <q-input
              disable
              class="col"
              v-model="data.surat_permohonan"
              label="Surat Permohonan pengambilan sampel"
              accept=".pdf, .png, .jpg, .jpeg"
              outlined
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-input>
            <div class="flex flex-center q-pa-sm">
              <q-btn
                color="primary"
                label="Unduh"
                padding="sm md"
                no-caps
                type="a"
                target="_blank"
                :href="`${$baseURL}file-okkpd/${data.surat_permohonan}`"/>
            </div>
          </div>

          <div class="row">
            <q-input
              disable
              class="col"
              v-model="data.informasi_produk"
              label="Upload Informasi Produk"
              accept=".pdf, .png, .jpg, .jpeg"
              outlined
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-input>
            <div class="flex flex-center q-pa-sm">
              <q-btn
                color="primary"
                label="Unduh"
                padding="sm md"
                no-caps
                type="a"
                target="_blank"
                :href="`${$baseURL}file-okkpd/${data.informasi_produk}`"/>
            </div>
          </div>

          <div class="row q-mb-sm">
            <q-input
              disable
              class="col"
              v-model="data.dokumen_eksport"
              label="Upload Dokumen eksport /Shipping Instruction (SI)"
              accept=".pdf, .png, .jpg, .jpeg"
              outlined
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-input>
            <div class="flex flex-center q-pa-sm">
              <q-btn
                color="primary"
                label="Unduh"
                padding="sm md"
                no-caps
                type="a"
                target="_blank"
                :href="`${$baseURL}file-okkpd/${data.dokumen_eksport}`"/>
            </div>
          </div>

          <q-input
            disable
            v-model="data.nomor_si"
            label="Nomor Shipping Instruction (SI)"
            class="q-mr-sm"
            outlined
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"
          />
        </div>
      </div>
      <!-- Akhir Formulir -->
    </div>
    <q-dialog v-model="dialogEdit"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down">
      <q-card class="bg-white text-primary">
        <div class="row q-pa-sm">
          <q-space />
          <q-btn dense flat icon="close" color="red" size="md" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </div>

        <q-card-section>
          <div class="border-shadow bg-info q-mt-sm">
            <div class="column q-pa-sm">
              <div class="row items-center">
                <q-icon name="info_outline" color="white" size="sm"/>
                <span class="q-ml-sm text-white" style="font-size: 18px">Pemberitahuan</span>
              </div>
              <span class="text-white q-pa-sm" style="font-size: 12px">
                Data yang sudah Diupload dapat diedit selama proses verifikasi berkas,apabila berkas sudah diverifikasi maka anda tidak dapat mengedit berkas kembali
              </span>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-sm">
            <div class="text-h6 text-weight-bold q-mt-md">
            Data Berkas Permohonan
            </div>
            <q-select
              outlined
              v-model="dataEdit.jenis_komoditi"
              use-input
              hint="Apabila komoditi tidak tersedia, maka silahkan input lalu tekan enter"
              :options="options"
              @filter="filterBrand"
              @new-value="createBrand"
              input-debounce="0"
              label="Jenis Komoditi"
              :rules="[
                val => (val !== null || val !== '') || 'Mohon Isi'
              ]">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <div class="row justify-between q-mb-lg">
              <q-input
                class="col-4 q-pa-xs"
                label="Jumlah Lot"
                type="number"
                v-model="dataEdit.jumlah_lot"
                outlined
                  :rules="[
                    val => (val > 0 || val == null) || 'Mohon Isi'
                  ]"/>
              <q-input
                class="col-4 q-pa-xs"
                label="Berat Bersih(Kg)"
                type="number"
                outlined
                v-model="dataEdit.berat_bersih"
                  :rules="[
                    val => (val > 0 || val == null) || 'Mohon Isi'
                  ]"/>
              <q-input
                class="col-4 q-pa-xs"
                label="Berat Kotor(Kg)"
                type="number"
                outlined
                v-model="dataEdit.berat_kotor"
                  :rules="[
                    val => (val > 0 || val == null) || 'Mohon Isi'
                  ]"/>
            </div>
            <q-select
              outlined
              v-model="dataEdit.negara_tujuan"
              use-input
              input-debounce="0"
              label="Negara Tujuan"
              :options="arrayNegara"
              @filter="filterNegara"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]">
              <template v-slot:no-option>
                <q-item @click="createBrand">
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <!-- <q-input
              v-model="dataEdit.negara_tujuan"
              label="Negara Tujuan"
              class="q-mr-sm"
              outlined
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            /> -->
            <q-file
              class="col q-mb-lg"
              v-model="dataEdit.surat_permohonan"
              label="Surat Permohonan pengambilan sampel"
              accept=".pdf, .png, .jpg, .jpeg"
              outlined
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-file
              class="col q-mb-lg"
              v-model="dataEdit.informasi_produk"
              label="Upload Informasi Produk"
              accept=".pdf, .png, .jpg, .jpeg"
              outlined
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-file
              class="col q-mb-lg"
              v-model="dataEdit.dokumen_eksport"
              label="Upload Dokumen eksport /Shipping Instruction (SI)"
              accept=".pdf, .png, .jpg, .jpeg"
              outlined
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-input
              v-model="dataEdit.nomor_si"
              label="Nomor Shipping Instruction (SI)"
              class="q-mr-sm"
              outlined
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-btn label="Kirim Perubahan" @click="updatePerubahan(10)" class="full-width" color="green-10" no-caps/>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogBlanko">
      <q-card>
        <div class="q-pa-md flex flex-center column text-green-10">
          <div class="q-pa-sm flex flex-center" style="border-radius: 50px; width: 50px; height: 50px; background: #475D5B">
            <q-icon name="check_circle" color="white" size="md"/>
          </div>
          <span class="q-mt-md text-h6 text-weight-bold">Upload Blanko sertifkat</span>
          <span class="q-mt-md">Pastikan berkas yang dimasukan sudah sesuai</span>
          <div class="col full-width">
            <q-form @submit="sendBlanko">
              <q-file
                class="col full-width q-mt-md"
                v-model="blanko"
                label="Upload Blanko"
                accept=".pdf, .png, .jpg, .jpeg, .doc, .docx"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
                outlined
              >
                <template v-slot:append>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              <q-btn class="q-mt-md full-width" label="Upload" color="green-10" no-caps type="submit"/>
              <div class="" v-if="this.$route.name === 'permohonanOkkpd'">
                <div class="q-pa-sm text-center">
                  <span>atau</span>
                </div>
                <q-btn class="q-mt-md full-width" label="Selesai" color="green-10" no-caps @click="sendBlanko"/>
              </div>
            </q-form>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogTanggalKunjunan">
      <q-card v-if="statusPermohonan !== 7">
        <div class="q-pa-md flex flex-center column text-green-10">
          <div class="q-pa-sm flex flex-center" style="border-radius: 50px; width: 50px; height: 50px; background: #475D5B">
            <q-icon name="check_circle" color="white" size="md"/>
          </div>
          <span class="q-mt-md text-h6 text-weight-bold">Setujui Verifikasi Berkas</span>
          <span class="q-mt-md">Tentukan Tanggal Pemerikasaan Lapangan</span>
          <q-form @submit="onSubmit">
            <q-input
              outlined
              class="q-mt-md full-width"
              v-model="ambilTanggal"
              label="Tentukan Tanggal Keberangkatan"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date landscape v-model="tanggalBerangkat" :locale="settingMask" mask="dddd, D MMM YYYY" range>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-btn class="q-mt-md full-width" type="submit" label="Setujui Berkas" no-caps color="green-10" />
          </q-form>
        </div>
      </q-card>
      <q-card v-else style="width: 100%">
        <div class="q-pa-md column text-green-10">
          <div class="flex flex-center column">
            <div class="q-pa-sm flex flex-center" style="border-radius: 50px; width: 50px; height: 50px; background: #475D5B">
              <q-icon name="check_circle" color="white" size="md"/>
            </div>
            <span class="q-mt-md text-h6 text-weight-bold">Tentukan tanggal pengambilan</span>
            <span class="q-mt-md">Tentukan Tanggal pengambilan</span>
          </div>
          <q-form @submit="onSubmitTanggal" >
            <q-input
              outlined
              class="q-mt-md full-width"
              v-model="tanggal_pengambilan"
              style="width: 100%"
              label="Tentukan Tanggal Pengambilan"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date landscape v-model="tanggal_pengambilan" :locale="settingMask" mask="dddd, D MMM YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              outlined
              class="q-mt-md full-width"
              v-model="tanggal_penerbitan"
              style="width: 100%"
              label="Tentukan Tanggal Penerbitan"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date landscape v-model="tanggal_penerbitan" :locale="settingMask" mask="dddd, D MMM YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              outlined
              class="q-mt-md full-width"
              v-model="tanggal_berakhir"
              style="width: 100%"
              label="Tentukan Tanggal Berakhir"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date landscape v-model="tanggal_berakhir" :locale="settingMask" mask="dddd, D MMM YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-file
              label="Upload Blanko Sertifikat"
              outlined
              v-model="sertifikat"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"/>
            <q-btn class="q-mt-md full-width" type="submit" label="Setujui Berkas" no-caps color="green-10" />
          </q-form>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogReSchedule">
      <q-card>
        <div class="q-pa-md flex flex-center column text-green-10">
          <div class="q-pa-sm flex flex-center" style="border-radius: 50px; width: 50px; height: 50px; background: #475D5B">
            <q-icon name="check_circle" color="white" size="md"/>
          </div>
          <span class="q-mt-md text-h6 text-weight-bold">ReSchedule</span>
          <span class="q-mt-md">Tentukan Tanggal Pemerikasaan Lapangan</span>
          <q-form @submit="reschedule">
            <q-input
              outlined
              class="q-mt-md full-width"
              v-model="ambilTanggal"
              label="Tentukan Tanggal Keberangkatan"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date landscape v-model="tanggalBerangkat" :locale="settingMask" mask="dddd, D MMM YYYY" range>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-btn class="q-mt-md full-width" type="submit" label="Setujui Berkas" no-caps color="green-10" />
          </q-form>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogError">
      <q-card>
        <div class="q-pa-md flex flex-center column">
          <div class="q-pa-sm flex flex-center" style="border-radius: 50px; width: 50px; height: 50px; background: rgba(170, 10, 0, 0.6);">
            <q-icon name="check_circle" color="white" size="md"/>
          </div>
          <span class="q-mt-md text-h6 text-weight-bold">Tolak Verifikasi</span>
          <span class="q-mt-xs">Berikan Alasan Penolakannya</span>
          <q-form
            @submit="onTolak"
            class="q-gutter-sm q-mt-sm">
            <q-input
              outlined
              type="textarea"
              style="width: 400px"
              label="Keterangan Alasan"
              v-model="keteranganGagal"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]" />
            <q-file
              class="col"
              v-model="fileGagal"
              label="Upload SPPB"
              accept=".pdf, .png, .jpg, .jpeg"
              outlined
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-btn class="full-width" type="submit" label="Submit" no-caps color="green-10"/>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogRevisiPermohonan">
      <q-card>
        <div class="q-pa-md flex flex-center column">
          <div class="q-pa-sm flex flex-center" style="border-radius: 50px; width: 50px; height: 50px; background: rgba(170, 10, 0, 0.6);">
            <q-icon name="cancel" color="white" size="md"/>
          </div>
          <span class="q-mt-md text-h6 text-weight-bold">Pemberitahuan Revisi Berkas</span>
          <span class="q-mt-xs">Isi keterangan dan berkas yang harus diganti</span>
          <q-form
            @submit="onRevisi"
            class="q-gutter-sm q-mt-sm">
            <q-input
              outlined
              type="textarea"
              style="width: 400px"
              label="Keterangan"
              v-model="keteranganRevisi"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]" />
            <q-btn class="full-width" type="submit" label="Submit" no-caps color="green-10"/>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
let originalOptions = ['Kopi']
import utils from './utilsOkkpd'
// import utils from '../../sharedpages/okkpd/utilsOkkpd'
// let originalOptions = ['Kopi']
const listNegara = utils.listNegara
export default {
  data () {
    return {
      arrayNegara: listNegara,
      sertifikat: null,
      containshasilLab: false,
      options: originalOptions,
      dataEdit: {},
      dialogEdit: false,
      dialogRevisiPermohonan: false,
      form: {},
      dialogBlanko: false,
      dialogTanggalKunjunan: false,
      dialogReSchedule: false,
      dialogError: false,
      data: null,
      tanggalBerangkat: null,
      blanko: null,
      statusPermohonan: 0,
      show: false,
      array: utils.array,
      arrayHistory: [],
      tanggal_penerbitan: null,
      tanggal_berakhir: null,
      tanggal_pengambilan: null,
      keteranganGagal: null,
      fileGagal: null,
      keteranganRevisi: '',
      settingMask: {
        days: 'Minggu_Senin_Selasa_Rabu_Kamis_Jum\'at_Sabtu'.split('_'),
        daysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
        months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_')
      }
    }
  },
  created () {
    // console.log(this.$route.name)
    this.getProfile()
    this.getData()
  },
  methods: {
    checkHasilLab () {
      // console.log(this.arrayHistory)
      const data = this.arrayHistory.filter(array => array.status === 3)
      // console.log(data)
      if (data.length > 0) {
        this.containshasilLab = true
      }
      // console.log(this.containshasilLab)
    },
    getDataOption () {
      this.$showLoading()
      this.$axios.get(`okkpd/getForm/${this.$getProfile().nik}`, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          const data = res.data.result
          if (data.jenis.length > 0) {
            const listJenis = data.jenis
            listJenis.push(originalOptions[0])
            const arrTanpaDuplikat = listJenis.filter((nilai, indeks) => listJenis.indexOf(nilai) === indeks)
            // console.log(arrTanpaDuplikat)
            originalOptions = this.options = arrTanpaDuplikat
          }
        })
    },
    updatePerubahan (status) {
      // console.log(status)
      // console.log(this.dataEdit)
      this.$showLoading()
      const formData = new FormData()
      formData.append('data', JSON.stringify({
        jenis_komoditi: this.dataEdit.jenis_komoditi,
        jumlah_lot: this.dataEdit.jumlah_lot,
        berat_bersih: this.dataEdit.berat_bersih,
        berat_kotor: this.dataEdit.berat_kotor,
        negara_tujuan: this.dataEdit.negara_tujuan,
        nomor_si: this.dataEdit.nomor_si,
        status: 10
      }))
      formData.append('suratPermohonan', this.dataEdit.surat_permohonan)
      formData.append('informasiProduk', this.dataEdit.informasi_produk)
      formData.append('si', this.dataEdit.dokumen_eksport)
      this.$axios.put(`okkpd/updateData/${this.$route.params.id}`, formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          if (res.data.status) {
            this.$notif(res.data.message, 'positive')
            this.dialogEdit = !this.dialogEdit
            this.getData()
          } else {
            this.$notif(res.data.message, 'negative')
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    dataPopup () {
      this.dataEdit = {
        jenis_komoditi: this.data.jenis_komoditi,
        jumlah_lot: this.data.jumlah_lot,
        berat_bersih: this.data.berat_bersih,
        berat_kotor: this.data.berat_kotor,
        negara_tujuan: this.data.negara_tujuan,
        surat_permohonan: null,
        informasi_produk: null,
        dokumen_eksport: null,
        nomor_si: this.data.nomor_si
      }
      this.dialogEdit = !this.dialogEdit
    },
    onRevisi () {
      this.$showLoading()
      this.$axios.put(`okkpd/statusRevisi/${this.$route.params.id}`, {
        status: 9,
        keterangan: this.keteranganRevisi
      }, this.$createToken()).finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          if (res.data.status) {
            this.dialogRevisiPermohonan = !this.dialogRevisiPermohonan
            this.getData()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onTolak () {
      this.$showLoading()
      const formData = new FormData()
      formData.append('data', JSON.stringify({
        keterangan: this.keteranganGagal,
        status: 8
      }))
      formData.append('fileGagal', this.fileGagal)
      this.$axios.put(`okkpd/statusGagal/${this.$route.params.id}`, formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          this.$notif(res.data.message, 'positive')
          this.dialogError = !this.dialogError
          this.getData()
        })
        .catch(() => this.$commonErrorNotif())
    },
    reschedule () {
      this.$showLoading()
      this.$axios.put(`okkpd/reschedule/${this.$route.params.id}`, {
        keterangan: this.ambilTanggal,
        status: 1
      }, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          this.$notif(res.data.message, 'positive')
          this.dialogReSchedule = !this.dialogReSchedule
          this.getData()
        })
        .catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.$showLoading()
      this.$axios.put(`okkpd/updateStatus/${this.$route.params.id}`, {
        keterangan: this.ambilTanggal,
        status: this.statusPermohonan,
        tanggal_penerbitan: this.tanggal_penerbitan,
        tanggal_berakhir: this.tanggal_berakhir,
        tanggal_pengambilan: this.tanggal_pengambilan
      }, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          this.$notif(res.data.message, 'positive')
          this.dialogTanggalKunjunan = !this.dialogTanggalKunjunan
          this.getData()
        })
        .catch(() => this.$commonErrorNotif())
    },
    onSubmitTanggal () {
      this.$showLoading()
      const formData = new FormData()
      formData.append('data', JSON.stringify({
        keterangan: 'Silahkan ambil sertifikat di kantor oKKP-D',
        status: this.statusPermohonan,
        tanggal_penerbitan: this.tanggal_penerbitan,
        tanggal_berakhir: this.tanggal_berakhir,
        tanggal_pengambilan: this.tanggal_pengambilan
      }))
      formData.append('blanko', this.sertifikat)
      this.$axios.put(`okkpd/updatePengambilanBlanko/${this.$route.params.id}`, formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          this.$notif(res.data.message, 'positive')
          this.dialogTanggalKunjunan = !this.dialogTanggalKunjunan
          this.getData()
        })
        .catch(() => this.$commonErrorNotif())
    },
    updateStatus (status, openDialog) {
      if (openDialog) {
        this.statusPermohonan = status
        this.dialogTanggalKunjunan = true
      } else {
        // console.log(this.array[(this.getIndexByKey(String(status)))].label)
        const keterangan = this.array[(this.getIndexByKey(String(status)))].label
        this.$showLoading()
        this.$axios.put(`okkpd/updateStatus/${this.$route.params.id}`, {
          keterangan: keterangan,
          status: status,
          tanggal_penerbitan: this.tanggal_penerbitan,
          tanggal_berakhir: this.tanggal_berakhir,
          tanggal_pengambilan: this.tanggal_pengambilan
        }, this.$createToken())
          .finally(() => this.$hide())
          .then((res) => {
            // console.log(res)
            this.$notif(res.data.message, 'positive')
            this.getData()
          })
          .catch(() => this.$commonErrorNotif())
      }
    },
    sendBlanko () {
      this.$showLoading()
      const formData = new FormData()
      formData.append('status', this.statusPermohonan)
      formData.append('blanko', this.blanko)
      this.$axios.put(`okkpd/sendBlanko/${this.$route.params.id}`, formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          this.dialogBlanko = !this.dialogBlanko
          this.$notif(res.data.message, 'positive')
          this.getData()
        })
        .catch(() => this.$commonErrorNotif())
    },
    getIndexByKey (key) {
      const index = this.array.findIndex(item => {
        if (Array.isArray(item.key)) {
          return item.key.includes(key)
        } else {
          return item.key === key
        }
      })

      return index !== -1 ? index : -1
    },
    getIndexByStatus (status) {
      const index = this.arrayHistory.findIndex(item => {
        if (Array.isArray(item.status)) {
          return item.status.includes(status)
        } else {
          return item.status === status
        }
      })

      return index !== -1 ? index : -1
    },
    getProfile () {
      this.form.nama = this.$getProfile().nama
      this.form.provinsi = this.$getProfile().member.reg_provinces.name
      this.form.kabupaten = this.$getProfile().member.reg_regencies.name
      this.form.kecamatan = this.$getProfile().member.reg_districts.name
      this.form.desa = this.$getProfile().member.reg_villages.name
    },
    getData () {
      this.$showLoading()
      this.$axios.get(`okkpd/getDetail/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          this.getDataOption()
          this.data = res.data.result
          this.arrayHistory = this.data.okkpd_chld_berkas_permohonan
          this.checkHasilLab()
          this.show = true
        })
        .catch(() => this.$commonErrorNotif())
    },
    addBlanko (status) {
      this.statusPermohonan = status
      this.dialogBlanko = !this.dialogBlanko
    },
    createBrand (val, done) {
      if (val.length > 0) {
        if (!originalOptions.includes(val)) {
          originalOptions.push(val)
        }
        done(val, 'toggle')
      }
    },
    filterBrand (val, update, abort) {
      if (val === '') {
        update(() => {
          this.options = originalOptions
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options = originalOptions.filter(v => String(v).toLowerCase().indexOf(needle) > -1)
      })
    },
    filterNegara (val, update, abort) {
      if (val === '') {
        update(() => {
          this.arrayNegara = listNegara
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.arrayNegara = listNegara.filter(v => String(v).toLowerCase().indexOf(needle) > -1)
      })
    }
  },
  computed: {
    ambilTanggal () {
      if (this.tanggalBerangkat) {
        if (this.tanggalBerangkat?.from) {
          return `${this.tanggalBerangkat.from} - ${this.tanggalBerangkat.to}`
        } else {
          return `${this.tanggalBerangkat}`
        }
      } else {
        return null
      }
    }
  }
}
</script>
