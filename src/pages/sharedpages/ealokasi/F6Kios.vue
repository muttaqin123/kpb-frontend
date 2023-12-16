<template>
  <q-page padding>
    <div v-if="loaded">
      <div class="row justify-end">
        <div class="col-5">
          <div>
            Kepada Yth.
          </div>
          <div>
            <!-- Distributor Pupuk {{ data[0].barang.pabrikan.nama }} -->
          </div>
          <div>
            <!-- {{ dataDistri.namaPerusahaan }} -->
          </div>
          <div>
            <!-- Di {{ dataDistri.area.city }} -->
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5 offset-2 item-left">
          <table>
            <tr>
              <!-- <td>No Reg : {{ detailKios.pihc_code }}</td> -->
            </tr>
          </table>
        </div>
      </div>
      <div class="row justify-center q-mt-sm">
        <div>
          LAPORAN BULANAN PENGECER
        </div>
        <div>
          <!-- {{ detailKios.name }} KEC {{ detailKios.area.district }} KAB/KOTA {{ detailKios.area.city }} -->
        </div>
        <div>
          <!-- PERIODE BULAN {{ $listMonth[$route.params.bulan - 1] }} TAHUN {{ $route.params.tahun }} -->
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-md-5">
          <div class="text-right text-bold">Dalam Satuan = Ton</div>
          <table border="1" class="full-width">
            <tr>
              <td><b>JENIS PUPUK</b></td>
              <td><b>PERSEDIAAN AWAL</b></td>
              <td><b>PENEBUSAN</b></td>
              <td><b>PENYALURAN</b></td>
              <td><b>PERSEDIAAN AKHIR</b></td>
            </tr>
            <!-- <tr v-for="(d, i) in data" :key="i">
              <td>{{ d.jenisPupuk }}</td>
              <td>{{ d.persedianAwal / 1000 }}</td>
              <td>{{ d.penebusan / 1000 }}</td>
              <td>{{ getPenyaluran(d.transaksiCash, d.detailTrans, d.idBarang) / 1000 }}</td>
              <td>{{ (d.persedianAwal + d.penebusan - getPenyaluran(d.transaksiCash, d.detailTrans, d.idBarang)) / 1000 }}</td>
            </tr> -->
          </table>
          <div>
            Tembusan :
          </div>
          <div>
            <!-- 1. Kepala Dinas Perindag Kab/Kota {{ detailKios.area.city }} -->
          </div>
          <div>
            <!-- 2. Kepala Dinas Pertanian Kab/Kota {{ detailKios.area.city }} -->
          </div>
          <div class="row justify-end q-mt-md">
            <div class="col-md-4">
              <div class="text-center">
                <!-- {{ detailKios.area.city }}, {{ $parseDate(new Date()).fullDate }} -->
              </div>
              <div class="text-center">
                Pengecer
              </div>
              <div class="text-center q-mt-xl">
                <!-- ({{ detailKios.name }}) -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  props: {
    idKios: String
  },
  data () {
    return {
      data: [],
      dataDistri: null,
      detailKios: null,
      loaded: true
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {

    }
  }
}
</script>
<style lang="sass" scoped>
  table, th, td
    border: 1px solid black
    border-collapse: collapse
    padding: 4px
</style>
