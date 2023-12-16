<template>
  <q-page style="background: #EFF6F1">
    <div style="background: #32573F; height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  absolute-top`" style="margin-top: 55px">
      <div class="bg-white q-pa-sm row items-center">
        <q-btn class="q-mx-sm col-auto" rounded icon="mdi-arrow-left" @click="this.$router.go(-1)" dense flat/>
        <span class="text-bold col">Dashboard Pengajuan Rekomendasi Pengedar Benih</span>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-md bg-white q-pa-sm q-pt-md`">
      <span class="q-ml-md text-h6">Data Diri</span>
      <div class="q-ma-sm">
        <div class="q-pa-sm">
          <q-input
            v-model="namaperusahaan"
            outlined
            dense
            label="Nama Perusahaan"></q-input>
        </div>
        <div class="q-pa-sm">
          <q-input
            v-model="namaperusahaan"
            outlined
            dense
            label="Nama Pimpinan"></q-input>
        </div>
        <div class="q-pa-sm">
          <q-input
            v-model="namaperusahaan"
            outlined
            dense
            label="Alamat Usaha"></q-input>
        </div>
        <div class="q-pa-sm">
          <q-input
            v-model="namaperusahaan"
            outlined
            dense
            label="Alamat Pimpinan"></q-input>
        </div>
        <div class="q-pa-sm">
          <q-select
            v-model="bentukUsaha"
            :option="optionsBentukUsaha"
            outlined
            dense
            label="Bentuk Usaha"></q-select>
        </div>
        <div class="q-pa-sm">
          <q-input
            v-model="npwp"
            outlined
            dense
            label="NPWP"></q-input>
        </div>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  bg-white q-pa-sm q-pt-md`">
      <span class="q-ml-md text-h6">Lampiran</span>
      <div class="q-ma-sm">
        <div class="q-pa-sm">
          <q-file
            v-model="ktp"
            outlined
            dense
            label="KTP">
              <template v-slot: append>
                <q-icon name="attach_file"/>
              </template>
          </q-file>
        </div>
        <div class="q-pa-sm">
          <q-file
            v-model="pasfoto"
            outlined
            dense
            label="Pas Foto">
              <template v-slot: append>
                <q-icon name="attach_file"/>
              </template>
          </q-file>
        </div>
        <div class="q-pa-sm">
          <q-file
            v-model="rencanapenjualan"
            outlined
            dense
            label="Rencana Penjualan Benih Tahunan (Jumlah, Jenis Varietas, Kelas Benih)">
              <template v-slot: append>
                <q-icon name="attach_file"/>
              </template>
          </q-file>
        </div>
        <div class="q-pa-sm">
          <q-file
            v-model="keteranganpenguasaan"
            outlined
            dense
            label="Keterangan Penguasaan Sarana Gudang / Penyimpanan Benih">
              <template v-slot: append>
                <q-icon name="attach_file"/>
              </template>
          </q-file>
        </div>
        <div class="q-pa-sm">
          <q-file
            v-model="kopetensitenaga"
            outlined
            dense
            label="Kompetensi Tenaga Kerja">
              <template v-slot: append>
                <q-icon name="attach_file"/>
              </template>
          </q-file>
        </div>
        <div class="q-pa-sm">
          <q-file
            v-model="nib"
            outlined
            dense
            label="Nomer Induk Berusaha">
              <template v-slot: append>
                <q-icon name="attach_file"/>
              </template>
          </q-file>
        </div>
      </div>
    </div>
    <div class="q-mx-xl q-mb-xl">
      <q-btn
        class="full-width text-bold"
        style="background: #FFBB16"
        @click="this.$router.go(-1)"
        label="Kirim Pengajuan">
      </q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      namaperusahaan: '',
      namaPimpinan: '',
      alamatUsaha: '',
      alamatPimpinan: '',
      bentukUsaha: '',
      optionsBentukUsaha: [
        'PT', 'CV'
      ],
      npwp: '',
      ktp: '',
      pasfoto: '',
      aktaPendirianusaha: '',
      fotonpwp: '',
      rencanapenjualan: '',
      keteranganpenguasaan: '',
      kopetensitenaga: '',
      nib: ''
    }
  }
}
</script>

<style scoped>

</style>
