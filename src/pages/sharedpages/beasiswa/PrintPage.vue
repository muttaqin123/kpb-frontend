<template>
  <q-page>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

    <div class="page-content container" v-if="loaded">
      <div class="container">
        <div class="column">
          <div class="col-12 flex flex-center">
            <q-img src="img/sertif_benih/logo_lampung.png" style="width: 50px; height: 70px;"/>
          </div>
          <div class="row items-center">
            <div class="col-1 flex flex-center">
              <q-img src="img/e-kpb.png" style="width: 50px; height: 50px"/>
            </div>
            <div class="col column q-pa-sm flex flex-center">
              <span class="text-weight-bold text-10 text-black q-mt-md">SEKRETARIAT e-KPB CENTER</span>
              <div class="text-8 text-black text-center q-mb-md">Jl. Way Rarem, Pahoman, Kecamatan Tlk. Betung Utara, Kota Bandar Lampung, Lampung 35213. <br> Call Center: 0821-8155-5123</div>
            </div>
            <div class="col-1 flex flex-center">
              <q-img :src="`${this.$baseURL}file-universitas/${this.data.beasiswa.institusi_pendidikan.logo}`" style="width: 50px; height: 50px"/>
            </div>
          </div>
        </div>
        <hr style="margin-top: -20px">
        <div class="column">
          <div class="text-center text-10 text-weight-bold">SURAT KETERANGAN AKTIF ANGGOTA <br> Kartu Petani Berjaya Berbasis Elektronik (e-KPB)</div>
          <br>
          <span class="text-10">Yang bertanda tangan di bawah ini:</span>
          <span class="text-10">Nama : Dr. Ir. Syopiansyah Jaya Putra, M.Sis, IPU, ASEAN.Eng</span>
          <span class="text-10">Jabatan : Ketua e-KPB Center</span>
          <br>
          <span class="text-10">Dengan ini menerangkan bahwa Anggota e-KPB:</span>
          <span class="text-10">Nama : {{ this.data.member.ktp.nama }}</span>
          <span class="text-10">NIK : {{ this.data.member.ktp.nik }}</span>
          <span class="text-10">No. Anggota : {{ this.data.member.id_member }}</span>
          <span class="text-10">Alamat : {{ this.data.member.ktp.alamat ? this.data.member.ktp.alamat : '-' }}</span>
          <br>
          <span class="text-10">Calon mahasiswa di bawah ini;</span>
          <span class="text-10">Nama : {{ this.data.nama_siswa }}</span>
          <span class="text-10">Tempat/Tanggal Lahir : {{ this.data.tempat_lahir }}, {{ this.data.tanggal_lahir }}</span>
          <span class="text-10">NISN : {{ this.data.nisn }}</span>
          <span class="text-10">Asal Sekolah : {{ this.data.asal_sekolah }}</span>
          <br>
          <div class="text-10">Nama tersebut benar anggota aktif Kartu Petani Berjaya Berbasis Elektronik (e-KPB) Provinsi Lampung sampai sekarang.</div>
          <br>
          <div class="text-10">Demikianlah surat pernyataan anggota aktif ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagai salah satu kelengkapan persyaratan penerimaan mahasiswa baru jalur beasiswa {{ this.data.beasiswa.nama_beasiswa }} Tahun 2023.</div>
        </div>
        <br>
        <div class="row">
          <q-space/>
          <div class="col-5 column">
            <span class="text-10">Bandar Lampung, {{ dateNow }}</span>
            <span class="text-10">Ketua e-KPB Center</span>
            <br><br><br><br><br>
            <span class="text-10">Dr. Ir. Syopiansyah Jaya Putra, M.Sis, IPU, ASEAN.Eng</span>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      data: null,
      loaded: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async cetak () {
      window.print()
    },
    getData () {
      this.$showLoading()
      this.$axios.get(`beasiswa/getRecomendations/${this.$route.params.id}`)
        .finally(() => this.$hide())
        .then((res) => {
          this.data = res.data.result
          const tgl = this.data.tanggal_lahir
          const array = tgl.split(',')
          this.data.tanggal_lahir = array[1]
          this.loaded = true
        })
        .catch(() => this.$commonErrorNotif())
    }
  },
  computed: {
    dateNow () {
      const timenow = Date.now()
      const formattedString = date.formatDate(timenow, 'DD MMMM YYYY')
      return formattedString
    }
  }
}
</script>
<style>
.text-10 {
  font-size: 14px;
  color: black;
}
.text-8 {
  font-size: 12px;
  color: black;
}
@media print {
  .cetakBtn {
    display: none !important;
  }
  /* body {
    display:table;
    table-layout:fixed;
    padding-top:2.5cm;
    padding-bottom:2.5cm;
    height:auto;
  } */
}
body{
    margin-top:20px;
    color: #484b51;
    max-width: 1000px;
    margin: auto;
    padding: 30px;
}
.text-secondary-d1 {
    color: #728299!important;
}
.page-header {
    margin: 0 0 1rem;
    padding-bottom: 1rem;
    padding-top: .5rem;
    border-bottom: 1px dotted #e2e2e2;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
}
.page-title {
    padding: 0;
    margin: 0;
    font-size: 1.75rem;
    font-weight: 300;
}
.brc-default-l1 {
    border-color: #dce9f0!important;
}

.ml-n1, .mx-n1 {
    margin-left: -.25rem!important;
}
.mr-n1, .mx-n1 {
    margin-right: -.25rem!important;
}
.mb-4, .my-4 {
    margin-bottom: 1.5rem!important;
}

hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
}

.text-grey-m2 {
    color: #888a8d!important;
}

.text-success-m2 {
    color: #86bd68!important;
}

.font-bolder, .text-600 {
    font-weight: 600!important;
}

.text-110 {
    font-size: 110%!important;
}
.text-blue {
    color: #478fcc!important;
}
.pb-25, .py-25 {
    padding-bottom: .75rem!important;
}

.pt-25, .py-25 {
    padding-top: .75rem!important;
}
.bgc-default-tp1 {
    background-color: rgba(121,169,197,.92)!important;
}
.bgc-default-l4, .bgc-h-default-l4:hover {
    background-color: #f3f8fa!important;
}
.page-header .page-tools {
    -ms-flex-item-align: end;
    align-self: flex-end;
}

.btn-light {
    color: #757984;
    background-color: #f5f6f9;
    border-color: #dddfe4;
}
.w-2 {
    width: 1rem;
}

.text-120 {
    font-size: 120%!important;
}
.text-primary-m1 {
    color: #4087d4!important;
}

.text-danger-m1 {
    color: #dd4949!important;
}
.text-blue-m2 {
    color: #68a3d5!important;
}
.text-150 {
    font-size: 150%!important;
}
.text-60 {
    font-size: 60%!important;
}
.text-grey-m1 {
    color: #7b7d81!important;
}
.align-bottom {
    vertical-align: bottom!important;
}
</style>
