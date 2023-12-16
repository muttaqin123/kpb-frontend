<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div class="text-h6"> Data F6 Kios</div>
        <div>Mohon pilih tahun, bulan dan distributor untuk melihat data F6.</div>
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
          />
          <q-select
            label="Pilih Distributor"
            v-model="distri"
            :rules="$defaultValidation"
            :options="listDistri"
            use-input
            :option-label="r => `${r?.pubers_distributor?.nama_distributor} (${r?.pubers_distributor?.kode_distributor})`"
            option-value="id_kios_distri"
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
    <q-table
      flat
      class="q-mt-md"
      :rows="rows"
      :loading="loading"
      :columns="columns"
    >
      <template v-slot:top-left>
        <q-btn
          label="Cetak"
          outline
          primary
          icon="print"
          :to="{
            name: 'cetakF6Kios',
            params: {
                tahun: 2022,
                bulan: 1,
                idKios: 1,
                idDistri: 1
              }
            }
          "/>
        <!-- <q-btn label="Cetak" outline primary icon="print" :disable="rows.length <= 0"/> -->
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="namaPupuk" :props="props">
            Urea
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script>
import { fullListMonth } from 'src/helper/ParseDate'
const listDistri = []
export default {
  data () {
    return {
      tahun: new Date().getFullYear(),
      bulan: null,
      listBulan: fullListMonth,
      listDistri: listDistri,
      distri: null,
      rows: [],
      columns: [
        { name: 'namaPupuk', align: 'left', label: 'Nama Pupuk', field: 'namaPupuk' }
      ],
      loading: false
    }
  },
  created () {
    this.getDistri()
  },
  methods: {
    getData () {
      // const routeData = this.$router.resolve(
      //   {
      //     name: 'cetakF9Kios',
      //     params: {
      //       tahun: this.tahun,
      //       bulan: this.bulan.value
      //     }
      //   })
      // window.open(routeData.href, '_blank')
    },
    getDistri () {
      this.$showLoading()
      this.$axios.get(`master/kios-distri/${this.$getProfile().nik}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) this.listDistri = res.data.result
        }).catch(() => this.$commonErrorNotif())
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
