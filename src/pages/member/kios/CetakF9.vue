<template>
  <q-page padding>
    <div v-if="loaded">
      <div class="row justify-center">
        <div class="text-center">
          REKAPITULASI PENYALURAN PUPUK BERSUBSIDI <br>
          KIOS PENGECER LENGKAP (KPL) : {{ dataKios.nama_kios }} <br>
          KECAMATAN : {{ dataKios.member.reg_districts.name }} <br>
          KABUPATEN : {{ dataKios.member.reg_regencies.name }} <br>
          PERIODE : {{ listMonth[$route.params.bulan-1] }} {{ $route.params.tahun }} <br>
        </div>
      </div>
      <div class="row justify-center q-mt-md">
        <table border="1">
          <tr>
            <td rowspan="2">No</td>
            <td rowspan="2">Nama Petani</td>
            <td rowspan="2">NIK</td>
            <td rowspan="2">Kelompok Tani</td>
            <td rowspan="2">Tanggal Penebusan</td>
            <td colspan="3">Jenis Pupuk (Kg)</td>
          </tr>
          <tr>
            <td>Urea</td>
            <td>NPK</td>
            <td>NPK FK</td>
          </tr>
          <tr v-for="(d, i) in rows" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ d.namapetani }}</td>
            <td>{{ d.nikpetani }}</td>
            <td>{{ d.nama_poktan }}</td>
            <td>{{ $parseDate(d.created_at).fullDate }}</td>
            <td>{{ d.urea }}</td>
            <td>{{ d.npk }}</td>
            <td>{{ d.npkfk }}</td>
          </tr>
          <tr>
            <td colspan="8"></td>
          </tr>
          <tr>
            <td colspan="5">
              Total
            </td>
            <td>
              {{ total.urea }}
            </td>
            <td>
              {{ total.npk }}
            </td>
            <td>
              {{ total.npkfk }}
            </td>
          </tr>
        </table>
      </div>
      <div class="row justify-center">
        <div class="col-3">
          <div class="row q-mt-md justify-end">
            <div class="text-center">
              {{ dataKios.member.reg_districts.name }}, {{ $parseDate(new Date()).fullDate }} <br>
              {{ dataKios.nama_kios }} <br>
              <div style="margin-top: 60px">
                {{ this.$getProfile().nama }} <br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { listMonth } from 'src/helper/ParseDate'
export default {
  data () {
    return {
      rows: [],
      dataKios: null,
      loaded: false,
      listMonth,
      total: null
    }
  },
  created () {
    this.$showLoading()
    this.$axios.get('alokasi/laporan-f9', this.$createToken({
      tahun: this.$route.params.tahun,
      bulan: this.$route.params.bulan,
      nik: this.$getProfile().nik
    }))
      .finally(() => this.$hide())
      .then(res => {
        if (this.$parseResponse(res.data, false)) {
          if (res.data.result.data.length > 0) {
            const result = res.data.result
            this.loaded = true
            this.rows = result.data
            this.dataKios = result.kios
            this.total = result.sumPupuk
          } else {
            this.$notif('Data Tidak Ada', 'negative')
          }
        }
      }).catch(() => this.$commonErrorNotif())
  }
}
</script>
<style lang="css" scoped>
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 4px;
  }
</style>
