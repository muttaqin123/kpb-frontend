<template>
  <q-page style="background-color: #FAFAFA;">
    <!-- banner atas mulai-->
    <div class="column">
      <div class="coba row justify-between items-center " :style="`background: #024830; ${this.$q.screen.xl ? ' padding: 40px 200px;' : 'padding: 20px'}`">
        <div class="col-md-8 col-sm-12">
          <div class="text-h4 text-weight-medium text-grey-1 q-mb-sm">Beasiswa Untuk Anak Petani</div>
          <div class="text-body1 text-grey-1">Kesempatan emas bagi anak petani untuk mendapatkan beasiswa</div>
        </div>
        <div v-if="this.$q.screen.xl || this.$q.screen.md" class="col-auto items-end"><q-img
          src="img/ebeasiswa/icon_beasiswa.png"
          :ratio="1"
          style="height: 140px; width: 150px"
        /></div>
    </div>
    </div>
    <!-- banner atas selesai-->
    <!-- Data Kosong Mulai -->
    <div
      v-if="this.rows.length===0"><q-img
      src="img/ebeasiswa/icon_beasiswa.png"
      :ratio="1"
      style="height: 140px; width: 150px"/></div>
    <!-- Data Kosong Selesai -->
    <!-- list beasiswa mulai -->
    <div v-else>
      <q-table
      flat
      :rows="rows"
      :columns="columns"
      separator="none"
      :pagination="pagination"
      hide-pagination>
      <template v-slot:body="props" >
        <q-tr :props="props" no-hover >
          <q-td auto-width>
            <q-card
              style="padding: 24px 16px; width: 100%;">
              <div class="row justify-between items-center">
                <div class="col-xl-8">
                  <q-badge rounded class="q-py-xs q-px-md q-mb-sm" :color="isOpen(props.row.tanggal_dimulai, props.row.tanggal_selesai) ? 'positive' : 'negative'" :label="isOpen(props.row.tanggal_dimulai, props.row.tanggal_selesai) ? 'Buka' : 'Tutup'" />
                  <div :class="`text-weight-bold ${this.$q.screen.xs ? 'text-h6' : 'text-h5'}`">{{ props.row.nama_beasiswa }}</div>
                  <div class="text-body text-weight-medium">{{ props.row.institusi_pendidikan.nama_institusi }}</div>
                  <div style="font-size: 11px" class="text-weight-light q-mt-sm">Tanggal Pendaftaran: {{ this.$parseDate(props.row.tanggal_dimulai).fullDate }} - {{ this.$parseDate(props.row.tanggal_selesai).fullDate }}</div>
                  <div style="font-size: 11px" class="text-weight-light">Kuota: {{ props.row.kuota_penerima }} Peserta</div>
                </div>
                <div class="col-auto items-end">
                  <q-btn
                    no-caps
                    rounded
                    class="text-body1"
                    :style="`background-color: #024830; ${this.$q.screen.xs ? 'margin-top: 16px' : ''}`"
                    :size="`${this.$q.screen.xl ? 'md' : this.$q.screen.lg ? 'md' : this.$q.screen.md ? 'md' : this.$q.screen.sm ? 'sm' : this.$q.screen.xs ? 'md' : ''}`"
                    text-color="white"
                    label="Lihat Detail"
                    :to="{ name: 'detailBeasiswa', params: { id: props.row.id } }"
                  />
                </div>
              </div>
            </q-card>
          </q-td>
        </q-tr>
      </template>

    </q-table>
    <div class="row justify-center q-mt-md ">
      <q-pagination
        class="q-mb-xl"
        v-model="pagination.page"
        direction-links
        color="grey"
        active-color="green-10"
        :max="pagesNumber"
        size="md"
      />
    </div>
    </div>
    <!-- list beasiswa selesai -->
    <div class="col text-center text-white absolute-bottom" style="background: #024830;">
      Copyright © 2023 Kartu Petani Berjaya. All Right Reserved
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      columns: [],
      rows: [],
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10
      // rowsNumber: xx if getting data from a server
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$axios.get('beasiswa/getall', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          console.log(res)
          this.rows = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    isOpen (masuk, selesai) {
      const tanggalMasuk = Date.parse(masuk)
      const tanggalSelesai = Date.parse(selesai) // Konversi created_at menjadi nilai timestamp
      const tangalIni = Date.now() // Waktu saat ini

      const selisihMasuk = Math.floor((tangalIni - tanggalMasuk) / (1000 * 60 * 60 * 24))
      const selisihSelesai = Math.floor((tangalIni - tanggalSelesai) / (1000 * 60 * 60 * 24))

      return selisihMasuk >= 0 && selisihSelesai <= 0
    }
  },
  computed: {
    pagesNumber () {
      return Math.ceil(this.rows.length / this.pagination.rowsPerPage)
    }
  }
}
</script>
