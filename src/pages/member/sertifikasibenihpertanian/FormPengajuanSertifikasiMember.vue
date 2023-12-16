<template>
  <q-page style="background: #EFF6F1">
    <div style="background: #32573F; height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} absolute-top`" style="margin-top: 55px">
      <div class="bg-white q-pa-sm ">
        <q-btn class="q-mx-sm" rounded icon="mdi-arrow-left" @click="this.$router.go(-1)" dense flat/>
        <span class="text-bold">Formulir Pengajuan Sertifikasi Benih</span>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} q-mt-xl bg-white q-pa-sm q-pt-md`">
      <span class="q-ml-md text-h6">Data Diri</span>
      <div class="q-ma-sm">
        <div class="q-pa-sm">
          <q-input
          v-model="namapemohon"
          outlined
          dense
          label="Nama Pemohon"/>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="q-pa-sm">
              <q-select
              v-model="namapemohon"
              outlined
              dense
              label="Provinsi"/>
            </div>
            <div class="q-pa-sm">
              <q-select
              v-model="namapemohon"
              outlined
              dense
              label="Kecamatan"/>
            </div>
          </div>
          <div class="col-6">
            <div class="q-pa-sm">
              <q-select
              v-model="namapemohon"
              outlined
              dense
              label="Kabupaten"/>
            </div>
            <div class="q-pa-sm">
              <q-select
              v-model="namapemohon"
              outlined
              dense
              label="Desa/Kelurahan"/>
            </div>
          </div>
        </div>
        <div class="q-pa-sm">
          <q-file
          v-model="upldKTP"
          outlined
          dense
          label="Upload KTP">
            <template v-slot: append>
              <q-icon name="attach_file"/>
            </template>
          </q-file>
        </div>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} q-mt-md bg-white q-pa-sm q-pt-md`">
      <span class="q-ml-md text-h6">Berkas Permohonan</span>
      <div class="q-ma-sm">
        <div class="q-pa-sm">
          <q-select
          v-model="namapemohon"
          outlined
          dense
          label="Komoditas">
          </q-select>
        </div>
        <div class="q-pa-sm">
          <q-select
          v-model="namapemohon"
          outlined
          dense
          label="Jumlah Benih">
          </q-select>
        </div>
        <div class="q-pa-sm">
          <span class="q-mx-xs"> Formulir Pengajuan |
            <a href="url">(Unduh PDF)</a>
            <a href="url">(Unduh Word)</a>
          </span>
          <q-file
          v-model="formulir"
          outlined
          dense
          label="Unggah File">
            <template v-slot: append>
              <q-icon name="attach_file"/>
            </template>
          </q-file>
        </div>
        <div class="q-pa-sm">
          <span class="q-mx-xs"> Surat Rekomendasi |
            <a href="url">(Unduh PDF)</a>
            <a href="url">(Unduh Word)</a>
          </span>
          <q-file
          v-model="suratRekomendasi"
          outlined
          dense
          label="Unggah File">
            <template v-slot: append>
              <q-icon name="attach_file"/>
            </template>
          </q-file>
        </div>
        <div class="q-pa-sm">
          <span class="q-mx-xs"> Denah Lokasi Penangkar |
            <a href="url">(Unduh PDF)</a>
            <a href="url">(Unduh Word)</a>
          </span>
          <q-file
          v-model="denahLokasi"
          outlined
          dense
          label="Unggah File">
            <template v-slot: append>
              <q-icon name="attach_file"/>
            </template>
          </q-file>
        </div>
        <div class="q-pa-sm">
          <span class="q-mx-xs"> Label Benih Sumber |
            <a href="url">(Unduh PDF)</a>
            <a href="url">(Unduh Word)</a>
          </span>
          <q-file
          v-model="labelBenih"
          outlined
          dense
          label="Unggah File">
            <template v-slot: append>
              <q-icon name="attach_file"/>
            </template>
          </q-file>
        </div>
        <div class="q-pa-sm">
          <span class="q-mx-xs"> Formulir Pendaftaran |
            <a href="url">(Unduh PDF)</a>
            <a href="url">(Unduh Word)</a>
          </span>
          <q-file
          v-model="formulir"
          outlined
          dense
          label="Unggah File">
            <template v-slot: append>
              <q-icon name="attach_file"/>
            </template>
          </q-file>
        </div>
      </div>
    </div>
    <div class="q-mx-xl q-px-md">
      <q-btn class="full-width text-white" label="Kirim Pengajuan" style="background: #32573F"
        @click="this.$router.go(-1)">
      </q-btn>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      confirm: false,
      namapemohon: '',
      upldKTP: '',
      formulir: '',
      suratRekomendasi: '',
      denahLokasi: '',
      labelBenih: ''
    }
  }
}
</script>
