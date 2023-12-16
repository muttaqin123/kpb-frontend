<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div class="text-h6"> Data F9 Kios</div>
        <div>Mohon pilih tahun dan bulan untuk melihat data F9.</div>
        <q-form @submit="getData">
          <q-select
            v-model="tahun"
            :rules="$defaultValidation"
            label="Pilih Tahun"
          />
          <q-select
            label="Pilih Bulan"
            v-model="bulan"
            :rules="$defaultValidation"
            :options="listBulan"
            use-input
            option-label="label"
            option-value="value"
            filter
          />
          <q-btn
            label="Cek Data"
            color="primary"
            unelevated
            type="submit"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import { listMonth } from 'src/helper/ParseDate'
const list = listMonth.map((r, i) => {
  return {
    label: r,
    value: i + 1
  }
})
// import { exportFile } from 'quasar'
export default {
  data () {
    return {
      tahun: 2023,
      bulan: null,
      listBulan: list
    }
  },
  methods: {
    getData () {
      const routeData = this.$router.resolve(
        {
          name: 'cetakF9Kios',
          params: {
            tahun: this.tahun,
            bulan: this.bulan.value
          }
        })
      window.open(routeData.href, '_blank')
    }
    // exportData () {
    //   const data = [{
    //     nama: 'dika',
    //     nik: '123'
    //   }]
    //   const content = [
    //     'REKAPITULASI PENYALURAN PUPUK BERSUBSIDI;',
    //     `KIOS PENGECER : ${this.$getProfile().nama}`,
    //     `KECAMATAN : ${this.$getProfile().nama}`,
    //     `KABUPATEN : ${this.$getProfile().nama}`,
    //     'No;Nama Petani;NIK;Kelompok Tani;Tanggal Penebusan;Urea (Kg);NPK (Kg);NPK FK (KG)'
    //   ].concat(
    //     data.map((row, i) => {
    //       return `${i + 1};'${row.nik};${row.nama};;;;`
    //     })
    //   ).join('\r\n')
    //   const status = exportFile(
    //     'test.csv',
    //     content,
    //     'text/csv'
    //   )
    //   if (!status) {
    //     alert('Gagal Export')
    //   }
    // },
    // filterFn (val, update) {
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.listBulan = list.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
    //   })
    // }
  }
}
</script>
